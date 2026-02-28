import { FatalError } from "workflow";

/**
 * Resolve the app's base URL for internal fetch() calls from workflow steps.
 * Workflow steps can't use Prisma directly (Node.js modules unavailable),
 * so DB operations go through internal API endpoints.
 */
function getBaseUrl(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 3000}`;
}

// Step 1: Call OpenRouter to generate SVG
async function callOpenRouter(
  styleName: string,
  systemPrompt: string,
  svgExamples: string[],
  brandName: string | null,
  brandVoice: string | null
) {
  "use step";

  const OpenAI = (await import("openai")).default;
  const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://pimpmysvg.xyz",
      "X-Title": "Pimp My SVG",
    },
  });

  // Build system prompt:
  // 1. Universal SVG constraints + single-SVG explanation
  // 2. Request parameters header
  // 3. Style-specific guide
  // 4. Few-shot examples
  const parts: string[] = [];

  parts.push(`You are an expert SVG icon designer. Your task is to generate a single, clean, valid, production-ready SVG icon.

OUTPUT RULES:
- Respond ONLY with a JSON object containing an "svg" key whose value is the complete SVG markup.
- The SVG must be valid, well-formed, self-contained XML that renders in any modern browser.
- No external fonts, no external images, no embedded JavaScript.
- Always include xmlns="http://www.w3.org/2000/svg" and a viewBox attribute.
- Place gradients, clipPaths, and filters inside a <defs> section.
- Keep the design simple and geometric — the logo must be legible at 16px (favicon size).
- Do NOT include any text outside the JSON object. No markdown, no explanation.

WHY A SINGLE SVG: This API generates one logo per request. The customer pays per generation and expects exactly one cohesive SVG icon that captures their brand. Multiple SVGs would break the rendering pipeline and billing. Always produce exactly one <svg>...</svg> element inside the JSON.`);

  parts.push(`--- REQUEST PARAMETERS ---
Style: ${styleName}
Brand name: ${brandName || "(not specified)"}
Brand voice: ${brandVoice || "(not specified)"}
--- END PARAMETERS ---`);

  parts.push(`--- STYLE GUIDE ---
${systemPrompt}
--- END STYLE GUIDE ---`);

  if (svgExamples.length > 0) {
    parts.push(`--- REFERENCE EXAMPLES ---
The following are example SVGs in the "${styleName}" style. Use them as visual references for the aesthetic, but create an original design for the brand.

${svgExamples.map((ex: string, i: number) => `Example ${i + 1}:\n${ex}`).join("\n\n")}
--- END EXAMPLES ---`);
  }

  const fullSystemPrompt = parts.join("\n\n");

  const userLines: string[] = [
    `Generate a single SVG icon for: ${brandName || "a generic icon"}`,
  ];
  if (brandVoice) {
    userLines.push(`Brand voice/personality: ${brandVoice}`);
  }
  userLines.push(
    `\nRemember: respond with ONLY a JSON object like {"svg": "<svg ...>...</svg>"}`
  );
  const userPrompt = userLines.join("\n");

  const model =
    process.env.OPENROUTER_MODEL || "google/gemini-3.1-flash-image-preview";

  const response = await openrouter.chat.completions.create({
    model,
    messages: [
      { role: "system", content: fullSystemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: {
      type: "json_schema" as const,
      json_schema: {
        name: "svg_output",
        strict: true,
        schema: {
          type: "object",
          properties: {
            svg: {
              type: "string",
              description:
                "Complete SVG markup starting with <svg and ending with </svg>",
            },
          },
          required: ["svg"],
          additionalProperties: false,
        },
      },
    },
    max_tokens: 8192,
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenRouter API");
  }

  // Try JSON parse (structured output path)
  try {
    const result = JSON.parse(content);
    if (
      result.svg &&
      typeof result.svg === "string" &&
      result.svg.includes("<svg")
    ) {
      return result.svg as string;
    }
  } catch {
    // Fall through to regex
  }

  // Fallback: extract SVG from raw output
  const match = content.match(/<svg[\s\S]*?<\/svg>/);
  if (match) {
    return match[0];
  }

  throw new FatalError("Failed to extract valid SVG from model response");
}

// Step 2: Store the generated asset via internal API endpoint
// (Prisma uses Node.js modules which aren't available in workflow steps)
async function storeAsset(
  jobId: string,
  styleId: string,
  svg: string,
  brandName: string | null,
  brandVoice: string | null
) {
  "use step";

  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/internal/store-asset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobId, styleId, svg, brandName, brandVoice }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to store asset: ${res.status} ${err}`);
  }

  const data = await res.json();
  return { token: data.token as string };
}

// Step 3: Mark job as failed via internal API
async function markJobFailed(jobId: string, errorMessage: string) {
  "use step";

  const baseUrl = getBaseUrl();
  await fetch(`${baseUrl}/api/internal/fail-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobId, error: errorMessage }),
  }).catch(() => {}); // Best-effort
}

// Main workflow
export async function generateSvgWorkflow(
  jobId: string,
  styleId: string,
  styleName: string,
  systemPrompt: string,
  svgExamples: string[],
  brandName: string | null,
  brandVoice: string | null
) {
  "use workflow";

  try {
    const svg = await callOpenRouter(
      styleName,
      systemPrompt,
      svgExamples,
      brandName,
      brandVoice
    );

    const { token } = await storeAsset(
      jobId,
      styleId,
      svg,
      brandName,
      brandVoice
    );

    return { token, svg };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    await markJobFailed(jobId, msg);
    throw error;
  }
}
