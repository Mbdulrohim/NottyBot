import crypto from 'crypto';
import dotenv from 'dotenv';
import { Constants } from '../config/constants';

dotenv.config();

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(Constants.CRYPTO_SECRET, 'salt', 32);
const iv = Buffer.alloc(16, 0);

function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export { encrypt, decrypt };
