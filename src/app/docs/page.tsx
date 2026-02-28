"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "overview" | "styles" | "generate" | "status" | "asset" | "rate";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "styles", label: "List Styles" },
  { id: "generate", label: "Generate" },
  { id: "status", label: "Job Status" },
  { id: "asset", label: "Get Asset" },
  { id: "rate", label: "Rate" },
];

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "https://omghost.xyz";

function CodeBlock({ children, title }: { children: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      {title && <div className="code-block-title">{title}</div>}
      <div className="code-block-content">
        <button className="code-copy-btn" onClick={copy}>
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="doc-section">
      <h2>Overview</h2>
      <p>
        Oh My Ghost is an API-first SVG icon generation service. Send a style
        name and optional brand context, and receive a unique, AI-generated SVG
        ghost icon in seconds.
      </p>

      <h3>Base URL</h3>
      <CodeBlock>{BASE_URL}</CodeBlock>
      <p className="muted">
        All API endpoints below are relative to this base URL. Example:{" "}
        <code>{BASE_URL}/api/styles</code>
      </p>

      <h3>Content Type</h3>
      <p>
        All <code>POST</code> requests must include{" "}
        <code>Content-Type: application/json</code>. All responses are JSON.
      </p>

      <h3>How It Works</h3>
      <ol>
        <li>
          <strong>Browse styles</strong> — <code>GET /api/styles</code> returns
          all available ghost styles.
        </li>
        <li>
          <strong>Generate an icon</strong> —{" "}
          <code>POST /api/generate</code> starts an async job. Requires{" "}
          <a href="https://x402.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
            x402
          </a>{" "}
          payment ($0.10). Returns a <code>jobId</code>.
        </li>
        <li>
          <strong>Poll for completion</strong> —{" "}
          <code>GET /api/generate/[jobId]/status</code> until status is{" "}
          <code>&quot;completed&quot;</code>. Response includes the{" "}
          <code>svg</code> and a permanent access <code>token</code>.
        </li>
        <li>
          <strong>Retrieve later</strong> —{" "}
          <code>GET /api/asset/[token]</code> fetches the SVG at any time.
        </li>
        <li>
          <strong>Rate the result</strong> — Optionally{" "}
          <code>POST /api/rate</code> to submit feedback.
        </li>
      </ol>

      <h3>Pricing</h3>
      <p>
        <strong>$0.10 per image</strong> (SVG &amp; PNG). Payment is handled via
        the x402 micropayment protocol — no API keys, no accounts, no
        subscriptions. Only <code>POST /api/generate</code> requires payment.
        All other endpoints are free.
      </p>

      <h3>x402 Payment Protocol</h3>
      <p>
        The <code>/api/generate</code> endpoint uses the{" "}
        <a href="https://x402.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
          x402 micropayment protocol
        </a>{" "}
        for payment. Here&apos;s how it works:
      </p>
      <ol>
        <li>
          <strong>Call the endpoint</strong> — Send your <code>POST</code>{" "}
          request normally with your JSON body.
        </li>
        <li>
          <strong>Receive a 402</strong> — The server responds with HTTP{" "}
          <code>402 Payment Required</code> and a JSON body describing accepted
          payment methods (network, price, recipient address).
        </li>
        <li>
          <strong>Make the payment</strong> — Transfer the exact amount on the
          specified EVM network to the <code>payTo</code> address.
        </li>
        <li>
          <strong>Retry with proof</strong> — Re-send the same request with an{" "}
          <code>X-PAYMENT</code> header containing the base64-encoded payment
          receipt.
        </li>
        <li>
          <strong>Receive the response</strong> — The server verifies payment
          via the x402 facilitator and processes your request.
        </li>
      </ol>

      <CodeBlock title="402 response body">{`{
  "accepts": [
    {
      "scheme": "exact",
      "price": "$0.10",
      "network": "eip155:84532",
      "payTo": "0x..."
    }
  ],
  "description": "Generate a custom SVG icon in your chosen style",
  "mimeType": "application/json"
}`}</CodeBlock>

      <h4>Using an x402 client library (recommended)</h4>
      <p>
        The easiest approach is to use an x402 client library that handles the
        402 → payment → retry flow automatically:
      </p>
      <CodeBlock title="JavaScript (@x402/client)">{`import { withX402Payment } from "@x402/client";

// Wrap fetch with x402 payment handling
const x402Fetch = withX402Payment(fetch, { wallet });

// Use it exactly like regular fetch — payment happens automatically
const res = await x402Fetch("${BASE_URL}/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ styleName: "classic" }),
});

const { jobId } = await res.json();`}</CodeBlock>

      <h4>Manual x402 flow (for agents without a library)</h4>
      <CodeBlock title="Step-by-step manual flow">{`# 1. Send the request — you'll get a 402
curl -s -w "\\nHTTP_STATUS:%{http_code}" \\
  -X POST ${BASE_URL}/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{"styleName": "classic"}'
# → HTTP 402 with payment instructions in body

# 2. Parse the 402 body to get: scheme, price, network, payTo
# 3. Make an EVM payment for $0.10 to the payTo address on the specified network
# 4. Retry with the X-PAYMENT header containing base64-encoded payment proof:

curl -X POST ${BASE_URL}/api/generate \\
  -H "Content-Type: application/json" \\
  -H "X-PAYMENT: <base64-encoded-payment-receipt>" \\
  -d '{"styleName": "classic"}'
# → HTTP 200 with { jobId, runId, status: "pending" }`}</CodeBlock>

      <h3>Quick Example (full flow)</h3>
      <CodeBlock title="Generate a ghost icon end-to-end">{`# Assumes x402 payment is handled by your client

# 1. List available styles
curl -s ${BASE_URL}/api/styles | jq '.styles[].name'

# 2. Generate an icon
RESPONSE=$(curl -s -X POST ${BASE_URL}/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{"styleName": "classic", "brandName": "Acme Corp"}')
JOB_ID=$(echo $RESPONSE | jq -r '.jobId')

# 3. Poll until complete (typically 5-15 seconds)
while true; do
  STATUS=$(curl -s "${BASE_URL}/api/generate/$JOB_ID/status")
  STATE=$(echo $STATUS | jq -r '.status')

  if [ "$STATE" = "completed" ]; then
    TOKEN=$(echo $STATUS | jq -r '.token')
    echo "$STATUS" | jq -r '.svg' > ghost.svg
    echo "Done! Token: $TOKEN"
    break
  elif [ "$STATE" = "failed" ]; then
    echo "Failed: $(echo $STATUS | jq -r '.error')"
    exit 1
  fi
  sleep 2
done

# 4. Retrieve the asset later by token
curl -s "${BASE_URL}/api/asset/$TOKEN" | jq .

# 5. Rate the result (optional)
curl -s -X POST ${BASE_URL}/api/rate \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"token\\": \\"$TOKEN\\",
    \\"rating\\": 5,
    \\"styleName\\": \\"classic\\"
  }"`}</CodeBlock>
    </div>
  );
}

function StylesSection() {
  return (
    <div className="doc-section">
      <h2>
        List Styles
        <span className="method-badge method-get">GET</span>
      </h2>

      <div className="endpoint-url">
        <code>GET /api/styles</code>
      </div>

      <p>
        Returns all available ghost icon styles with their descriptions. No
        authentication required.
      </p>

      <h3>Parameters</h3>
      <p className="muted">None.</p>

      <h3>Response</h3>
      <CodeBlock title="200 OK">{`{
  "styles": [
    {
      "name": "classic",
      "shortDescription": "The original ghost shape — round top, wavy bottom"
    },
    {
      "name": "pixel",
      "shortDescription": "Retro pixel-art ghost with blocky edges"
    },
    {
      "name": "minimal",
      "shortDescription": "Clean, stripped-down ghost silhouette"
    }
    // ... more styles (11 total)
  ]
}`}</CodeBlock>

      <h3>Response Fields</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>styles</code></td>
            <td>array</td>
            <td>Array of style objects.</td>
          </tr>
          <tr>
            <td><code>styles[].name</code></td>
            <td>string</td>
            <td>Unique style identifier. Pass this to <code>/api/generate</code>.</td>
          </tr>
          <tr>
            <td><code>styles[].shortDescription</code></td>
            <td>string</td>
            <td>Human-readable description of the style.</td>
          </tr>
        </tbody>
      </table>

      <h3>Error Responses</h3>
      <CodeBlock title="500 Internal Server Error">{`{
  "error": "Failed to fetch styles"
}`}</CodeBlock>

      <h3>Examples</h3>
      <CodeBlock title="cURL">{`curl -s ${BASE_URL}/api/styles | jq .`}</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch("${BASE_URL}/api/styles");
const { styles } = await res.json();
// styles = [{ name: "classic", shortDescription: "..." }, ...]`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

resp = requests.get("${BASE_URL}/api/styles")
styles = resp.json()["styles"]
# [{"name": "classic", "shortDescription": "..."}, ...]`}</CodeBlock>
    </div>
  );
}

function GenerateSection() {
  return (
    <div className="doc-section">
      <h2>
        Generate Icon
        <span className="method-badge method-post">POST</span>
      </h2>

      <div className="endpoint-url">
        <code>POST /api/generate</code>
      </div>

      <p>
        Starts an asynchronous SVG generation job. Returns immediately with a{" "}
        <code>jobId</code> that you poll for completion via{" "}
        <code>/api/generate/[jobId]/status</code>.
      </p>
      <p>
        <strong>Requires x402 payment ($0.10).</strong> See the{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); }} style={{ color: "var(--accent)" }}>
          Overview
        </a>{" "}
        tab for full x402 protocol details.
      </p>

      <h3>x402 Payment</h3>
      <p>
        Without a valid <code>X-PAYMENT</code> header, the endpoint returns{" "}
        <code>402 Payment Required</code> with payment instructions:
      </p>
      <CodeBlock title="402 Payment Required">{`{
  "accepts": [
    {
      "scheme": "exact",
      "price": "$0.10",
      "network": "eip155:84532",
      "payTo": "0x..."
    }
  ],
  "description": "Generate a custom SVG icon in your chosen style",
  "mimeType": "application/json"
}`}</CodeBlock>
      <p className="muted">
        The <code>network</code> field identifies the EVM chain (e.g.,{" "}
        <code>eip155:84532</code> = Base Sepolia). The <code>payTo</code>{" "}
        field is the recipient wallet address. Use an x402 client library to
        handle payment automatically, or implement the flow manually (see
        Overview).
      </p>

      <h3>Request Body</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Constraints</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>styleName</code></td>
            <td>string</td>
            <td>Yes</td>
            <td>min 1 char</td>
            <td>
              Name of the ghost style. Must match a{" "}
              <code>name</code> from <code>GET /api/styles</code>.
            </td>
          </tr>
          <tr>
            <td><code>brandName</code></td>
            <td>string</td>
            <td>No</td>
            <td>1–100 chars</td>
            <td>Your brand or project name. Influences the icon design.</td>
          </tr>
          <tr>
            <td><code>brandVoice</code></td>
            <td>string</td>
            <td>No</td>
            <td>max 500 chars</td>
            <td>
              Brand personality description. E.g. &quot;playful and
              modern&quot; or &quot;corporate and serious&quot;.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Response</h3>
      <CodeBlock title="200 OK">{`{
  "jobId": "cm8abc123...",
  "runId": "run_abc123...",
  "status": "pending"
}`}</CodeBlock>

      <h3>Response Fields</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>jobId</code></td>
            <td>string</td>
            <td>Unique job identifier. Use this to poll status.</td>
          </tr>
          <tr>
            <td><code>runId</code></td>
            <td>string</td>
            <td>Internal workflow run ID.</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td>string</td>
            <td>Always <code>&quot;pending&quot;</code> on creation.</td>
          </tr>
        </tbody>
      </table>

      <h3>Error Responses</h3>
      <CodeBlock title="400 Bad Request — validation error">{`{
  "error": "Invalid request",
  "details": [
    {
      "message": "Style name is required",
      "path": ["styleName"]
    }
  ]
}`}</CodeBlock>
      <CodeBlock title="402 Payment Required — no/invalid x402 payment">{`{
  "accepts": [{ "scheme": "exact", "price": "$0.10", ... }],
  "description": "...",
  "mimeType": "application/json"
}`}</CodeBlock>
      <CodeBlock title="404 Not Found — style doesn't exist">{`{
  "error": "Style \\"nonexistent\\" not found"
}`}</CodeBlock>
      <CodeBlock title="500 Internal Server Error">{`{
  "error": "Failed to create generation job"
}`}</CodeBlock>

      <h3>Examples</h3>
      <CodeBlock title="cURL — minimal">{`curl -X POST ${BASE_URL}/api/generate \\
  -H "Content-Type: application/json" \\
  -H "X-PAYMENT: <base64-payment-receipt>" \\
  -d '{"styleName": "classic"}'`}</CodeBlock>
      <CodeBlock title="cURL — with brand context">{`curl -X POST ${BASE_URL}/api/generate \\
  -H "Content-Type: application/json" \\
  -H "X-PAYMENT: <base64-payment-receipt>" \\
  -d '{
    "styleName": "pixel",
    "brandName": "Indie Games Studio",
    "brandVoice": "retro, playful, nostalgic"
  }'`}</CodeBlock>
      <CodeBlock title="JavaScript (with @x402/client)">{`import { withX402Payment } from "@x402/client";

const x402Fetch = withX402Payment(fetch, { wallet });

const res = await x402Fetch("${BASE_URL}/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    styleName: "minimal",
    brandName: "My Startup",
    brandVoice: "clean and professional",
  }),
});

const { jobId, runId, status } = await res.json();
// jobId = "cm8abc123...", status = "pending"`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

# Note: requires x402 payment handling
resp = requests.post("${BASE_URL}/api/generate",
    headers={
        "Content-Type": "application/json",
        "X-PAYMENT": "<base64-payment-receipt>",
    },
    json={
        "styleName": "sharp",
        "brandName": "CyberSec Inc",
        "brandVoice": "dark, edgy, technical",
    },
)

data = resp.json()
job_id = data["jobId"]  # "cm8abc123..."
print(f"Job started: {job_id}")`}</CodeBlock>
    </div>
  );
}

function StatusSection() {
  return (
    <div className="doc-section">
      <h2>
        Job Status
        <span className="method-badge method-get">GET</span>
      </h2>

      <div className="endpoint-url">
        <code>GET /api/generate/[jobId]/status</code>
      </div>

      <p>
        Poll this endpoint to check generation progress. No authentication
        required. When status is <code>&quot;completed&quot;</code>, the
        response includes the SVG and an access token.
      </p>

      <h3>URL Parameters</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>jobId</code></td>
            <td>string</td>
            <td>The <code>jobId</code> returned from <code>POST /api/generate</code>.</td>
          </tr>
        </tbody>
      </table>

      <h3>Response — Pending / Processing</h3>
      <CodeBlock title="200 OK">{`{
  "jobId": "cm8abc123...",
  "status": "processing"
}`}</CodeBlock>

      <h3>Response — Completed</h3>
      <CodeBlock title="200 OK">{`{
  "jobId": "cm8abc123...",
  "status": "completed",
  "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "svg": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 200 200\\">...</svg>",
  "style": "classic"
}`}</CodeBlock>

      <h3>Response — Failed</h3>
      <CodeBlock title="200 OK">{`{
  "jobId": "cm8abc123...",
  "status": "failed",
  "error": "SVG generation failed after retries"
}`}</CodeBlock>

      <h3>Response Fields</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Present When</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>jobId</code></td>
            <td>string</td>
            <td>always</td>
            <td>The job identifier.</td>
          </tr>
          <tr>
            <td><code>status</code></td>
            <td>string</td>
            <td>always</td>
            <td>One of: <code>pending</code>, <code>processing</code>, <code>completed</code>, <code>failed</code>.</td>
          </tr>
          <tr>
            <td><code>token</code></td>
            <td>string (UUID)</td>
            <td>completed</td>
            <td>Permanent access token for <code>/api/asset/[token]</code>.</td>
          </tr>
          <tr>
            <td><code>svg</code></td>
            <td>string</td>
            <td>completed</td>
            <td>The generated SVG markup.</td>
          </tr>
          <tr>
            <td><code>style</code></td>
            <td>string</td>
            <td>completed</td>
            <td>Name of the style used.</td>
          </tr>
          <tr>
            <td><code>error</code></td>
            <td>string</td>
            <td>failed</td>
            <td>Human-readable error message.</td>
          </tr>
        </tbody>
      </table>

      <h3>Status Values</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Description</th>
            <th>Next Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>pending</code></td>
            <td>Job created, waiting to be processed.</td>
            <td>Poll again in 2s.</td>
          </tr>
          <tr>
            <td><code>processing</code></td>
            <td>AI is generating the icon. Typically 5–15 seconds.</td>
            <td>Poll again in 2s.</td>
          </tr>
          <tr>
            <td><code>completed</code></td>
            <td>Done. SVG, token, and style are in the response.</td>
            <td>Extract <code>token</code> and <code>svg</code>.</td>
          </tr>
          <tr>
            <td><code>failed</code></td>
            <td>Generation failed permanently.</td>
            <td>Read <code>error</code>. Retry with a new generate call.</td>
          </tr>
        </tbody>
      </table>

      <h3>Polling Examples</h3>
      <CodeBlock title="JavaScript — poll until done">{`async function waitForIcon(jobId) {
  while (true) {
    const res = await fetch(
      \`${BASE_URL}/api/generate/\${jobId}/status\`
    );
    const data = await res.json();

    if (data.status === "completed") {
      return { token: data.token, svg: data.svg, style: data.style };
    }

    if (data.status === "failed") {
      throw new Error(data.error || "Generation failed");
    }

    // Poll every 2 seconds
    await new Promise((r) => setTimeout(r, 2000));
  }
}`}</CodeBlock>
      <CodeBlock title="Python — poll until done">{`import time
import requests

def wait_for_icon(job_id: str) -> tuple[str, str]:
    """Returns (token, svg) on success, raises on failure."""
    while True:
        resp = requests.get(
            f"${BASE_URL}/api/generate/{job_id}/status"
        )
        data = resp.json()

        if data["status"] == "completed":
            return data["token"], data["svg"]

        if data["status"] == "failed":
            raise Exception(data.get("error", "Generation failed"))

        time.sleep(2)`}</CodeBlock>

      <h3>Error Responses</h3>
      <CodeBlock title="404 Not Found">{`{
  "error": "Generation job not found"
}`}</CodeBlock>
      <CodeBlock title="500 Internal Server Error">{`{
  "error": "Failed to check job status"
}`}</CodeBlock>
    </div>
  );
}

function AssetSection() {
  return (
    <div className="doc-section">
      <h2>
        Get Asset
        <span className="method-badge method-get">GET</span>
      </h2>

      <div className="endpoint-url">
        <code>GET /api/asset/[token]</code>
      </div>

      <p>
        Retrieve a previously generated SVG asset by its unique token. Tokens
        are permanent and returned in the job status response when generation
        completes. No authentication required.
      </p>

      <h3>URL Parameters</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>token</code></td>
            <td>string (UUID)</td>
            <td>The access token from a completed generation job.</td>
          </tr>
        </tbody>
      </table>

      <h3>Response</h3>
      <CodeBlock title="200 OK">{`{
  "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "svg": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 200 200\\">...</svg>",
  "style": "classic",
  "brandName": "Acme Corp",
  "brandVoice": "playful and modern",
  "createdAt": "2026-02-01T10:30:00.000Z"
}`}</CodeBlock>

      <h3>Response Fields</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>token</code></td>
            <td>string (UUID)</td>
            <td>The asset&apos;s unique access token.</td>
          </tr>
          <tr>
            <td><code>svg</code></td>
            <td>string</td>
            <td>Complete SVG markup. Ready to embed or save as <code>.svg</code>.</td>
          </tr>
          <tr>
            <td><code>style</code></td>
            <td>string</td>
            <td>Name of the style used to generate this icon.</td>
          </tr>
          <tr>
            <td><code>brandName</code></td>
            <td>string | null</td>
            <td>Brand name provided during generation, or <code>null</code>.</td>
          </tr>
          <tr>
            <td><code>brandVoice</code></td>
            <td>string | null</td>
            <td>Brand voice provided during generation, or <code>null</code>.</td>
          </tr>
          <tr>
            <td><code>createdAt</code></td>
            <td>string (ISO 8601)</td>
            <td>When the asset was generated.</td>
          </tr>
        </tbody>
      </table>

      <h3>Examples</h3>
      <CodeBlock title="cURL">{`curl -s ${BASE_URL}/api/asset/a1b2c3d4-e5f6-7890-abcd-ef1234567890 | jq .`}</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch(
  "${BASE_URL}/api/asset/a1b2c3d4-e5f6-7890-abcd-ef1234567890"
);
const { token, svg, style, brandName, brandVoice, createdAt } = await res.json();`}</CodeBlock>

      <h3>Error Responses</h3>
      <CodeBlock title="400 Bad Request — missing token">{`{
  "error": "Token is required"
}`}</CodeBlock>
      <CodeBlock title="404 Not Found">{`{
  "error": "Asset not found"
}`}</CodeBlock>
      <CodeBlock title="500 Internal Server Error">{`{
  "error": "Failed to fetch asset"
}`}</CodeBlock>
    </div>
  );
}

function RateSection() {
  return (
    <div className="doc-section">
      <h2>
        Rate Icon
        <span className="method-badge method-post">POST</span>
      </h2>

      <div className="endpoint-url">
        <code>POST /api/rate</code>
      </div>

      <p>
        Submit a rating for a generated icon. Each token can only be rated once.
        No authentication or payment required.
      </p>

      <h3>Request Body</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Constraints</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>token</code></td>
            <td>string</td>
            <td>Yes</td>
            <td>valid UUID</td>
            <td>The asset token to rate.</td>
          </tr>
          <tr>
            <td><code>rating</code></td>
            <td>integer</td>
            <td>Yes</td>
            <td>1–5</td>
            <td>Rating score. 1 = poor, 5 = excellent.</td>
          </tr>
          <tr>
            <td><code>styleName</code></td>
            <td>string</td>
            <td>Yes</td>
            <td>min 1 char</td>
            <td>Name of the style used. Must match a valid style.</td>
          </tr>
          <tr>
            <td><code>text</code></td>
            <td>string</td>
            <td>No</td>
            <td>max 1000 chars</td>
            <td>Optional written feedback.</td>
          </tr>
        </tbody>
      </table>

      <h3>Response</h3>
      <CodeBlock title="200 OK">{`{
  "success": true,
  "averageRating": 4.2
}`}</CodeBlock>

      <h3>Response Fields</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>success</code></td>
            <td>boolean</td>
            <td>Always <code>true</code> on success.</td>
          </tr>
          <tr>
            <td><code>averageRating</code></td>
            <td>number</td>
            <td>Updated average rating for this style (across all ratings).</td>
          </tr>
        </tbody>
      </table>

      <h3>Error Responses</h3>
      <CodeBlock title="400 Bad Request — validation error">{`{
  "error": "Invalid request",
  "details": [
    {
      "message": "A valid token is required",
      "path": ["token"]
    }
  ]
}`}</CodeBlock>
      <CodeBlock title="404 Not Found — style doesn't exist">{`{
  "error": "Style \\"nonexistent\\" not found"
}`}</CodeBlock>
      <CodeBlock title="409 Conflict — already rated">{`{
  "error": "This token has already been rated"
}`}</CodeBlock>
      <CodeBlock title="500 Internal Server Error">{`{
  "error": "Failed to submit rating"
}`}</CodeBlock>

      <h3>Examples</h3>
      <CodeBlock title="cURL">{`curl -X POST ${BASE_URL}/api/rate \\
  -H "Content-Type: application/json" \\
  -d '{
    "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "rating": 5,
    "styleName": "classic",
    "text": "Love it!"
  }'`}</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch("${BASE_URL}/api/rate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    token: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    rating: 5,
    styleName: "classic",
    text: "Perfect for my project!",
  }),
});

const { success, averageRating } = await res.json();
// success = true, averageRating = 4.2`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

resp = requests.post("${BASE_URL}/api/rate", json={
    "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "rating": 5,
    "styleName": "classic",
    "text": "Great quality!",
})

data = resp.json()
# {"success": True, "averageRating": 4.2}`}</CodeBlock>
    </div>
  );
}

const SECTION_MAP: Record<Tab, () => React.JSX.Element> = {
  overview: OverviewSection,
  styles: StylesSection,
  generate: GenerateSection,
  status: StatusSection,
  asset: AssetSection,
  rate: RateSection,
};

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const ActiveSection = SECTION_MAP[activeTab];

  return (
    <div className="docs-page">
      <nav className="docs-nav">
        <Link href="/" className="docs-logo">
          <svg viewBox="0 0 200 220" width="24" height="24" fill="none">
            <path d="M100 20 C55 20 30 55 30 95 L30 185 L50 165 L70 185 L90 165 L110 185 L130 165 L150 185 L170 165 L170 95 C170 55 145 20 100 20Z" fill="currentColor" />
            <ellipse cx="80" cy="95" rx="14" ry="17" fill="#0e0e0e" />
            <ellipse cx="120" cy="95" rx="14" ry="17" fill="#0e0e0e" />
          </svg>
          <span>omghost</span>
        </Link>
        <div className="docs-nav-links">
          <Link href="/">Home</Link>
          <a
            href="https://github.com/desplega-ai/x402-logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <h3>API Reference</h3>
          <ul>
            {TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.id !== "overview" && (
                    <span
                      className={`method-dot ${
                        tab.id === "generate" || tab.id === "rate"
                          ? "dot-post"
                          : "dot-get"
                      }`}
                    />
                  )}
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="docs-content">
          <ActiveSection />
        </main>
      </div>
    </div>
  );
}
