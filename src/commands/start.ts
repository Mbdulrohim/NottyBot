import { Context, Markup } from 'telegraf';
import { generateStartImage } from '../services/welcome-image';
import { escapeMarkdown } from '../utils/escapeMarkdown';
import { createMainMenuKeyboard } from '../middleware/keyboard';
import { mockData } from '../utils/mockData';
import { generateWalletImage } from '../utils';
import { generatePnLImage } from '../services/pnl-image';

export const startCommand = async (ctx: Context) => {
  try {
    // Get actual user data from session/database, fallback to mock data
    const user =
      (await getUserFromSession(ctx.from?.id.toString() || '')) ||
      mockData.user;

    // Generate dynamic image with user data
    // const imageBuffer = await generateStartImage({
    //   username: user.username || 'New User',
    //   walletBalance: user.wallets.length > 0 ? user.wallets[0].balance : '0',
    // });
    const image = await generatePnLImage({
      pair: 'ETH/SOL',
      entry: '56K @0.0032',
      exit: '58K @0.0035',
      duration: '02d 04h 30m',
      percentChange: '+65.4%',
      refQr: 'https://api.qrserver.com/v1/create-qr-code/?data=6365646358',
      refNo: '6xR44435',
      username: '@DOVEYYLTT',
      userImage: 'https://api.qrserver.com/v1/create-qr-code/?data=6365646358',
      profit: true,
    });

    const imageBuffer = await generateWalletImage({
      username: 'JohnDoe',
      walletAddress: 'EQABC...xyz',
      walletBalance: '24.50',
      walletCount: 3,
      isDefault: true,
    });
    const welcomeMessage = buildWelcomeMessage(user);

    await ctx.replyWithPhoto(
      { source: image },
      {
        caption: escapeMarkdown(welcomeMessage),
        parse_mode: 'MarkdownV2',
        ...createMainMenuKeyboard(user),
      }
    );

    // Initialize user session properly
    initializeUserSession(ctx);
  } catch (error) {
    console.error('Start command error:', error);
    await ctx.reply('🚨 Error initializing bot. Please try again.');
  }
};

// Helper functions
function buildWelcomeMessage(user: typeof mockData.user): string {
  return `
🚀 *Welcome to NottyBot*, ${escapeMarkdown(user.username || 'Trader')}!

▫️ *Connected Wallets:* ${user.wallets.length}
▫️ *Current Rank:* ${getRank(user)}
▫️ *Referrals:* ${user.referral?.referredCount || 0}

💎 *Key Features:*
- Instant TON Trading
- Multi-Wallet Management
- Real-Time Market Data
- Secure Transactions

📌 Use the buttons below to navigate:
  `.replace(/  +/g, '');
}

function getRank(user: typeof mockData.user): string {
  return user.wallets.length > 0 ? 'Bronze 🥉' : 'Newbie 🆕';
}

async function getUserFromSession(userId: string) {
  // Implement real DB logic later
  return null;
}

function initializeUserSession(ctx: any) {
  // Implement session initialization logic
}

// Enhanced action handlers
export const registerStartActions = (bot: any) => {
  bot.action('wallet_action', async (ctx: Context) => {
    await ctx.reply('Wallet section coming soon!');
  });

  bot.action('trade_action', async (ctx: Context) => {
    await ctx.replyWithMarkdownV2(
      'Enter token address or name:',
      Markup.forceReply().selective()
    );
  });

  bot.action('help_action', (ctx: Context) =>
    ctx.reply('Help content...', Markup.removeKeyboard())
  );
};
