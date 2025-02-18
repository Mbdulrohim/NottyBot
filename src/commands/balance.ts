import { Context } from 'telegraf';

export const balanceCommand = (ctx: Context) => {
  const fakeBalances = {
    TON: 100,
    NOT: 5000,
    USDT: 200
  };
  
  ctx.replyWithMarkdownV2(`
💰 *Your Balances:*
*TON*: ${fakeBalances.TON}
*NOT*: ${fakeBalances.NOT}
*USDT*: ${fakeBalances.USDT}
  `);
};