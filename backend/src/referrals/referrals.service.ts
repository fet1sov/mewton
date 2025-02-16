import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReferralsService {
  constructor(private prisma: PrismaService) {}

  async create(referredId: bigint, referrerId: bigint) {
    const referrer = await this.prisma.user.findUnique({
      where: {
        telegramId: referrerId,
      },
    });

    const referred = await this.prisma.user.findUnique({
      where: {
        telegramId: referredId,
      },
    });

    const referredIds = await this.prisma.referral.findMany({
      where: {
        referredId: referred.id,
      },
    });

    if (referrerId === referredId) throw new ForbiddenException('You cannot refer yourself');

    if (referredIds.length > 0) throw new ForbiddenException('User already referred');

    const res = await this.prisma.referral.create({
      data: {
        referrerId: referrer.id,
        referredId: referred.id,
      },
    });

    await this.prisma.user.update({
      where: {
        telegramId: referrerId,
      },
      data: {
        balance: referrer.balance + 0.001,
      },
    });

    return JSON.stringify(res, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
  }

  async getReferrals(telegramId: bigint) {
    const referrals = await this.prisma.user.findUnique({
      where: {
        telegramId: telegramId,
      },
      select: {
        referralsMade: {
          select: {
            referred: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return JSON.stringify(referrals, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
  }
}
