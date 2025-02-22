// src/services/ton-api.ts
import { TonClient, WalletContractV4, internal, Address, Cell, ContractProvider } from "@ton/ton";
import { mnemonicNew, mnemonicToPrivateKey } from "@ton/crypto";
import { User, Wallet } from "../types/User";
import { encrypt, decrypt } from "../utils/crypto"; // Assume you have encryption utils

const TESTNET = process.env.TESTNET_MODE === "true";

export class TonService {
  private client: TonClient;

  constructor() {
    this.client = new TonClient({
      endpoint: TESTNET 
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TON_API_KEY // Add API key for mainnet access
    });
  }

  async generateNewWallet(user: User): Promise<Wallet> {
    try {
      const mnemonics = await mnemonicNew();
      const keyPair = await mnemonicToPrivateKey(mnemonics);
      
      const wallet = WalletContractV4.create({ 
        workchain: 0, 
        publicKey: keyPair.publicKey 
      });
      
      const contract = this.client.open(wallet);
      const balance = await this.getWalletBalance(contract.address.toString());

      return {
        address: contract.address.toString(),
        provider: 'manual',
        balance: balance.toString(),
        isDefault: user.wallets.length === 0,
        connectedAt: new Date(),
        publicKey: keyPair.publicKey.toString('hex'),
        // Encrypt sensitive data
        encryptedSecret: encrypt(Buffer.from(keyPair.secretKey).toString('hex'))
      };
    } catch (error) {
      console.error('Wallet generation failed:', error);
      throw new Error('Failed to generate new wallet');
    }
  }

  async getWalletBalance(address: string): Promise<bigint> {
    try {
      const validatedAddress = Address.parse(address);
      return await this.client.getBalance(validatedAddress);
    } catch (error) {
      console.error('Balance check failed:', error);
      throw new Error('Invalid wallet address');
    }
  }

  async createTransfer(wallet: Wallet, toAddress: string, amount: string) {
    try {
      // Validate inputs
      const amountNano = this.parseTonAmount(amount);
      const validatedTo = Address.parse(toAddress);
      
      // Decrypt secret key
      const secretKey = Buffer.from(decrypt(wallet.encryptedSecret), 'hex');

      const walletContract = WalletContractV4.create({
        workchain: 0,
        publicKey: Buffer.from(wallet.publicKey, 'hex')
      });

      const contract = this.client.open(walletContract);
      const seqno = await contract.getSeqno();

      return contract.createTransfer({
        seqno,
        secretKey,
        messages: [internal({
          value: amountNano,
          to: validatedTo,
          body: 'Transaction via NottyBot'
        })]
      });
    } catch (error) {
      console.error('Transfer creation failed:', error);
      throw new Error('Failed to create transaction');
    }
  }

  private parseTonAmount(amount: string): bigint {
    if (!/^\d+(\.\d+)?$/.test(amount)) {
      throw new Error('Invalid amount format');
    }
    return BigInt(Math.round(parseFloat(amount) * 1000000000));
  }

  // Add wallet validation method
  async validateWallet(wallet: Wallet): Promise<boolean> {
    try {
      const address = Address.parse(wallet.address);
      const state = await this.client.getContractState(address);
      return state.state === 'active';
    } catch {
      return false;
    }
  }
}