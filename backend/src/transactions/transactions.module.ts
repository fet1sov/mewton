import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategy';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [],
  providers: [JwtStrategy, TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
