import axios from 'axios';

const TON_URL =
  process.env.TESTNET_MODE === 'true'
    ? process.env.TESTNET_TON_URL
    : process.env.TON_URL;

export const axiosTonInstance = axios.create({
  baseURL: TON_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TELEGRAM_API_URL =
  process.env.TELEGRAM_API_URL + '/bot' + process.env.BOT_TOKEN;

export const axiosTelegramInstance = axios.create({
  baseURL: TELEGRAM_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
