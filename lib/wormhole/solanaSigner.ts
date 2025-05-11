import { readFileSync } from "fs";
import path from "path";
import os from "os";
import { Keypair } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { SolanaSendSigner } from "@wormhole-foundation/sdk-solana";
import type { ChainContext } from "@wormhole-foundation/sdk";

export async function getSolanaSigner(
  chain: ChainContext<"Testnet", "Solana", "Solana">
) {
  const keypairPath = path.join(os.homedir(), ".config", "solana", "id.json");
  const secretKey = JSON.parse(readFileSync(keypairPath, "utf8"));
  const keypair = Keypair.fromSecretKey(new Uint8Array(secretKey));

  const connection = new Connection(chain.config.rpc, "confirmed");
  return new SolanaSendSigner(
    connection,             // _rpc
    chain.chain,            // _chain
    keypair,                // _keypair
    false,                  // _debug
    {},                     // _priorityFee
    5,                      // _maxResubmits (optional)
    { preflightCommitment: "confirmed" } // _sendOpts (optional)
  );
}
