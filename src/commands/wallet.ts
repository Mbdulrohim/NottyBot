import { Context } from 'telegraf';
import { mockData } from '../utils/mockData';
import { createWalletKeyboard } from '../middleware/keyboard';
import { User } from '../types/User';
import { escapeMarkdown } from '../utils/escapeMarkdown';

export async function handleWallet(ctx: Context & { user?: User }) {
  const user = ctx.user || mockData.user;
  const messageText = 
    `💰 *Wallet Manager*\n` +
    `Active wallet: \`${user.session.activeWallet || 'None'}\`\n` +
    `Balances:\n${user.wallets.map(w => 
      `- ${w.address.slice(0, 6)}...${w.address.slice(-4)}: ${w.balance} TON`
    ).join('\n')}`;

  // Check if the message is a text message and has a message_id
  if (ctx.callbackQuery?.message && 'text' in ctx.callbackQuery.message && ctx.callbackQuery.message.message_id) {
    try {
      await ctx.editMessageText(escapeMarkdown(messageText), {
        parse_mode: 'MarkdownV2',
        ...createWalletKeyboard(user)
      });
    } catch (error) {
      console.error('Edit message failed:', error);
      await ctx.replyWithMarkdownV2(escapeMarkdown(messageText), createWalletKeyboard(user));
    }
  } else {
    // Send a new message if it's not a text message or no message_id
    await ctx.replyWithMarkdownV2(escapeMarkdown(messageText), createWalletKeyboard(user));
  }
}