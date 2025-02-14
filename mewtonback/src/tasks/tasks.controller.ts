import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTaskDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }

  @Post('complete')
  async completeTask(@GetUser() user: User, @Body() body: { taskId: number; channelLink: string }) {
    const telegramId = user.telegramId;
    return this.tasksService.completeTask(telegramId, body.taskId, body.channelLink);
  }

  @Delete()
  async deleteTask(@Body() body: { taskId: number }) {
    return this.tasksService.deleteTask(body.taskId);
  }

  @Get()
  async getTasks() {
    return this.tasksService.getTasks();
  }

  @Get('user')
  async getUserTasks(@GetUser() user: User) {
    const telegramId = user.telegramId;
    return this.tasksService.getUserTasks(telegramId);
  }
}
