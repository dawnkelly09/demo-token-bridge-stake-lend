import { initWormhole } from "./init";
import { convertAmount } from "./tokens";
import { tokenId } from "./utils"; 
import { getSolanaSigner } from "./solanaSigner";
import { getEvmSigner } from "./evmSigner";
import { EvmAddress } from "@wormhole-foundation/sdk-evm";
import { SolanaAddress } from "@wormhole-foundation/sdk-solana";
import { toNative } from "@wormhole-foundation/sdk";
import { PublicKey } from "@solana/web3.js";

export async function initiateTransfer(amountInHuman: string = "0.1") {
    console.log("🚀 Starting cross-chain transfer...");
    // Initialize the Wormhole SDK
    const { solanaChain, ethereumChain } = await initWormhole();
    // Get the signers for Solana and Ethereum
    const solanaSigner = await getSolanaSigner(solanaChain);
    const ethereumSigner = await getEvmSigner(ethereumChain);

    console.log("🔹 Solana signer address:", solanaSigner.address());
    console.log("🔹 Ethereum signer address:", await ethereumSigner.getAddress());

    // Define the token to transfer (native SOL)
    const solanaToken = tokenId(solanaChain.chain, "So11111111111111111111111111111111111111112");
    // Convert the human-readable amount to base units using the SDK
    const amount = await convertAmount("Solana", "native", amountInHuman);

    // Create the transfer transactions using the Solana token bridge
    const tokenBridge = await solanaChain.getProtocol("TokenBridge");
    const transferTxs = await tokenBridge.transfer(
        toNative("Solana", solanaSigner.address()),
        {
            chain: "Ethereum",
            address: new EvmAddress(await ethereumSigner.getAddress())
        },

        new SolanaAddress(solanaToken.address.toString()),
        amount,
    );

    // Save the transfer details (needed for VAA fetching)
    const transferDetails = transferTxs;
    // Collect and send transactions
    console.log("🔄 Initiating transfer...");
    const txs = [];
    for await (const tx of transferDetails) {
        txs.push(tx);
    }
    // Send the transfer transactions
    const txids: string[] = await solanaSigner.signAndSend(txs);
    console.log("✅ Transfer initiated. Transaction IDs:", txids);
    return transferDetails;
}