import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Boost } from '@prisma/client';
import { InjectBot } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Telegraf } from 'telegraf';
import BoostInfo from './dto/boosts.dto';

@Injectable()
export class BoostsService {
  constructor(
    private prisma: PrismaService,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  async buyBoost(id: number, userId: number) {
    const { boost } = await this.prisma.userBoost.findUnique({
      where: { id },
      include: { boost: true },
    });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!boost) {
      throw new Error('Boost not found');
    }

    if (boost.name === 'Loki') {
      if (user.points < boost.buyPrice) {
        throw new Error('Insufficient points');
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          catsBought: { increment: 1 },
          points: { decrement: boost.buyPrice },
          boosts: {
            update: {
              where: { id },
              data: { purchasedAt: new Date(), isPurchased: true, isPayed: false },
            },
          },
        },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          balance: { increment: boost.boostPrice },
        },
      });

      const boosts = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          boosts: {
            select: {
              id: true,
              purchasedAt: true,
              boost: true,
            },
          },
        },
      });

      return boosts;
    }

    if (user.balance < boost.buyPrice) {
      throw new Error('Insufficient balance');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        catsBought: { increment: 1 },
        balance: { decrement: boost.buyPrice },
        boosts: {
          update: {
            where: { id },
            data: { purchasedAt: new Date(), isPurchased: true, isPayed: false },
          },
        },
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalEarned: { increment: boost.boostPrice },
      },
    });

    const boosts = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        boosts: {
          select: {
            id: true,
            purchasedAt: true,
            boost: true,
          },
        },
      },
    });

    return boosts;
  }

  async updateBoost(id: number, data: Boost) {
    await this.prisma.boost.update({ where: { id }, data });
    const boosts = await this.prisma.boost.findMany({
      select: {
        id: true,
        name: true,
        isAvailable: true,
      },
    });
    return boosts;
  }

  async createBoost(data: Boost, isAdmin: boolean) {
      try {
        if (!isAdmin) throw "Should be an admin"
        const boost = await this.prisma.boost.create({ data });
        const users = await this.prisma.user.findMany();

        for (let user of users) {
          await this.prisma.userBoost.create({ data: {
            userId: user.id,
            boostId: boost.id,
            purchasedAt: new Date('2023-11-12')
          }});
        }        

        return boost;
      } catch (error) {
        throw error;
      }
  }

  async getAllBoosts() {
    const boosts = await this.prisma.boost.findMany({
      select: {
        id: true,
        name: true,
        isAvailable: true,
      },
    });
    return boosts;
  }

  async getAllUserBoosts(userid: number) {
    const boosts = await this.prisma.user.findUnique({
      where: { id: userid },
      select: {
        boosts: {
          select: {
            id: true,
            purchasedAt: true,
            boost: true,
          },
        },
      },
    });

    return boosts;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async payUserBoosts() {
    const dayAgo = new Date(Date.now() - 60 * 60 * 1000 * 24);
    const language = this.bot.context.from?.language_code || 'en';

    const boosts = await this.prisma.userBoost.findMany({
      where: {
        purchasedAt: { lte: new Date(dayAgo) },
        isPurchased: true,
        isPayed: false,
      },
      select: {
        id: true,
        boost: { select: { boostPrice: true, name: true } },
        userId: true,
        user: { select: { tgChatId: true } },
      },
    });

    if (boosts.length > 0) {
      try {
        await this.prisma.$transaction(
          boosts.map((boost) =>
            this.prisma.userBoost.update({
              where: { id: boost.id },
              data: {
                isPayed: true,
                isPurchased: false,
              },
            }),
          ),
        );

        await this.prisma.$transaction(
          boosts.map((boost) =>
            this.prisma.user.update({
              where: { id: boost.userId },
              data: {
                balance: { increment: boost.boost.boostPrice },
              },
            }),
          ),
        );

        await Promise.all(
          boosts.map((boost) => {
            if (language === 'en')
              this.bot.telegram.sendMessage(
                boost.user.tgChatId,
                `Boost Available ${boost.boost.name}`,
              );
            if (language === 'ru')
              this.bot.telegram.sendMessage(
                boost.user.tgChatId,
                'Доступно буст ' + boost.boost.name,
              );
          }),
        );
      } catch (error) {
        console.error('Error processing boosts:', error);
      }
    } else {
      console.log('No boosts to process at this time.');
    }
  }
}
