import axios from 'axios';
import { Constants } from '../config/constants';

export const axiosTonInstance = axios.create({
  baseURL: Constants.TON_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosTelegramInstance = axios.create({
  baseURL: Constants.TELEGRAM_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
