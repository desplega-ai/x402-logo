import { openrouter, DEFAULT_MODEL } from "./openrouter";
import { prisma } from "./prisma";

/**
 * Build the system prompt for SVG generation.
 *
 * Structure:
 *  1. Universal SVG constraints (output rules, format, quality)
 *  2. Request parameters header (style, brand, voice)
 *  3. Style-specific prompt from the database
 *  4. Few-shot SVG examples (if any)
 *  5. Clear instruction to produce exactly one SVG
 */
function buildSystemPrompt(
  style: { name: string; systemPrompt: string; svgExamples: unknown },
  brandName?: string | null,
  brandVoice?: string | null
): string {
  const examples = Array.isArray(style.svgExamples) ? style.svgExamples : [];

  const parts: string[] = [];

  // 1. Universal SVG generation constraints
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

  // 2. Request parameters header
  parts.push(`--- REQUEST PARAMETERS ---
Style: ${style.name}
Brand name: ${brandName || "(not specified)"}
Brand voice: ${brandVoice || "(not specified)"}
--- END PARAMETERS ---`);

  // 3. Style-specific prompt from DB
  parts.push(`--- STYLE GUIDE ---
${style.systemPrompt}
--- END STYLE GUIDE ---`);

  // 4. Few-shot examples (if available)
  if (examples.length > 0) {
    parts.push(`--- REFERENCE EXAMPLES ---
The following are example SVGs in the "${style.name}" style. Use them as visual references for the aesthetic, but create an original design for the brand.

${examples.map((ex: string, i: number) => `Example ${i + 1}:\n${ex}`).join("\n\n")}
--- END EXAMPLES ---`);
  }

  return parts.join("\n\n");
}

/**
 * Build the user message for the generation request.
 */
function buildUserPrompt(
  brandName?: string | null,
  brandVoice?: string | null
): string {
  const lines: string[] = [];
  lines.push(
    `Generate a single SVG icon for: ${brandName || "a generic icon"}`
  );
  if (brandVoice) {
    lines.push(`Brand voice/personality: ${brandVoice}`);
  }
  lines.push(
    `\nRemember: respond with ONLY a JSON object like {"svg": "<svg ...>...</svg>"}`
  );
  return lines.join("\n");
}

/**
 * Extract SVG from raw response content.
 * Tries JSON parse first (structured output), then falls back to regex extraction.
 */
function extractSvg(raw: string): string {
  // Try JSON parse (structured output path)
  try {
    const parsed = JSON.parse(raw);
    if (parsed.svg && typeof parsed.svg === "string") {
      return parsed.svg;
    }
  } catch {
    // Not valid JSON, try regex
  }

  // Fallback: extract <svg>...</svg> directly
  const match = raw.match(/<svg[\s\S]*?<\/svg>/);
  if (match) {
    return match[0];
  }

  throw new Error("Failed to extract SVG from model response");
}

/**
 * Run SVG generation for a job. Updates the GenerationJob and creates the Asset.
 *
 * This function is meant to be called fire-and-forget from the API route.
 * It manages its own error handling and updates the job status in the DB.
 */
export async function generateSvgForJob(jobId: string): Promise<void> {
  try {
    // Load the job and set status to processing
    const job = await prisma.generationJob.update({
      where: { id: jobId },
      data: { status: "processing" },
      include: {
        style: {
          select: {
            id: true,
            name: true,
            systemPrompt: true,
            svgExamples: true,
          },
        },
      },
    });

    const systemPrompt = buildSystemPrompt(
      job.style,
      job.brandName,
      job.brandVoice
    );
    const userPrompt = buildUserPrompt(job.brandName, job.brandVoice);

    // Call OpenRouter with structured output (JSON schema)
    const response = await openrouter.chat.completions.create({
      model: DEFAULT_MODEL,
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
      max_tokens: 8192,
      temperature: 0.7,
    });

    const rawContent = response.choices[0]?.message?.content;
    if (!rawContent) {
      throw new Error("Empty response from OpenRouter API");
    }

    const svg = extractSvg(rawContent);

    // Basic SVG validation
    if (!svg.includes("<svg") || !svg.includes("</svg>")) {
      throw new Error("Generated content is not valid SVG markup");
    }

    // Create the asset and mark job as completed
    await prisma.asset.create({
      data: {
        asset: svg,
        styleId: job.style.id,
        brandName: job.brandName,
        brandVoice: job.brandVoice,
        jobId: job.id,
      },
    });

    await prisma.generationJob.update({
      where: { id: job.id },
      data: { status: "completed" },
    });
  } catch (error) {
    console.error(`SVG generation failed for job ${jobId}:`, error);

    // Mark job as failed
    await prisma.generationJob
      .update({
        where: { id: jobId },
        data: {
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
          retryCount: { increment: 1 },
        },
      })
      .catch((dbError: unknown) => {
        console.error(
          `Failed to update job ${jobId} status to failed:`,
          dbError
        );
      });
  }
}
