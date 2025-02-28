import { Telegraf } from 'telegraf';
import { startCommand } from './startCommand';
import { balanceCommand } from './balance';
import { priceCommand } from './price';
import { tradeCommand } from './trade';

export const setupCommands = (bot: Telegraf) => {
  bot.start(startCommand);
  bot.command('balance', balanceCommand);
  bot.command('price', priceCommand);
  bot.command('trade', tradeCommand);
};
