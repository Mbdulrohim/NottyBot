import { Context } from 'telegraf';
import { mockData } from '../utils/mockData';
import { createWalletKeyboard } from '../middleware/keyboard';

export async function handleWallet(ctx: Context) {
  // Simulate user session check
  if (!mockData.user) {
    return ctx.reply('Please start the bot first with /start');
  }

  const userWallets = mockData.user.wallets;
  const activeWallet = userWallets[0];

  await ctx.replyWithMarkdownV2(
    `💰 *Wallet Manager*\n` +
    `Active wallet: \`${activeWallet.address}\`\n` +
    `Balances:\n${userWallets.map(w => 
      `- \`${w.address.slice(0, 6)}...${w.address.slice(-4)}\`: *${w.balance} TON*`
    ).join('\n')}`,
    createWalletKeyboard(mockData.user)
  );
}



// import { TonService } from './ton-api';
// import { User, Wallet } from '../types/User';
// import { Address } from 'ton';

// export class WalletManager {
//   private tonService = new TonService();

//   async addNewWallet(user: User): Promise<User> {
//     const newWallet = await this.tonService.generateNewWallet(user);
    
//     return {
//       ...user,
//       wallets: [
//         ...(user.wallets || []).map(w => ({ ...w, isDefault: false })),
//         newWallet
//       ],
//       session: {
//         ...user.session,
//         activeWallet: newWallet.address
//       }
//     };
//   }

//   async refreshBalances(user: User): Promise<User> {
//     if (!user?.wallets) return user;
    
//     const updatedWallets = await Promise.all(
//       user.wallets.map(async wallet => ({
//         ...wallet,
//         balance: (await this.tonService.getWalletBalance(wallet.address)).toString(), // Convert bigint to string
//       }))
//     );
  
//     return {
//       ...user,
//       wallets: updatedWallets
//     };
//   }
  
//   async switchWallet(user: User, address: string): Promise<User> {
//     return {
//       ...user,
//       session: {
//         ...user.session,
//         activeWallet: address
//       }
//     };
//   }
// }

