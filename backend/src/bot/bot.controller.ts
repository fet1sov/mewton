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

    const referrerId = ctx.from.id;
    const referredId = Number((ctx as any)['startPayload']);

    const referrer = await this.prisma.user.findUnique({
          where: {
            telegramId: referrerId,
          },
        });
    
        const referred = await this.prisma.user.findUnique({
          where: {
            telegramId: referredId,
          },
        });
    
        const referredIds = await this.prisma.referral.findMany({
          where: {
            referredId: referred.id,
          },
        });
    
        if (referredIds.length == 0 && referrerId != referredId) {
          const res = await this.prisma.referral.create({
            data: {
              referrerId: referrer.id,
              referredId: referred.id,
            },
          });
      
          await this.prisma.user.update({
            where: {
              telegramId: referrerId,
            },
            data: {
              balance: referrer.balance + 0.001,
            },
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
