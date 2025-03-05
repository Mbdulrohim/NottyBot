interface QuoteResponse {
    /** Mint address of the input token (e.g., SOL) */
    inputMint: string;
    /** Amount of input token in lamports/token units (as string) */
    inAmount: string;
    /** Mint address of the output token */
    outputMint: string;
    /** Amount of output token in lamports/token units (as string) */
    outAmount: string;
    /** Minimum output amount after slippage (as string) */
    otherAmountThreshold: string;
    /** Swap mode: "ExactIn" or "ExactOut" */
    swapMode: "ExactIn" | "ExactOut";
    /** Slippage tolerance in basis points (1 = 0.01%) */
    slippageBps: number;
    /** Platform fee details (null if no fee) */
    platformFee: {
      /** Fee recipient address */
      account: string;
      /** Fee amount in basis points */
      feeBps: number;
    } | null;
    /** Price impact percentage (as decimal string) */
    priceImpactPct: string;
    /** Swap route details */
    routePlan: Array<{
      swapInfo: {
        /** AMM pool ID */
        ammKey: string;
        /** DEX name (e.g., "Raydium") */
        label: string;
        /** Input token mint */
        inputMint: string;
        /** Output token mint */
        outputMint: string;
        /** Input amount for this hop */
        inAmount: string;
        /** Output amount for this hop */
        outAmount: string;
        /** Fee amount in lamports/token units */
        feeAmount: string;
        /** Mint address of fee token */
        feeMint: string;
      };
      /** Percentage of swap using this route (0-100) */
      percent: number;
    }>;
    /** Solana slot number for quote context */
    contextSlot: number;
    /** Time taken to compute the quote (seconds) */
    timeTaken: number;
    /** USD value of the swap */
    swapUsdValue: string;
    /** Whether a simplified route was used */
    simplerRouteUsed: boolean;
    /** Advanced routing analysis (null if not available) */
    scoreReport?: {
      /** Routing score (0-100) */
      score: number;
      /** Fees for the route */
      fees: Array<{
        mint: string;
        amount: string;
      }>;
      /** Potential arbitrage opportunities */
      arbitrage: string;
      /** Route success probability */
      successProbability: number;
    } | null;
  }