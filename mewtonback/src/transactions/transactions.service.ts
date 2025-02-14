import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(senderId: bigint, receiverId: bigint, amount: number) {
    try {
      const sender = await this.prisma.user.findUnique({
        where: {
          telegramId: senderId,
        },
      });

      const receiver = await this.prisma.user.findUnique({
        where: {
          telegramId: receiverId,
        },
      });

      if (!sender || !receiver) {
        throw new ForbiddenException('User not found');
      }

      if (sender.balance < amount) {
        throw new ForbiddenException('Insufficient balance');
      }

      const result = await this.prisma.$transaction(async (prisma) => {
        const task1 = await prisma.user.update({
          where: {
            telegramId: senderId,
          },
          data: {
            balance: sender.balance - amount,
          },
        });

        const task2 = await prisma.user.update({
          where: {
            telegramId: receiverId,
          },
          data: {
            balance: receiver.balance + amount,
          },
        });

        return { task1, task2 };
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
