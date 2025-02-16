import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async getTasks() {
    try {
      const tasks = await this.prisma.tasks.findMany();
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async createTask(data: CreateTaskDto) {
    try {
      const task = await this.prisma.tasks.create({ data });
      const users = await this.prisma.user.findMany();

      if (users.length > 0) {
        for (const user of users) {
          await this.prisma.userTask.create({
            data: {
              taskId: task.id,
              userId: user.id,
            },
          });
        }
      }

      const tasks = await this.prisma.tasks.findMany();

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async completeTask(telegramId: bigint, taskId: number, channelUsername: string) {
    try {
      const botToken = this.config.get('TELEGRAM_BOT_TOKEN');

      if (!botToken) {
        return { error: 'Telegram bot token is missing' };
      }

      if (!telegramId || !channelUsername) {
        return { error: 'Invalid request: missing telegramId or channelUsername' };
      }

      let formattedChatId = channelUsername;
      if (!channelUsername.startsWith('@') && !channelUsername.startsWith('-100')) {
        formattedChatId = '@' + channelUsername;
      }

      const url = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${encodeURIComponent(formattedChatId)}&user_id=${telegramId}`;

      const response = await fetch(url);

      if (!response.ok) {
        return { error: 'Failed to get chat member status' };
      }

      if (response.ok) {
        const status = await response.json().then((data) => data.result.status);
        const isMember = ['creator', 'administrator', 'member'].includes(status);

        if (!isMember) {
          return { error: 'User is not a member of the channel' };
        }

        await this.prisma.user.update({
          where: {
            telegramId,
          },
          data: {
            tasks: {
              delete: {
                id: taskId,
              },
            },
          },
        });

        await this.prisma.user.update({
          where: {
            telegramId,
          },
          data: {
            points: {
              increment: 250,
            },
          },
        });

        return { success: true };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(taskId: number) {
    try {
      return this.prisma.tasks.delete({ where: { id: taskId } });
    } catch (error) {
      throw error;
    }
  }

  async getUserTasks(telegramId: bigint) {
    try {
      const tasks = await this.prisma.user.findUnique({
        where: { telegramId },
        select: {
          tasks: {
            select: {
              id: true,
              task: true,
            },
          },
        },
      });

      console.log(tasks);

      return JSON.stringify(tasks, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      );
    } catch (error) {
      throw error;
    }
  }
}
