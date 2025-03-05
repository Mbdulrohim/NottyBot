import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { AccountLayout, getMint, Mint, NATIVE_MINT } from "@solana/spl-token";
import dotenv from 'dotenv';
dotenv.config();

// Use a dedicated RPC endpoint in production instead of public clusterApiUrl
const connection = new Connection(
  process.env.HTTP!
);

type BalanceResult = {
  success: boolean;
  balance?: number;
  error?: string;
  decimals?: number;
  rawAmount?: string;
};

export const getWalletTokenBalance = async (
  tokenAddress: string,
  wallet: string
): Promise<BalanceResult> => {

  try {
    // Validate inputs
    if (!PublicKey.isOnCurve(tokenAddress) || !PublicKey.isOnCurve(wallet)) {
      throw new Error("Invalid public key format");
    }
    const tokenMintAddress = new PublicKey(tokenAddress);
    const walletAddress = new PublicKey(wallet);

    if (tokenMintAddress === NATIVE_MINT) {
        const lamports = await connection.getBalance(walletAddress);
        const solBalance = (lamports / 1e9).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        return {
        success: true,
        balance: parseFloat(solBalance), 
        decimals: 9,
        rawAmount: lamports.toString(),
      };
    }

    // Get token accounts 
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      walletAddress,
      {
        mint: tokenMintAddress,
      }
    );

    if (tokenAccounts.value.length === 0) {
      return {
        success: true,
        balance: 0,
        decimals: 0,
        rawAmount: "0",
      };
    }

    // Handle potential multiple token accounts
    const tokenAccount = tokenAccounts.value[0];
    if (!tokenAccount.account.data) {
      throw new Error("Token account data is empty");
    }

    // Decode with validation
    const accountData = AccountLayout.decode(tokenAccount.account.data);
    if (!accountData.mint.equals(tokenMintAddress)) {
      throw new Error("Mint address mismatch in token account");
    }

    // Get mint info g
    const mintInfo: Mint = await getMint(connection, tokenMintAddress);
    if (mintInfo.decimals === undefined || mintInfo.decimals < 0) {
      throw new Error("Invalid decimals value");
    }

    const rawAmount = BigInt(accountData.amount.toString());
    const divisor = BigInt(10 ** mintInfo.decimals);
    const balance = Number(rawAmount / divisor);

    return {
      success: true,
      balance,
      decimals: mintInfo.decimals,
      rawAmount: rawAmount.toString(),
    };
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    console.error(
      `Error fetching balance for ${tokenAddress}: ${errorMessage}`
    );

    return {
      success: false,
      error: errorMessage,
      balance: 0,
    };
  }
};
