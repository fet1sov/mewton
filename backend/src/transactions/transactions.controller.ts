import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { TransactionsService } from './transactions.service';

@UseGuards(JwtGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(
    @Body() { receiverId, amount }: { receiverId: bigint; amount: number },
    @GetUser() user: User,
  ) {
    return this.transactionsService.create(user.telegramId, receiverId, amount);
  }
}
