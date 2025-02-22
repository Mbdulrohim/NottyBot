// src/middleware/keyboard.ts
import { Markup } from "telegraf";
import { User, Wallet } from "../types/User";

export function createWalletKeyboard(user: User) {
  if (!user.wallets) {
    user.wallets = [];
  }

  const keyboard = [];
  
  user.wallets.forEach((wallet, index) => {
    keyboard.push([
      Markup.button.callback(
        `${getProviderEmoji(wallet.provider)} Wallet ${index + 1} ${wallet.isDefault ? '⭐' : ''}`,
        `wallet_${index}`
      )
    ]);
  });

  keyboard.push([
    Markup.button.callback('➕ Add Wallet', 'add_wallet'),
    Markup.button.callback('💸 Transfer', 'transfer_funds')
  ]);

  keyboard.push([
    Markup.button.callback('⭐ Set Default', 'set_default'),
    Markup.button.callback('🔄 Refresh', 'refresh_wallets')
  ]);

  keyboard.push([Markup.button.callback('🔙 Back', 'back_to_main')]);

  return Markup.inlineKeyboard(keyboard);
}


function getProviderEmoji(provider: Wallet["provider"]): string {
  return {
    tonkeeper: "🔷",
    tonhub: "🔶",
    mytonwallet: "🟡",
    manual: "⚙️",
  }[provider];
}

// Wallet action keyboard (shown when specific wallet is selected)
export function createWalletDetailKeyboard(wallet: Wallet) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("📤 Send", `send_${wallet.address}`),
      Markup.button.callback("📥 Receive", `receive_${wallet.address}`),
    ],
    [
      Markup.button.callback("📊 History", `history_${wallet.address}`),
      Markup.button.callback("🗑️ Disconnect", `disconnect_${wallet.address}`),
    ],
    [Markup.button.callback("🔙 Back", "back_to_wallets")],
  ]);
}
// src/middleware/keyboard.ts (additional function)
export function createMainMenuKeyboard(user: User) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("💰 Wallet", "wallet_action"),
      Markup.button.callback("📈 Trade", "trade_action"),
    ],
    [
      Markup.button.callback("🏆 Leaderboard", "leaderboard_action"),
      Markup.button.callback("⛽ Gas Tracker", "gas_action"),
    ],
    [
      Markup.button.callback("⚙️ Settings", "settings_action"),
      Markup.button.callback("🎮 TON Arcade", "arcade_action"),
    ],
    [
      Markup.button.url("Official Group", "https://t.me/NottyBot"),
      Markup.button.url("Documentation", "https://docs.nottybot.com"),
    ],
  ]);
}
// Example usage in wallet command:
// await ctx.reply('Select a wallet:', createWalletKeyboard(user));
