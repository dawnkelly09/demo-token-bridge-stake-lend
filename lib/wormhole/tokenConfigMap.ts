// tokenConfigMap.ts

export const tokenConfigMap = {
    Solana: {
      native: {
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
      },
    },
    Ethereum: {
      native: {
        address: "0x0000000000000000000000000000000000000000", // ETH pseudo-address
        decimals: 18,
      },
    },
  } as const;
  