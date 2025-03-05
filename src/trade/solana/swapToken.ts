import {
  Connection,
  VersionedTransaction,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import bs58 from "bs58";
import { getQuote } from "./tokenData/getQuote";


// Environment configuration
dotenv.config();
const ENV = {
  HTTP_URL: process.env.HTTP,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  JUPITER_API_KEY: process.env.JUPITER_API_KEY, // Optional API key
};
console.log(process.env.PRIVATE_KEY);
console.log("PRIVATE_KEY:", JSON.stringify(process.env.PRIVATE_KEY));

if (!ENV.HTTP_URL || !ENV.PRIVATE_KEY) {
  throw new Error("Missing required environment variables");
}

// Initialize connection
const connection = new Connection(ENV.HTTP_URL);

// Initialize keypair safely
const secretKey = bs58.decode(process.env.PRIVATE_KEY!);
const userKeypair = Keypair.fromSecretKey(secretKey);
// Type definitions
interface SwapResponse {
  swapTransaction: string;
  lastValidBlockHeight: number;
  prioritizationFeeLamports: number;
  computeUnitLimit: number;
  prioritizationType: {
    computeBudget: {
      microLamports: number;
      estimatedMicroLamports: number;
    };
  };
  dynamicSlippageReport: {
    slippageBps: number;
    otherAmount: number;
    simulatedIncurredSlippageBps: number;
    amplificationRatio: string;
    categoryName: string;
    heuristicMaxSlippageBps: number;
  };
  simulationError: string | null;
}

interface PrioritizationFeeLamports {
  priorityLevelWithMaxLamports: {
    maxLamports: number;
    priorityLevel: "low" | "medium" | "high" | "veryHigh";
  };
}

interface SwapParams {
  inputMint: PublicKey;
  outputMint: PublicKey;
  amount: number;
  slippageBps?: number;
  dynamicComputeUnitLimit?: boolean;
  dynamicSlippage?: boolean;
  prioritizationFeeLamports?: PrioritizationFeeLamports;
}

const JUPITER_API_URL = process.env.JUPITER_API_URL!;

async function buildSwapTransaction(
  quote: any,
  options: {
    dynamicComputeUnitLimit?: boolean;
    dynamicSlippage?: boolean;
    prioritizationFeeLamports?: PrioritizationFeeLamports;
  } = {}
): Promise<SwapResponse> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (ENV.JUPITER_API_KEY) {
      headers["x-api-key"] = ENV.JUPITER_API_KEY;
    }

    const { data } = await axios.post<SwapResponse>(
      JUPITER_API_URL,
      {
        quoteResponse: quote,
        userPublicKey: userKeypair.publicKey.toBase58(),
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: options.dynamicComputeUnitLimit ?? true,
        dynamicSlippage: options.dynamicSlippage ?? true,
        ...(options.prioritizationFeeLamports && {
          prioritizationFeeLamports: options.prioritizationFeeLamports,
        }),
      },
      { headers }
    );

    if (!data?.swapTransaction) {
      throw new Error("Invalid swap response from Jupiter API");
    }

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Jupiter API Error:", {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    });
    throw new Error(`Failed to build swap transaction: ${axiosError.message}`);
  }
}

export async function executeSwap(params: SwapParams): Promise<string> {
  try {
    // Validate inputs
    if (params.amount <= 0) throw new Error("Invalid swap amount");
    if (!PublicKey.isOnCurve(params.inputMint))
      throw new Error("Invalid input mint");
    if (!PublicKey.isOnCurve(params.outputMint))
      throw new Error("Invalid output mint");

    // Get quote with slippage
    const quote = await getQuote(
      params.inputMint.toBase58(),
      params.outputMint.toBase58(),
      params.amount,
      params.slippageBps || 50
    );

    // Build transaction with optimization parameters
    const swapResponse = await buildSwapTransaction(quote, {
      dynamicComputeUnitLimit: params.dynamicComputeUnitLimit,
      dynamicSlippage: params.dynamicSlippage,
      prioritizationFeeLamports: params.prioritizationFeeLamports,
    });

    // Deserialize and sign transaction
    const transaction = VersionedTransaction.deserialize(
      Buffer.from(swapResponse.swapTransaction, "base64")
    );
    transaction.sign([userKeypair]);

    // Send and confirm transaction
    const txid = await connection.sendRawTransaction(transaction.serialize(), {
      skipPreflight: false,
      maxRetries: 3,
    });
    console.log(txid);
    await connection.confirmTransaction({
      signature: txid,
      lastValidBlockHeight: swapResponse.lastValidBlockHeight,
      blockhash: transaction.message.recentBlockhash,
    });

    console.log(`Swap successful: https://solscan.io/tx/${txid}`);
    return txid;
  } catch (error) {
    console.error(
      "Swap Execution Error:",
      error instanceof Error ? error.message : error
    );
    throw error; // Re-throw for upstream handling
  }
}

export default function convertSolToLamports(
  amount: number,
  decimal: number
): number {
  return Math.round(amount * 10 ** decimal);
}
