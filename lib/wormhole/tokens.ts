import { initWormhole } from "./init";
import type { TokenId } from "@wormhole-foundation/sdk";

function tokenId<T extends string>(chain: T, address: string): TokenId {
  return { chain, address } as TokenId;
}

async function getTokenId(chainName: "Solana" | "Ethereum", tokenSymbol: string) {
  const { wh } = await initWormhole();
  const chain = wh.getChain(chainName);

  const token = tokenId(chain.chain, tokenSymbol);
  console.log("Cross-chain token address:", token.address);
}


