import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import { balanceCommand } from './commands/balance';
import { priceCommand } from './commands/price';
import { tradeCommand } from './commands/trade';
// import { handleWallet } from './commands/wallet';
import {handleWallet} from "./commands/wallet";

dotenv.config();
/**
 * start command with a link
 * start with contract link
 * START WITH A REF AND CONTRACT
 * when message is sent, different states, is it can be command(we parse the one we have available), ton smart contract, solana contract address,--we handle all and also 
 */
console.log('Initializing Telegram bot...');
const bot = new Telegraf(process.env.BOT_TOKEN!);

// Enable Markdown parsing middleware
console.log('Setting up Markdown parsing middleware...');
bot.use((ctx, next) => {
  console.log(`Processing update (ID: ${ctx.update.update_id}) of type: ${ctx.updateType}`);
  ctx.replyWithMarkdownV2 = (text, extra) => {
    return ctx.reply(text, { parse_mode: 'MarkdownV2', ...extra });
  };
  return next();
});

// Register commands with logging
console.log('Registering command handlers...');

bot.start((ctx) => {
  console.log(`/start command received from ${ctx.from?.id || 'unknown user'}`);
  return startCommand(ctx);
});

bot.help((ctx) => {
  console.log(`/help command received from ${ctx.from?.id || 'unknown user'}`);
  return helpCommand(ctx);
});

bot.command('balance', (ctx) => {
  console.log(`/balance command received from ${ctx.from?.id || 'unknown user'}`);
  return balanceCommand(ctx);
});

bot.command('price', (ctx) => {
  console.log(`/price command received from ${ctx.from?.id || 'unknown user'}`);
  return priceCommand(ctx);
});

bot.command('trade', (ctx) => {
  console.log(`/trade command received from ${ctx.from?.id || 'unknown user'}`);
  return tradeCommand(ctx);
});

bot.command('wallet', (ctx) => {
  console.log(`/wallet command received from ${ctx.from?.id || 'unknown user'}`);
  return handleWallet(ctx);
});

// Inline button actions
console.log('Registering inline button handlers...');
bot.action('wallet_action', async (ctx) => {
  console.log(`wallet_action triggered by ${ctx.from?.id || 'unknown user'} (callback ID: ${ctx.callbackQuery.id})`);
  await ctx.answerCbQuery();
  await handleWallet(ctx);
});

console.log('Bot setup completed successfully');

export default bot;