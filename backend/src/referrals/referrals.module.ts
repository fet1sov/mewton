import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategy';
import { ReferralsController } from './referrals.controller';
import { ReferralsService } from './referrals.service';

@Module({
  imports: [],
  providers: [JwtStrategy, ReferralsService],
  controllers: [ReferralsController],
})
export class ReferralsModule {}
