import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: any) {
    if (!dto || !dto.telegramId) throw new ForbiddenException('Invalid user data');

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          telegramId: dto.telegramId,
        },
      });

      if (!user) {
        const res = await this.prisma.user.create({
          data: {
            telegramId: dto.telegramId,
            username: dto.username || '',
            firstName: dto.first_name || '',
            lastName: dto.last_name || '',
            points: 0,
            energy: 1000,
            energyReFillList: 0,
            balance: 0,
          },
        });

        const boosts = await this.prisma.boost.findMany({ select: { id: true } });

        if (boosts.length > 0) {
          for (const boost of boosts) {
            await this.prisma.userBoost.create({
              data: {
                userId: res.id,
                boostId: boost.id,
                purchasedAt: new Date('2023-11-12'),
              },
            });
          }
        }

        const data = {
          access_token: await this.signToken(res.telegramId),
          isFirstLogin: true,
        };

        return data;
      }

      const data = {
        access_token: await this.signToken(user.telegramId),
        isFirstLogin: false,
      };

      return data;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(telegramId: bigint): Promise<string> {
    const payload = {
      sub: telegramId,
    };

    const sanitizedPayload = JSON.parse(
      JSON.stringify(payload, (_, value) => (typeof value === 'bigint' ? value.toString() : value)),
    );

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(sanitizedPayload, {
      expiresIn: '60m',
      secret: secret,
    });

    return token;
  }
}
