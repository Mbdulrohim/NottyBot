//7Eg4Bin1U4SNggFJFrKuGTo6e7ShuzjYyW9Quxtxpump

/**
 * ➡️ What we give
 * 1. The address you are swapping from with (default is Solana)
 * 2. The address of what you are swapping to
 * 3. Amount of what you are swapping from
 * 4. The slippage in basis points (bps)
 *
 * ➡️ What we expect
 * - inputMint: The address of the token being swapped from
 * - outputMint: The address of the token being swapped to
 * - inAmount: The amount of input token being swapped.
 * - outAmount: The estimated amount of output token you'll receive after swap.
 * - priceImpactPct: The percentage price impact for the swap.
 * - routePlan: Swap route with specific AMMs, fees, and other information.
 * - swapUsdValue: The USD equivalent value of the swap.
 * - Sol USD
 * - Market Cap use a random market cap for dev purpose i have my way around that else where
 */

import axios from "axios";
interface SwapQuote {
    inputMint: string;
    inAmount: string;
    outputMint: string;
    outAmount: string;
    otherAmountThreshold: string;
    swapMode: string; // Could be enum if limited options exist (e.g., 'ExactIn' | 'ExactOut')
    slippageBps: number;
    platformFee: null | { /* fee structure if available */ };
    priceImpactPct: string;
    routePlan: RouteStep[];
    scoreReport: null | { /* score report structure if available */ };
    contextSlot: number;
    timeTaken: number;
    swapUsdValue: number;
    simplerRouteUsed: boolean;
  }
  
  interface RouteStep {
    swapInfo: SwapInfo;
    percent: number;
  }
  
  interface SwapInfo {
    ammKey: string;
    label: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: string;
  }
export const getQuote = async (
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps: number = 50
): Promise<SwapQuote> => {
  try {
    const response = await axios.get(`https://api.jup.ag/swap/v1/quote`, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps,
        restrictIntermediateTokens: true,
      },
    });

    // Logging the response to see the structure
    return response.data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};

/**
 *
 *
 */
