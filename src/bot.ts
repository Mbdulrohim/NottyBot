import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import { balanceCommand } from './commands/balance';
import { priceCommand } from './commands/price';
import { tradeCommand } from './commands/trade';
import { handleWallet } from './commands/wallet';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

// Enable Markdown parsing middleware
bot.use((ctx, next) => {
  ctx.replyWithMarkdownV2 = (text, extra) => {
    return ctx.reply(text, { parse_mode: 'MarkdownV2', ...extra });
  };
  return next();
});

// Register commands
bot.start(startCommand);
bot.help(helpCommand);
bot.command('balance', balanceCommand);
bot.command('price', priceCommand);
bot.command('trade', tradeCommand);
// For /wallet command (sends new message)
bot.command('wallet', handleWallet);

// For inline button actions (edits existing message)
bot.action('wallet_action', async (ctx) => {
  await ctx.answerCbQuery(); // Acknowledge button press
  await handleWallet(ctx);   // Reuse handler
});
export default bot;
