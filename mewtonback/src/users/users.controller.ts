import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './users.service';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return JSON.stringify(user, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
  }

  @Get()
  async getAllUsers(@GetUser() user: User) {
    const isAdmin = user.isAdmin;

    return this.userService.getAllUsers(isAdmin);
  }

  @Post('increase-points')
  async increasePoints(@GetUser() user: User, @Body() body: { points: number }) {
    const telegramId = user.telegramId;

    return this.userService.increasePoints(telegramId, body.points);
  }

  @Post('decrease-points')
  async decreasePoints(@GetUser() user: User, @Body() body: { points: number }) {
    const telegramId = user.telegramId;

    return this.userService.decreasePoints(telegramId, body.points);
  }

  @Post('points')
  async syncPoints(@GetUser() user: User, @Body() body: { points: number; energy: number }) {
    const telegramId = user.telegramId;

    return this.userService.syncPoints(telegramId, body.points, body.energy);
  }

  @Post('refill')
  async refill(@GetUser() user: User) {
    const telegramId = user.telegramId;

    return this.userService.refill(telegramId);
  }
}
