import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Boost, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BoostsService } from './boosts.service';

@UseGuards(JwtGuard)
@Controller('boosts')
export class BoostsController {
  constructor(private boostsService: BoostsService) {}

  @Post('/buy/:id')
  async buyBoost(@Param('id') id: number, @GetUser() user: User) {
    return this.boostsService.buyBoost(+id, user.id);
  }

  @Post('/create')
  async createBoost(@Body() body: Boost, @GetUser() user: User) {
    return this.boostsService.createBoost(body, user.isAdmin);
  }

  @Patch('/:id')
  async updateBoost(@Param('id') id: number, @Body() body: Boost) {
    return this.boostsService.updateBoost(+id, body);
  }

  @Get('user')
  async getAllUserBoosts(@GetUser() user: User) {
    return this.boostsService.getAllUserBoosts(user.id);
  }

  @Get()
  async getAllBoosts() {
    return this.boostsService.getAllBoosts();
  }
}
