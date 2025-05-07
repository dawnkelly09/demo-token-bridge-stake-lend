import { wormhole } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';

// Initialize the Wormhole SDK with the desired chains
export async function initWormhole() {
    // Options are "Mainnet" or "Testnet"
    const wh = await wormhole('Testnet', [
        // Add the chains you want to support
        evm,
        solana,
      ]);
    // Initialize the chains you want to support
    const solanaChain = wh.getChain("Solana");
    const ethereumChain = wh.getChain("Ethereum");

    console.log("Solana Chain ID:", solanaChain.config.chainId);
    console.log("Ethereum Chain ID:", ethereumChain.config.chainId);

    return { wh, solanaChain, ethereumChain };
}


