//test here

import dotenv from "dotenv";
import { contractMessage } from "./tokenData/contractMessage";
import { getWalletTokenBalance } from "./tokenData/getWalletSyntax";
import { getQuote } from "./tokenData/getQuote";
import { getMetadata } from "./tokenData/getMetadata";

dotenv.config();
(async () => {
    try {
      const address = process.env.ADDRESS;
      const mint = process.env.SOL_MINT;
      const wallet = process.env.WALLET;
  
      if (!address || !mint || !wallet) {
        throw new Error("Missing required environment variables");
      }
  
      console.log("🔄 Fetching token metadata...");
      const metadata = await getMetadata(address);
  
      console.log(metadata);
      const tokenName = metadata?.name;
      const tokenSymbol = metadata?.symbol;
      const decimal = metadata?.decimal;
      const totalSupplyBase = parseFloat(metadata?.totalSupply || '0');
      const totalSupplyTokens = totalSupplyBase / Math.pow(10, decimal!);
      console.log("\n🔄 Getting swap quote...");
      const quote = await getQuote(mint, address, 1000000000, 50);
      const lPPairAddress = quote.routePlan[0].swapInfo.ammKey;
      const dex = quote.routePlan[0].swapInfo.label;
      const tokenBalance = await getWalletTokenBalance(address, wallet);
      const outAmountBase = parseFloat(quote.outAmount) || 0;
      const outAmountTokens = outAmountBase / Math.pow(10, decimal!);
      const tokenSupply = totalSupplyTokens.toString()
      const solPriceUsd = quote.swapUsdValue;
      const priceInUsd = solPriceUsd / outAmountTokens; // USD per token
      // of token
      const priceInSol = 1 / outAmountTokens;
  
      const oneSolWorth = outAmountTokens; // one sol to x tokens
      const marketCap = totalSupplyTokens * priceInUsd;
  
      console.log(`✅ Metadata: ${JSON.stringify(metadata, null, 2)}`);
  
      console.log("\n🔄 Checking wallet balance...");
      //sol balance
      const solBalance = await getWalletTokenBalance(mint, wallet);
      const solBalanceLamports = parseFloat(
        solBalance.balance?.toString() || "0"
      );
      const mySolInUsd = (solBalanceLamports / 1e9) * solPriceUsd;
  
      const myBalanceSol = `${solBalance.balance?.toExponential()}`;
  
      const myBalance = `${tokenBalance.balance?.toExponential()}`;
  
      const message = await contractMessage(
          tokenName,
          tokenSymbol,
          address,
          lPPairAddress,
          dex,
          priceInUsd,
          priceInSol,
          oneSolWorth,
          myBalance,myBalanceSol,
          mySolInUsd,
          solPriceUsd,
          marketCap,
          tokenSupply
      )
      console.log(message)
      console.log("\n🚀 All operations completed!");
    } catch (error) {
      console.error("❌ Error in main execution:", error);
      process.exit(1);
    }
  })();
  