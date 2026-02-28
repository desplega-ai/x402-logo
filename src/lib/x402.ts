import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const facilitatorUrl =
  process.env.X402_FACILITATOR_URL || "https://www.x402.org/facilitator";

const facilitatorClient = new HTTPFacilitatorClient({ url: facilitatorUrl });

export const x402Server = new x402ResourceServer(facilitatorClient);
x402Server.register("eip155:*", new ExactEvmScheme());

export const evmAddress = process.env.X402_WALLET_ADDRESS as `0x${string}`;
export const x402Network = (process.env.X402_NETWORK ||
  "eip155:84532") as `${string}:${string}`;
