import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Telegraf } from 'telegraf';

@Update()
export class BotController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private prisma: PrismaService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    const payload = encodeURIComponent(JSON.stringify(ctx.message));
    const language = ctx.message.from.language_code;
    const webAppUrl = `https://mewtonfarm.com/?startapp=${payload}`;

    console.log((ctx as any)['startPayload']);

    const count = await this.prisma.user.count({
      where: { telegramId: ctx.from.id }
    });

    if (count)
    {
      await this.prisma.user.update({
        where: { telegramId: ctx.from.id },
        data: { tgChatId: String(ctx.chat.id) },
      });
    }

    if (language === 'en') {
      await ctx.replyWithPhoto(
        'https://ciudikqidyqvkwwsxhiv.supabase.co/storage/v1/object/sign/test/welcome.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L3dlbGNvbWUuanBnIiwiaWF0IjoxNzMyMzY3MjQ2LCJleHAiOjE3NjM5MDMyNDZ9.wOlkJaWr88o392AubjvdeFKqhydravLQICzDpccGCwk&t=2024-11-23T13%3A07%3A24.613Z',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Play',
                  web_app: {
                    url: webAppUrl,
                  },
                },
              ],
            ],
          },
        },
      );
    }

    if (language === 'ru') {
      await ctx.replyWithPhoto(
        'https://ciudikqidyqvkwwsxhiv.supabase.co/storage/v1/object/sign/test/photo_2024-11-23_01-14-34.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L3Bob3RvXzIwMjQtMTEtMjNfMDEtMTQtMzQuanBnIiwiaWF0IjoxNzMyMzY4NzAyLCJleHAiOjE3NjM5MDQ3MDJ9.rNhIj7aKHkhJD09CdFHk16fCNRYgawcVi8EeipaERcQ&t=2024-11-23T13%3A31%3A40.978Z',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Играть',
                  web_app: {
                    url: webAppUrl,
                  },
                },
              ],
            ],
          },
        },
      );
    }
  }
}
