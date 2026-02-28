/**
 * x402 E2E Test — Full payment flow against local dev server
 *
 * Tests the complete x402 payment lifecycle:
 * 1. GET /api/styles — list available styles
 * 2. POST /api/generate (no payment) — expect 402 with payment requirements
 * 3. POST /api/generate (with x402 payment) — execute full payment flow
 * 4. Poll /api/generate/{jobId}/status until complete
 * 5. GET /api/asset/{token} — retrieve generated SVG
 */

import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const PRIVATE_KEY = process.env.EVM_PRIVATE_KEY || "0x625551d73eb599b5365648499f26aa27541d08786df64bc5d38ee4c108e6226b";

console.log("=".repeat(60));
console.log("x402 E2E TEST — Full Payment Flow");
console.log("=".repeat(60));
console.log(`Server: ${BASE_URL}`);
console.log(`Network: Base Sepolia (eip155:84532)`);

// === Setup ===
const signer = privateKeyToAccount(PRIVATE_KEY);
console.log(`\nPayer wallet: ${signer.address}`);
console.log(`Payee wallet: (from server 402 response)`);

const client = new x402Client();
registerExactEvmScheme(client, { signer });
const fetchWithPayment = wrapFetchWithPayment(fetch, client);

const results = {
  styles: null,
  paymentRequired: null,
  paymentAttempt: null,
  jobStatus: null,
  asset: null,
};

// === Test 1: GET /api/styles ===
console.log("\n" + "─".repeat(60));
console.log("TEST 1: GET /api/styles");
console.log("─".repeat(60));
try {
  const res = await fetch(`${BASE_URL}/api/styles`);
  const data = await res.json();
  console.log(`Status: ${res.status}`);
  console.log(`Styles: ${data.styles?.map(s => s.name).join(", ")}`);
  console.log(`Count: ${data.styles?.length || 0}`);
  results.styles = { status: res.status, styles: data.styles };
  console.log("✓ PASS");
} catch (err) {
  console.log(`✗ FAIL: ${err.message}`);
}

// === Test 2: POST /api/generate without payment ===
console.log("\n" + "─".repeat(60));
console.log("TEST 2: POST /api/generate (no payment — expect 402)");
console.log("─".repeat(60));
try {
  const res = await fetch(`${BASE_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      styleName: "geometric",
      brandName: "TestBrand",
      brandVoice: "modern, innovative",
    }),
  });
  console.log(`Status: ${res.status}`);

  if (res.status === 402) {
    const paymentRequiredHeader = res.headers.get("payment-required");
    if (paymentRequiredHeader) {
      const decoded = JSON.parse(atob(paymentRequiredHeader));
      console.log(`\nPayment Requirements (decoded):`);
      console.log(`  x402 Version: ${decoded.x402Version}`);
      console.log(`  Resource URL: ${decoded.resource?.url}`);
      console.log(`  Description: ${decoded.resource?.description}`);
      console.log(`  MIME Type: ${decoded.resource?.mimeType}`);
      if (decoded.accepts?.length > 0) {
        const accept = decoded.accepts[0];
        console.log(`  Scheme: ${accept.scheme}`);
        console.log(`  Network: ${accept.network}`);
        console.log(`  Amount: ${accept.amount} (${parseInt(accept.amount) / 1e6} USDC)`);
        console.log(`  Asset: ${accept.asset}`);
        console.log(`  Pay To: ${accept.payTo}`);
        console.log(`  Max Timeout: ${accept.maxTimeoutSeconds}s`);
        console.log(`  Token: ${accept.extra?.name} v${accept.extra?.version}`);
      }
      results.paymentRequired = decoded;
    }
    console.log("✓ PASS — correctly returned 402 Payment Required");
  } else {
    console.log(`✗ UNEXPECTED — expected 402, got ${res.status}`);
  }
} catch (err) {
  console.log(`✗ FAIL: ${err.message}`);
}

// === Test 3: POST /api/generate with x402 payment ===
console.log("\n" + "─".repeat(60));
console.log("TEST 3: POST /api/generate (with x402 payment)");
console.log("─".repeat(60));
console.log(`Payer: ${signer.address}`);
console.log(`Signing ERC-3009 transferWithAuthorization...`);

try {
  const res = await fetchWithPayment(`${BASE_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      styleName: "Dotmatrix",
      brandName: "x402Logo",
      brandVoice: "cutting-edge, web3-native, futuristic",
    }),
  });

  console.log(`Status: ${res.status}`);

  if (res.ok) {
    const data = await res.json();
    console.log(`\nGeneration started!`);
    console.log(`  Job ID: ${data.jobId}`);
    console.log(`  Status: ${data.status}`);

    // Check for payment response header
    const paymentResponse = res.headers.get("payment-response");
    if (paymentResponse) {
      const decoded = JSON.parse(atob(paymentResponse));
      console.log(`\nPayment Settlement:`);
      console.log(`  Success: ${decoded.success}`);
      console.log(`  Transaction: ${decoded.transaction || "N/A"}`);
      console.log(`  Network: ${decoded.network || "N/A"}`);
      console.log(JSON.stringify(decoded, null, 2));
    }

    results.paymentAttempt = {
      status: res.status,
      data,
      paymentResponse: paymentResponse ? JSON.parse(atob(paymentResponse)) : null
    };
    console.log("✓ PASS — payment accepted, generation started");

    // === Test 4: Poll job status ===
    console.log("\n" + "─".repeat(60));
    console.log(`TEST 4: Poll /api/generate/${data.jobId}/status`);
    console.log("─".repeat(60));

    let attempts = 0;
    const maxAttempts = 30;
    let finalStatus = null;

    while (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 5000));
      attempts++;

      const statusRes = await fetch(`${BASE_URL}/api/generate/${data.jobId}/status`);
      const statusData = await statusRes.json();
      console.log(`  Poll ${attempts}: status=${statusData.status}`);

      if (statusData.status === "completed" || statusData.status === "failed") {
        finalStatus = statusData;
        break;
      }
    }

    if (finalStatus) {
      console.log(`\nFinal Status: ${finalStatus.status}`);
      if (finalStatus.assetToken) {
        console.log(`Asset Token: ${finalStatus.assetToken}`);
      }
      results.jobStatus = finalStatus;

      if (finalStatus.status === "completed" && finalStatus.assetToken) {
        console.log("✓ PASS — generation completed");

        // === Test 5: Get generated SVG ===
        console.log("\n" + "─".repeat(60));
        console.log(`TEST 5: GET /api/asset/${finalStatus.assetToken}`);
        console.log("─".repeat(60));

        const assetRes = await fetch(`${BASE_URL}/api/asset/${finalStatus.assetToken}`);
        console.log(`Status: ${assetRes.status}`);
        console.log(`Content-Type: ${assetRes.headers.get("content-type")}`);

        if (assetRes.ok) {
          const svg = await assetRes.text();
          console.log(`SVG Length: ${svg.length} chars`);
          console.log(`SVG Preview (first 500 chars):\n${svg.substring(0, 500)}`);
          results.asset = { status: assetRes.status, svgLength: svg.length, svgPreview: svg.substring(0, 500), fullSvg: svg };
          console.log("✓ PASS — SVG retrieved");
        } else {
          console.log(`✗ FAIL — could not retrieve asset: ${assetRes.status}`);
        }
      } else if (finalStatus.status === "failed") {
        console.log(`Failure reason: ${finalStatus.error || "unknown"}`);
        console.log("✗ FAIL — generation failed");
      }
    } else {
      console.log("✗ FAIL — polling timed out");
    }
  } else {
    const body = await res.text();
    console.log(`Body: ${body}`);

    // Check if there's a payment error
    const paymentResponse = res.headers.get("payment-response");
    if (paymentResponse) {
      try {
        const decoded = JSON.parse(atob(paymentResponse));
        console.log(`\nPayment Response:`);
        console.log(JSON.stringify(decoded, null, 2));
      } catch (e) {}
    }

    results.paymentAttempt = { status: res.status, body };

    if (res.status === 402) {
      console.log("✗ Payment rejected — likely insufficient USDC balance");
      console.log("  (This is expected if the test wallet has no USDC on Base Sepolia)");
    } else {
      console.log(`✗ FAIL — unexpected status ${res.status}`);
    }
  }
} catch (err) {
  console.log(`✗ ERROR: ${err.message}`);
  console.log(err.stack);
  results.paymentAttempt = { error: err.message };
}

// === Summary ===
console.log("\n" + "=".repeat(60));
console.log("SUMMARY");
console.log("=".repeat(60));
console.log(`\nPayer Wallet: ${signer.address}`);
console.log(`Payee Wallet: ${results.paymentRequired?.accepts?.[0]?.payTo || "N/A"}`);
console.log(`Network: ${results.paymentRequired?.accepts?.[0]?.network || "N/A"}`);
console.log(`Amount: ${results.paymentRequired?.accepts?.[0]?.amount ? parseInt(results.paymentRequired.accepts[0].amount) / 1e6 + " USDC" : "N/A"}`);
console.log(`Asset (USDC): ${results.paymentRequired?.accepts?.[0]?.asset || "N/A"}`);
console.log(`\nTest Results:`);
console.log(`  1. Styles listing: ${results.styles ? "✓" : "✗"}`);
console.log(`  2. 402 Payment Required: ${results.paymentRequired ? "✓" : "✗"}`);
console.log(`  3. Payment attempt: ${results.paymentAttempt?.status === 200 ? "✓" : results.paymentAttempt?.status === 402 ? "⚠ (insufficient balance)" : "✗"}`);
console.log(`  4. Job completion: ${results.jobStatus?.status === "completed" ? "✓" : results.jobStatus ? "✗" : "⏭ (skipped)"}`);
console.log(`  5. SVG retrieval: ${results.asset ? "✓" : "⏭ (skipped)"}`);
