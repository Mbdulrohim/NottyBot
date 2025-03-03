import { AppDataSource } from '../config/dataSource';
import { User, Wallet, WalletProvider } from '../entity';
import { generateTonWallet } from '../trade/ton';

const walletRepository = AppDataSource.getRepository(Wallet);

// NOTE:
/*
    TON: Often 32 or 64 characters.
    Solana: Always 44 characters.
    TON: Hexadecimal characters (0-9, a-f).
    Solana: Base58 characters (1-9, A-Z, a-z).
    TON: Typically starts with 0x.
    Solana: No standard prefix, purely base58 characters.
*/

const createTonWallet = async (
  user: User,
  walletName: string
): Promise<Wallet> => {
  const { wallet, secretKey } = await generateTonWallet();
  return walletRepository.create({
    wallet_id: wallet.walletId.toString(),
    wallet_name: walletName,
    user,
    wallet_address: wallet.address.toString(),
    is_default: true,
    public_key: wallet.publicKey.toString(),
    encrypted_secret: secretKey,
    provider: WalletProvider.TON,
  });
};

const connectTonWallet = async (user: User): Promise<Wallet> => {
  const { wallet, secretKey } = await generateTonWallet();
  return walletRepository.create({
    wallet_id: wallet.walletId.toString(),
    user,
    wallet_address: wallet.address.toRawString(), // .toString(),
    is_default: true,
    public_key: wallet.publicKey.toString(),
    encrypted_secret: secretKey,
  });
};

const createSolWallet = async (
  user: User,
  walletName: string
): Promise<Wallet> => {
  const { wallet, secretKey } = await generateTonWallet();
  return walletRepository.create({
    wallet_id: wallet.walletId.toString(),
    wallet_name: walletName,
    user,
    wallet_address: wallet.address.toString(),
    is_default: true,
    public_key: wallet.publicKey.toString(),
    encrypted_secret: secretKey,
    provider: WalletProvider.TON,
  });
};

const connectSolWallet = async (user: User): Promise<Wallet> => {
  const { wallet, secretKey } = await generateTonWallet();
  return walletRepository.create({
    wallet_id: wallet.walletId.toString(),
    user,
    wallet_address: wallet.address.toString(),
    is_default: true,
    public_key: wallet.publicKey.toString(),
    encrypted_secret: secretKey,
  });
};

const createFirstWalletPair = async (user: User) => {
  const [tonWallet, solWallet] = await Promise.all([
    createTonWallet(user, 'Wallet 1'),
    createSolWallet(user, 'Wallet 2'),
  ]);

  return {
    ton: tonWallet.wallet_address,
    sol: solWallet.wallet_address,
  };
};

export { createFirstWalletPair };
