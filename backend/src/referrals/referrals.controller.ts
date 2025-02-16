import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ReferralsService } from './referrals.service';

@UseGuards(JwtGuard)
@Controller('referrals')
export class ReferralsController {
  constructor(private referralsService: ReferralsService) {}

  @Post()
  async createReferral(@Body() { referrerId }: { referrerId: bigint }, @GetUser() user: User) {
    return this.referralsService.create(user.telegramId, BigInt(referrerId));
  }

  @Get() 
  async getReferrals(@GetUser() user: User) {
    return this.referralsService.getReferrals(user.telegramId);
  }
}
