export const Constants = {
  TON_URL:
    process.env.TESTNET_MODE === 'true'
      ? process.env.TESTNET_TON_URL ?? ''
      : process.env.TON_URL ?? '',
  TELEGRAM_API_URL:
    process.env.TELEGRAM_API_URL + '/bot' + process.env.BOT_TOKEN,
  CRYPTO_SECRET: process.env.CRYPTO_SECRET ?? '',
} as const;
