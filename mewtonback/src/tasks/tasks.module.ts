import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategy';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, JwtStrategy],
})
export class TasksModule {}
