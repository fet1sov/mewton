import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategy';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [],
  providers: [JwtStrategy, UserService],
  controllers: [UserController],
})
export class UserModule {}
