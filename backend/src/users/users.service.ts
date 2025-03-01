import { ForbiddenException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InjectBot } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @InjectBot() private readonly bot: Telegraf<Context>,) { }

  async getAllUsers(isAdmin: boolean) {
    try {
      if (isAdmin) {
        const users = await this.prisma.user.findMany();

        if (!users) throw new ForbiddenException('No users found');

        return JSON.stringify(
          users.map((user) => {
            return {
              ...user,
              telegramId: user.telegramId.toString(),
            };
          }),
        );
      }

      throw new ForbiddenException("You don't have permission");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async increasePoints(telegramId: bigint, points: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          telegramId: telegramId,
        },
      });

      return this.prisma.user.update({
        where: {
          telegramId: telegramId,
        },
        data: {
          points: user.points + points,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async decreasePoints(telegramId: bigint, points: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          telegramId: telegramId,
        },
      });

      return this.prisma.user.update({
        where: {
          telegramId: telegramId,
        },
        data: {
          points: user.points - points,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async syncPoints(telegramId: bigint, points: number, energy: number) {
    try {
      const res = await this.prisma.user.update({
        where: {
          telegramId: telegramId,
        },
        data: {
          points,
          energy,
        },
      });

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async refill(telegramId: bigint) {
    try {
      const res = await this.prisma.user.findUnique({
        where: {
          telegramId: telegramId,
        },
      });

      if (res.energyReFillList > 0) {
        await this.prisma.user.update({
          where: {
            telegramId: telegramId,
          },
          data: {
            energy: 1000,
            energyReFillList: res.energyReFillList - 1,
          },
        });

        return { success: true };
      }
      return 'You have no energy refills left';
    } catch (error) {
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async refillEnergy() {
    try {
      await this.prisma.user.updateMany({
        data: {
          energy: 1000
        },
      });

      return 0;
    } catch (error) {
      throw error;
    }
  }
}
