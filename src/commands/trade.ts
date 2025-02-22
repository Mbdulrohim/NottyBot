import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { escapeMarkdown } from '../utils/escapeMarkdown';

export const tradeCommand = (ctx: Context) => {
  const args = (ctx.message as Message.TextMessage).text.split(' ') || [];
  
  if (args.length < 3) {
    return ctx.replyWithMarkdownV2('❌ *Usage:* `/trade \[token\] \[amount\]`');
  }

  const token = args[1].toUpperCase();
  const amount = parseFloat(args[2]);

  if (isNaN(amount)) {
    return ctx.replyWithMarkdownV2('❌ *Invalid amount*\.');
  }

  // Fake trade logic
  const pnl = (Math.random() - 0.5) * 20;
  const result = amount + (amount * pnl / 100);

  ctx.replyWithMarkdownV2(escapeMarkdown(`
✅ *Trade executed\!*
📈 *Token:* ${token}
💰 *Amount:* ${amount}
📊 *PnL:* ${pnl.toFixed(2)}%
💸 *Result:* ${result.toFixed(2)}
  `));
};