import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import { balanceCommand } from './commands/balance';
import { priceCommand } from './commands/price';
import { tradeCommand } from './commands/trade';

// Load environment variables
dotenv.config();

// Initialize bot
const bot = new Telegraf(process.env.BOT_TOKEN!);

// Enable Markdown parsing
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

// Launch bot
bot.launch();
console.log('Bot is running...');