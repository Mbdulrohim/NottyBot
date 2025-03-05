import { Metaplex } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import dotenv from 'dotenv'
dotenv.config()
const connection = new Connection(process.env.HTTP!);


export const getMetadata = async (
  tokenAddress: string
): Promise<{ name: string; symbol: string; totalSupply: string, decimal: number } | null> => {
  try {
    const mintAddress = new PublicKey(tokenAddress);
    const metaplex = Metaplex.make(connection);

    const nft = await metaplex.nfts().findByMint({ mintAddress });
    const mintAccount = await getMint(connection, mintAddress);

    if (!nft) {
      throw new Error("NFT not found.");
    }

    const name = nft.name ?? nft.json?.name ?? "Unknown";
    const symbol = nft.symbol ?? nft.json?.symbol ?? "Unknown";
    const totalSupply = nft.mint?.supply?.basisPoints
      ? nft.mint.supply.basisPoints.toString()
      : "Unknown";
    const decimal = mintAccount.decimals

    return { name, symbol, totalSupply, decimal };
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    return null; // Return `null` to indicate failure
  }
};
