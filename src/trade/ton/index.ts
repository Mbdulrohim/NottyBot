import { TonClient, WalletContractV4 } from '@ton/ton';
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { Constants } from '../../config/constants';
import { encrypt } from '../../utils';

const tonClient = new TonClient({
  endpoint: Constants.TON_URL,
});

const generateTonWallet = async (): Promise<{
  wallet: WalletContractV4;
  /** Encrypted Secret Key */
  secretKey: string;
}> => {
  const mnemonics = await mnemonicNew();
  const keyPair = await mnemonicToPrivateKey(mnemonics);
  const workchain = 0;
  const wallet = WalletContractV4.create({
    workchain,
    publicKey: keyPair.publicKey,
  });
  const contract = tonClient.open(wallet);
  contract.getBalance();

  console.log('Public Key:', keyPair.publicKey.toString('hex'));
  console.log('Private Key:', keyPair.secretKey.toString('hex'));

  console.log('Wallet Address:', wallet.address.toString());

  console.log('Full Ton Wallet Object:', wallet);

  const encrypted = encrypt(keyPair.secretKey.toString());

  return { wallet, secretKey: encrypted };
};

export { generateTonWallet };
