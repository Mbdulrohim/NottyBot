import { Context } from 'telegraf';

export const startCommand = (ctx: Context) => {
  ctx.replyWithMarkdownV2('🚀 *Welcome to TON DEX Bot\\!* Use `/help` to see all commands\\.');
};