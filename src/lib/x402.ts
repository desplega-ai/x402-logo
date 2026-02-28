import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { facilitator } from "@coinbase/x402";

// Use @coinbase/x402 SDK facilitator (supports Base mainnet via CDP).
// Falls back to explicit URL if X402_FACILITATOR_URL is set (e.g. for testnet).
const facilitatorConfig = process.env.X402_FACILITATOR_URL
  ? { url: process.env.X402_FACILITATOR_URL }
  : facilitator;

const facilitatorClient = new HTTPFacilitatorClient(facilitatorConfig);

export const x402Server = new x402ResourceServer(facilitatorClient);
x402Server.register("eip155:*", new ExactEvmScheme());

export const evmAddress = process.env.X402_WALLET_ADDRESS as `0x${string}`;
export const x402Network = (process.env.X402_NETWORK ||
  "eip155:8453") as `${string}:${string}`;
