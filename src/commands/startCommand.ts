import { Context } from 'telegraf';
import { sessionService, userService } from '../services';
import { escapeMarkdown, generateWalletImage } from '../utils';
import { User } from '../entity';
import { createMainMenuKeyboard } from '../middleware/keyboard';

export const startCommand = async (ctx: Context) => {
  try {
    // Get user's telegramId from ctx
    const telegram_user = ctx.from;
    const telegram_id = telegram_user?.id.toString() || '';

    if (!telegram_user || !telegram_id) {
      return;
    }

    // Check if user's telegramId exists in DB
    const existingUser = await userService.findUserByTelegramId(telegram_id);

    // Create new user in DB
    const newUser =
      !existingUser &&
      (await userService.createUser(
        telegram_id,
        telegram_user?.username || ''
      ));

    // If user exists in DB
    if (existingUser) {
      // Generate UserInfo ImageCard
      const imageBuffer = await generateWalletImage({
        username: telegram_user?.username || '',
        walletAddress: '',
        walletBalance: '0',
        walletCount: 9,
        isDefault: false,
      });

      const welcomeMessage = buildWelcomeMessage({
        username: telegram_user?.username || '',
        wallet_count: existingUser?.wallets.length || 0,
        referred_count: existingUser?.referral.referred_count || 0,
        telegram_id,
      });
      await ctx.replyWithPhoto(
        { source: imageBuffer },
        {
          caption: escapeMarkdown(welcomeMessage),
          parse_mode: 'MarkdownV2',
          ...createMainMenuKeyboard(),
        }
      );
    } else if (newUser) {
      // Remove and generate for new user
      const imageBuffer = await generateWalletImage({
        username: telegram_user?.username || '',
        walletAddress: '',
        walletBalance: '0',
        walletCount: 9,
        isDefault: false,
      });
      const welcomeMessage = newUserWelcomeMessage(
        telegram_user?.username || ''
      );
      const replyPromise = ctx.replyWithPhoto(
        { source: imageBuffer },
        {
          caption: escapeMarkdown(welcomeMessage),
          parse_mode: 'MarkdownV2',
          // Keyboard for new users should be slightly different since they don't have a connected wallet yet
          ...createMainMenuKeyboard(),
        }
      );
      const newSessionPromise = sessionService.createSession(telegram_id);

      await Promise.all([replyPromise, newSessionPromise]);
    }

    return;
  } catch (error) {
    console.error('Start command error', error);
    await ctx.reply('🚨 Error initializing bot. Please try again.');
  }
};

function newUserWelcomeMessage(username: string): string {
  return `
🚀 *Welcome to NottyBot*, ${escapeMarkdown(username)}!

💎 *Key Features:*
- Instant TON Trading
- Multi-Wallet Management
- Real-Time Market Data
- Secure Transactions

📌 Use the buttons below to navigate:
  `.replace(/  +/g, '');
}

function buildWelcomeMessage({
  username,
  wallet_count,
  referred_count,
  telegram_id,
}: {
  username: string;
  wallet_count: number;
  referred_count: number;
  telegram_id: string;
}): string {
  return `
🚀 *Welcome to NottyBot*, ${escapeMarkdown(username)}!

▫️ *Connected Wallets:* ${wallet_count}
▫️ *Current Rank:* ${getRank(telegram_id)}
▫️ *Referrals:* ${referred_count}

💎 *Key Features:*
- Instant TON Trading
- Multi-Wallet Management
- Real-Time Market Data
- Secure Transactions

📌 Use the buttons below to navigate:
  `.replace(/  +/g, '');
}

function getRank(telegram_id: string): string {
  // Perform logic and return
  console.log(telegram_id);
  return 'Bronze 🥉'; // 'Newbie 🆕';
}
