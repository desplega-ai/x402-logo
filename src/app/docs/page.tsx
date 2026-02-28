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
      <CodeBlock>{`https://omghost.xyz`}</CodeBlock>

      <h3>How It Works</h3>
      <ol>
        <li>
          <strong>Browse styles</strong> — Call{" "}
          <code>GET /api/styles</code> to see the available ghost styles.
        </li>
        <li>
          <strong>Generate an icon</strong> — Call{" "}
          <code>POST /api/generate</code> with your chosen style (and optional
          brand context). You get back a <code>jobId</code>.
        </li>
        <li>
          <strong>Poll for completion</strong> — Call{" "}
          <code>GET /api/generate/[jobId]/status</code> until the status is{" "}
          <code>&quot;completed&quot;</code>. The response includes an access{" "}
          <code>token</code> and the generated <code>svg</code>.
        </li>
        <li>
          <strong>Retrieve later</strong> — Use{" "}
          <code>GET /api/asset/[token]</code> to fetch the SVG again at any
          time.
        </li>
        <li>
          <strong>Rate the result</strong> — Optionally call{" "}
          <code>POST /api/rate</code> to leave feedback.
        </li>
      </ol>

      <h3>Pricing</h3>
      <p>
        <strong>$0.10 per image (SVG &amp; PNG).</strong> Payment is handled via the x402
        micropayment protocol — your HTTP client pays automatically per request.
        No API keys, no subscriptions.
      </p>

      <h3>Quick Example</h3>
      <CodeBlock title="Generate a ghost icon (full flow)">{`# 1. Generate
RESPONSE=$(curl -s -X POST https://omghost.xyz/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{"styleName": "classic", "brandName": "Acme Corp"}')

JOB_ID=$(echo $RESPONSE | jq -r '.jobId')
echo "Job started: $JOB_ID"

# 2. Poll until complete
while true; do
  STATUS=$(curl -s "https://omghost.xyz/api/generate/$JOB_ID/status")
  STATE=$(echo $STATUS | jq -r '.status')

  if [ "$STATE" = "completed" ]; then
    TOKEN=$(echo $STATUS | jq -r '.token')
    SVG=$(echo $STATUS | jq -r '.svg')
    echo "Done! Token: $TOKEN"
    echo "$SVG" > ghost.svg
    break
  elif [ "$STATE" = "failed" ]; then
    echo "Failed: $(echo $STATUS | jq -r '.error')"
    exit 1
  fi

  sleep 2
done

# 3. Retrieve the asset later
curl -s "https://omghost.xyz/api/asset/$TOKEN" | jq .`}</CodeBlock>
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

      <p>Returns all available ghost icon styles with their descriptions.</p>

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
    // ... more styles
  ]
}`}</CodeBlock>

      <h3>Style Fields</h3>
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
            <td><code>name</code></td>
            <td>string</td>
            <td>Unique style identifier. Pass this to <code>/api/generate</code>.</td>
          </tr>
          <tr>
            <td><code>shortDescription</code></td>
            <td>string</td>
            <td>Human-readable description of the style.</td>
          </tr>
        </tbody>
      </table>

      <h3>Example</h3>
      <CodeBlock title="cURL">{`curl -s https://omghost.xyz/api/styles | jq .`}</CodeBlock>
      <CodeBlock title="JavaScript (fetch)">{`const res = await fetch("https://omghost.xyz/api/styles");
const { styles } = await res.json();
console.log(styles);`}</CodeBlock>
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
        <code>jobId</code> that you poll for completion. This endpoint requires
        x402 micropayment (<strong>$0.10</strong> per request).
      </p>

      <h3>Authentication (x402)</h3>
      <p>
        This endpoint is gated by the{" "}
        <a href="https://x402.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
          x402 micropayment protocol
        </a>
        . When you call it without payment, you&apos;ll receive an HTTP{" "}
        <code>402 Payment Required</code> response containing payment
        instructions. Your x402-compatible client handles payment automatically.
      </p>
      <CodeBlock title="402 Payment Required (initial response)">{`{
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

      <h3>Request Body</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>styleName</code></td>
            <td>string</td>
            <td>Yes</td>
            <td>
              Name of the ghost style to use. Must match a style from{" "}
              <code>/api/styles</code>.
            </td>
          </tr>
          <tr>
            <td><code>brandName</code></td>
            <td>string</td>
            <td>No</td>
            <td>Your brand or project name (max 100 chars). Influences the icon design.</td>
          </tr>
          <tr>
            <td><code>brandVoice</code></td>
            <td>string</td>
            <td>No</td>
            <td>
              Description of your brand voice/personality (max 500 chars). E.g.,
              &quot;playful and modern&quot; or &quot;corporate and serious&quot;.
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

      <h3>Error Responses</h3>
      <CodeBlock title="400 Bad Request — Invalid parameters">{`{
  "error": "Invalid request",
  "details": [
    {
      "message": "Style name is required",
      "path": ["styleName"]
    }
  ]
}`}</CodeBlock>
      <CodeBlock title="404 Not Found — Unknown style">{`{
  "error": "Style \\"nonexistent\\" not found"
}`}</CodeBlock>

      <h3>Examples</h3>
      <CodeBlock title="cURL — minimal">{`curl -X POST https://omghost.xyz/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{"styleName": "classic"}'`}</CodeBlock>
      <CodeBlock title="cURL — with brand context">{`curl -X POST https://omghost.xyz/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{
    "styleName": "pixel",
    "brandName": "Indie Games Studio",
    "brandVoice": "retro, playful, nostalgic"
  }'`}</CodeBlock>
      <CodeBlock title="JavaScript (fetch)">{`const res = await fetch("https://omghost.xyz/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    styleName: "minimal",
    brandName: "My Startup",
    brandVoice: "clean and professional",
  }),
});

const { jobId } = await res.json();
console.log("Job started:", jobId);`}</CodeBlock>
      <CodeBlock title="Python (requests)">{`import requests

resp = requests.post("https://omghost.xyz/api/generate", json={
    "styleName": "sharp",
    "brandName": "CyberSec Inc",
    "brandVoice": "dark, edgy, technical",
})

job_id = resp.json()["jobId"]
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
        Poll this endpoint to check the progress of a generation job. When the
        status is <code>&quot;completed&quot;</code>, the response includes the
        generated SVG and an access token.
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
            <td>The job ID returned from <code>POST /api/generate</code>.</td>
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

      <h3>Status Values</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>pending</code></td>
            <td>Job created, waiting to be processed.</td>
          </tr>
          <tr>
            <td><code>processing</code></td>
            <td>AI is generating the SVG. Typically takes 5–15 seconds.</td>
          </tr>
          <tr>
            <td><code>completed</code></td>
            <td>SVG ready. Response includes <code>token</code>, <code>svg</code>, and <code>style</code>.</td>
          </tr>
          <tr>
            <td><code>failed</code></td>
            <td>Generation failed. Check the <code>error</code> field.</td>
          </tr>
        </tbody>
      </table>

      <h3>Polling Example</h3>
      <CodeBlock title="JavaScript — poll until done">{`async function waitForIcon(jobId) {
  while (true) {
    const res = await fetch(
      \`https://omghost.xyz/api/generate/\${jobId}/status\`
    );
    const data = await res.json();

    if (data.status === "completed") {
      return { token: data.token, svg: data.svg };
    }

    if (data.status === "failed") {
      throw new Error(data.error || "Generation failed");
    }

    // Wait 2 seconds before polling again
    await new Promise((r) => setTimeout(r, 2000));
  }
}`}</CodeBlock>
      <CodeBlock title="Python — poll until done">{`import time
import requests

def wait_for_icon(job_id):
    while True:
        resp = requests.get(
            f"https://omghost.xyz/api/generate/{job_id}/status"
        )
        data = resp.json()

        if data["status"] == "completed":
            return data["token"], data["svg"]

        if data["status"] == "failed":
            raise Exception(data.get("error", "Generation failed"))

        time.sleep(2)`}</CodeBlock>

      <h3>Error Responses</h3>
      <CodeBlock title="404 Not Found">{`{
  "error": "Job not found"
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
        are returned in the job status response when generation completes.
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
            <td>The unique access token for the asset.</td>
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
  "createdAt": "2025-12-01T10:30:00.000Z"
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
            <td>string</td>
            <td>The asset&apos;s unique token.</td>
          </tr>
          <tr>
            <td><code>svg</code></td>
            <td>string</td>
            <td>The complete SVG markup.</td>
          </tr>
          <tr>
            <td><code>style</code></td>
            <td>string</td>
            <td>Name of the style used to generate this icon.</td>
          </tr>
          <tr>
            <td><code>brandName</code></td>
            <td>string | null</td>
            <td>Brand name provided during generation (if any).</td>
          </tr>
          <tr>
            <td><code>brandVoice</code></td>
            <td>string | null</td>
            <td>Brand voice provided during generation (if any).</td>
          </tr>
          <tr>
            <td><code>createdAt</code></td>
            <td>string (ISO 8601)</td>
            <td>When the asset was created.</td>
          </tr>
        </tbody>
      </table>

      <h3>Example</h3>
      <CodeBlock title="cURL">{`curl -s https://omghost.xyz/api/asset/a1b2c3d4-e5f6-7890-abcd-ef1234567890 | jq .`}</CodeBlock>

      <h3>Error Responses</h3>
      <CodeBlock title="404 Not Found">{`{
  "error": "Asset not found"
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
        Ratings help improve style quality over time.
      </p>

      <h3>Request Body</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>token</code></td>
            <td>string (UUID)</td>
            <td>Yes</td>
            <td>The token of the asset to rate.</td>
          </tr>
          <tr>
            <td><code>rating</code></td>
            <td>integer (1–5)</td>
            <td>Yes</td>
            <td>Rating score. 1 = poor, 5 = excellent.</td>
          </tr>
          <tr>
            <td><code>styleName</code></td>
            <td>string</td>
            <td>Yes</td>
            <td>Name of the style used (for aggregation).</td>
          </tr>
          <tr>
            <td><code>text</code></td>
            <td>string</td>
            <td>No</td>
            <td>Optional written feedback (max 1000 chars).</td>
          </tr>
        </tbody>
      </table>

      <h3>Response</h3>
      <CodeBlock title="200 OK">{`{
  "success": true,
  "averageRating": 4.2
}`}</CodeBlock>

      <h3>Error Responses</h3>
      <CodeBlock title="400 Bad Request">{`{
  "error": "Invalid request",
  "details": [
    {
      "message": "A valid token is required",
      "path": ["token"]
    }
  ]
}`}</CodeBlock>
      <CodeBlock title="404 Not Found">{`{
  "error": "Style \\"nonexistent\\" not found"
}`}</CodeBlock>
      <CodeBlock title="409 Conflict — Already rated">{`{
  "error": "This token has already been rated"
}`}</CodeBlock>

      <h3>Example</h3>
      <CodeBlock title="cURL">{`curl -X POST https://omghost.xyz/api/rate \\
  -H "Content-Type: application/json" \\
  -d '{
    "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "rating": 5,
    "styleName": "classic",
    "text": "Love it!"
  }'`}</CodeBlock>
      <CodeBlock title="JavaScript (fetch)">{`const res = await fetch("https://omghost.xyz/api/rate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    token: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    rating: 5,
    styleName: "classic",
    text: "Perfect for my project!",
  }),
});

const { success, averageRating } = await res.json();`}</CodeBlock>
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
