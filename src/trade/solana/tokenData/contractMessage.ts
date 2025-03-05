// IN SOL

export const contractMessage = async (
  name: string = "Unknown", // ✅
  symbol: string = "Unknown", // ✅
  tokenAddress: string = "Unknown", // ✅
  // imageURL
  lPPairAddress: string = "Unknown", // ✅
  dex: string = "Unknown" /**  dex that would be traded  + ✅ */,
  priceInUsd: number = 0, // of the token priceInSol*✅
  priceInSol: number = 0, // to be spent✅
  oneSolWorth: number = 0, //✅
  myBalance: string, // ✅
  myBalanceSol: string, //✅
  mySolInUsd: number = 0, //✅
  solPriceUsd: number = 0, //✅
  marketCap: number = 0, //✅
  totalSupply: string = "Unkownn" // ✅
) => {
  const myTokenValueUsd = (
    Number(myBalance) * Number(priceInUsd)
  ).toLocaleString();
  const requiredSolForOneToken = (1 / Number(priceInSol)).toExponential(3);
  const priceImpactWarning =
    Number(priceInSol) < 0.0001 ? "🚨 HIGH IMPACT" : "✅ Low Impact";

  const truncate = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;
  const scientificToHuman = (value: string) =>
    Number(value) < 0.001
      ? Number(value).toExponential(2)
      : Number(value).toFixed(4);

  return escapeMarkdownV2(`
      📈 *${name} (${symbol})📉*
      🔗 *Token Info*
      │ Address: ${truncate(tokenAddress)}
      │ LP Pair: ${truncate(lPPairAddress)}
      │ DEX: \`${dex}\`
      
      💸 *Pricing* (1 SOL = ${oneSolWorth} ${symbol}\\)
      │ Token Price: \\$${priceInUsd.toFixed(2)} | ◎${scientificToHuman(
    priceInSol.toString()
  )}
      │ SOL Price: $${Number(solPriceUsd).toFixed(2)}
      │ ${priceImpactWarning} \\(1 ${symbol} = ◎${requiredSolForOneToken} SOL)
      
      💰 *Wallet Balance*
      │ ${symbol}: ${Number(myBalance).toLocaleString()} (~$${myTokenValueUsd})
      
      📊 *Market Data*
      │ FDV: \\$${Number(marketCap).toLocaleString()}
      │ Pool Fees: 0.25%
      
      💡 *Pro Tips*
      1. Always verify contract renounced status
      2. Check 24h volume (>$10k recommended)
      3. Confirm LP lock duration
      4. New token? Assume *HIGH* risk!
      `);
};
function escapeMarkdownV2(text: string): string {
  // List of all special characters that need escaping in MarkdownV2
  const specialChars = [
    "_",
    "[",
    "]",
    "(",
    ")",
    "~",
    "`",
    ">",
    "#",
    "+",
    "-",
    "=",
    "|",
    "{",
    "}",
    ".",
    "!",
    "\\",
  ];

  // Create regex pattern dynamically to avoid escaping issues
  const pattern = new RegExp(
    `([${specialChars.map((c) => `\\${c}`).join("")}])`,
    "g"
  );

  return text.replace(pattern, "\\$1");
}
