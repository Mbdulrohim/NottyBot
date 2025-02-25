// src/types/user.ts
export interface Wallet {
  address: string;
  provider: 'tonkeeper' | 'tonhub' | 'mytonwallet' | 'manual';
  balance: string; // Store as string for serialization
  isDefault: boolean;
  connectedAt: Date;
  publicKey: string;
  encryptedSecret: string;
}
export interface UserSession {
  activeWallet?: string;
  lastAction: Date;
  conversationState: 'idle' | 'awaiting_wallet' | 'awaiting_trade';
}

export interface ReferralInfo {
  code: string;
  referredCount: number;
  earnedTokens: number;
}

export interface User {
  id: string; // Telegram user ID
  username?: string;
  wallets: Wallet[];
  session: UserSession;
  referral?: ReferralInfo;
  settings: {
    riskLevel: 'low' | 'medium' | 'high';
    alertsEnabled: boolean;
    defaultSlippage: number;
  };
  createdAt: Date;
  lastActive: Date;
}

export interface hj {
  //
}
