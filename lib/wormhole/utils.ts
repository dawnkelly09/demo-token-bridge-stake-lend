import type { TokenId } from "@wormhole-foundation/sdk";

export function tokenId<T extends string>(chain: T, address: string): TokenId {
  return { chain, address } as TokenId;
}