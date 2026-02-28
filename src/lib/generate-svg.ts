import { openrouter } from "./openrouter";

const DEFAULT_MODEL = "google/gemini-2.5-pro";

interface GenerateSvgParams {
  systemPrompt: string;
  svgExamples: string[];
  brandName?: string | null;
  brandVoice?: string | null;
}

/**
 * Build the full system prompt from the style's base prompt + universal SVG rules.
 */
function buildSystemPrompt(params: GenerateSvgParams): string {
  const parts: string[] = [
    `You are an expert SVG icon designer. Generate clean, valid, production-ready SVG code.

CRITICAL OUTPUT RULES:
- Respond ONLY with a JSON object: { "svg": "<svg ...>...</svg>" }
- The SVG must be valid, well-formed, self-contained, and render in any browser.
- No external fonts, no external images, no JavaScript.
- Always include xmlns="http://www.w3.org/2000/svg" and a viewBox attribute.
- Store gradients and clipPaths in a <defs> section.
- Keep designs simple and geometric — icons must be legible at 16px (favicon size).
- Output a SINGLE SVG. No markdown, no explanation, just the JSON object.`,
    `\n--- STYLE GUIDE ---\n${params.systemPrompt}`,
  ];

  if (params.svgExamples.length > 0) {
    parts.push(
      `\n--- REFERENCE EXAMPLES ---\nHere are example SVGs in this style:\n${params.svgExamples.join("\n\n")}`
    );
  }

  return parts.join("\n");
}

/**
 * Build the user message from brand parameters.
 */
function buildUserPrompt(params: GenerateSvgParams): string {
  const lines: string[] = [
    `Generate a single SVG icon for: ${params.brandName || "a generic icon"}`,
  ];
  if (params.brandVoice) {
    lines.push(`Brand voice/personality: ${params.brandVoice}`);
  }
  return lines.join("\n");
}

/**
 * Extract SVG from raw model output as a fallback.
 */
function extractSvg(raw: string): string | null {
  const match = raw.match(/<svg[\s\S]*<\/svg>/);
  return match ? match[0] : null;
}

/**
 * Generate an SVG icon using OpenRouter.
 *
 * Uses structured output (JSON schema) to get clean SVG,
 * with regex fallback extraction as defense-in-depth.
 */
export async function generateSvg(params: GenerateSvgParams): Promise<string> {
  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
  const systemPrompt = buildSystemPrompt(params);
  const userPrompt = buildUserPrompt(params);

  const response = await openrouter.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: {
      type: "json_schema",
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
    max_tokens: 4096,
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenRouter API");
  }

  // Try structured JSON parse first
  try {
    const result = JSON.parse(content);
    if (result.svg && result.svg.includes("<svg")) {
      return result.svg;
    }
  } catch {
    // Fall through to regex extraction
  }

  // Fallback: extract SVG from raw output
  const svg = extractSvg(content);
  if (!svg) {
    throw new Error("Failed to extract SVG from model response");
  }
  return svg;
}
