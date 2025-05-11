import { initWormhole } from "./init";
import { parseUnits } from "ethers";
import { tokenConfigMap } from "./tokenConfigMap";
import type { TokenId } from "@wormhole-foundation/sdk";
import { tokenId } from "./utils";

/**
 * Converts a human-readable amount of a token to its unit representation.
 * @param chainName - The name of the blockchain (e.g., "Solana", "Ethereum").
 * @param tokenSymbol - The symbol of the token (e.g., "native").
 * @param amountInHuman - The amount in human-readable format (e.g., "1.0").
 * @returns The amount in units as a BigNumber.
 */
export async function convertAmount(
  chainName: "Solana" | "Ethereum",
  tokenSymbol: "native", 
  amountInHuman: string
) {
    
  const { wh } = await initWormhole();
  const chain = wh.getChain(chainName);
  
  const tokenMeta = tokenConfigMap[chainName]?.[tokenSymbol];
  if (!tokenMeta) throw new Error(`No config for ${tokenSymbol} on ${chainName}`);

  const token: TokenId = tokenId(chain.chain, tokenMeta.address);
  const amountInUnits = parseUnits(amountInHuman, tokenMeta.decimals);

  console.log(
    `💰 ${amountInHuman} ${tokenSymbol} on ${chainName} = ${amountInUnits.toString()} units`
  );

  return amountInUnits;
}
