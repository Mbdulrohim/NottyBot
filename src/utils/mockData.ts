// src/mockData.ts

import { User } from '../types/User';

export const mockData: { user: User } = {
  user: {
    id: '123456789', // Example Telegram ID
    username: 'TestUser',
    wallets: [
      {
        address: 'EQC1...X3G4',
        provider: 'tonkeeper',
        balance: '152.34',
        isDefault: true,
        connectedAt: new Date('2024-02-16T12:00:00Z'),
        publicKey: 'PUBLIC_KEY_1',
        encryptedSecret: 'ENCRYPTED_SECRET_1',
      },
      {
        address: 'EQD4...T6P9',
        provider: 'mytonwallet',
        balance: '54.89',
        isDefault: false,
        connectedAt: new Date('2024-02-16T12:30:00Z'),
        publicKey: 'PUBLIC_KEY_2',
        encryptedSecret: 'ENCRYPTED_SECRET_2',
      }
    ],
    session: {
      activeWallet: 'EQC1...X3G4',
      lastAction: new Date(),
      conversationState: 'idle',
    },
    referral: {
      code: 'REF123',
      referredCount: 3,
      earnedTokens: 25,
    },
    settings: {
      riskLevel: 'medium',
      alertsEnabled: true,
      defaultSlippage: 0.5,
    },
    createdAt: new Date('2024-02-10T10:00:00Z'),
    lastActive: new Date(),
  }
};

export const mockTrades = [
  {
    tradeId: 'T001',
    userId: '123456789',
    token: 'TON-USDT',
    amount: 100,
    price: 2.34,
    status: 'open',
    pnl: '+15.3%',
    timestamp: new Date('2024-02-18T14:00:00Z'),
  },
  {
    tradeId: 'T002',
    userId: '123456789',
    token: 'BTC-TON',
    amount: 0.01,
    price: 50000,
    status: 'closed',
    pnl: '-3.2%',
    timestamp: new Date('2024-02-17T16:30:00Z'),
  },
];

export const mockLeaderboard = {
  topTraders: [
    { username: 'Whale123', pnl: '+120%' },
    { username: 'SniperX', pnl: '+98%' },
    { username: 'TestUser', pnl: '+75%' },
  ],
  topReferrals: [
    { username: 'InviteKing', referrals: 50 },
    { username: 'Shiller99', referrals: 30 },
    { username: 'TestUser', referrals: 10 },
  ],
  mostTradedTokens: [
    { token: 'TON-USDT', volume: 50000 },
    { token: 'BTC-TON', volume: 32000 },
    { token: 'ETH-TON', volume: 15000 },
  ],
};

export const mockGasPrices = {
  ton: { fast: 0.05, normal: 0.03, slow: 0.01 },
  btc: { fast: 5, normal: 3, slow: 1 },
  eth: { fast: 12, normal: 8, slow: 3 },
};

export const mockNotifications = [
  {
    userId: '123456789',
    message: 'Your trade on TON-USDT was executed successfully!',
    timestamp: new Date('2024-02-18T14:30:00Z'),
    seen: false,
  },
  {
    userId: '123456789',
    message: 'New referral bonus received! +5 TON',
    timestamp: new Date('2024-02-18T15:00:00Z'),
    seen: true,
  }
];

export const mockTransactions = [
  {
    userId: '123456789',
    type: 'deposit',
    amount: '100 TON',
    status: 'completed',
    timestamp: new Date('2024-02-17T10:00:00Z'),
  },
  {
    userId: '123456789',
    type: 'withdrawal',
    amount: '50 TON',
    status: 'pending',
    timestamp: new Date('2024-02-18T12:30:00Z'),
  },
];

export const mockSettings = {
  userId: '123456789',
  riskLevel: 'medium',
  alertsEnabled: true,
  defaultSlippage: 0.5,
  preferredExchange: 'tonkeeper',
};

