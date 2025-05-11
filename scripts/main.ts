import { initiateTransfer } from "../lib/wormhole/transfers";

async function main() {
  try {
    // Call with a specific amount if desired, e.g., "0.1"
    await initiateTransfer("0.1");
    console.log("✅ Cross-chain transfer complete");
  } catch (err) {
    console.error("❌ Transfer failed:", err);
    process.exit(1);
  }
}

main();
