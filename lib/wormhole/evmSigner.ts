import fs from "fs";
import os from "os";
import path from "path";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ethers } from "ethers";
import type { ChainContext } from "@wormhole-foundation/sdk";

/**
 * Retrieves the signer for the Ethereum chain using a keystore file.
 * @param chain - The chain context for the Ethereum network.
 * @returns The signer connected to the Ethereum provider.
 */
export async function getEvmSigner(chain: ChainContext<"Testnet", any>) {

  const keystorePath = path.join(
    os.homedir(),
    ".foundry",
    "keystores",
    "SEPOLIA",
  );

  const keystore = fs.readFileSync(keystorePath, "utf8");

  const rl = readline.createInterface({ input, output });
  const password = await rl.question(`Enter password for SEPOLIA keystore: `);
  rl.close();

  if (!password) throw new Error("Password not provided.");

  // Load the wallet and connect it to the chain’s RPC provider
  const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
  const provider = new ethers.JsonRpcProvider(chain.config.rpc);
  const signer = wallet.connect(provider);

  return signer;
}
