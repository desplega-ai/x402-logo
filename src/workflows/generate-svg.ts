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

// Step 1: Generate PNG via OpenRouter (Gemini image generation)
async function generatePng(
  styleName: string,
  systemPrompt: string,
  svgExamples: string[],
  brandName: string | null,
  brandVoice: string | null
) {
  "use step";

  // Build system prompt for image generation (adapted from SVG version)
  const parts: string[] = [];

  parts.push(`You are an expert logo and icon designer. Your task is to generate a single, clean, production-ready logo image.

OUTPUT RULES:
- Generate exactly ONE logo/icon image.
- The logo should be simple, geometric, and instantly recognizable.
- It must be legible at small sizes (favicon, 64×64).
- Use bold, clear shapes — avoid excessive detail or photorealism.
- No text in the image unless the brand name is short (≤5 chars) and explicitly requested.
- Transparent or solid background (prefer transparent).

WHY A SINGLE IMAGE: This API generates one logo per request. The customer pays per generation and expects exactly one cohesive icon that captures their brand.`);

  parts.push(`--- REQUEST PARAMETERS ---
Style: ${styleName}
Brand name: ${brandName || "(not specified)"}
Brand voice: ${brandVoice || "(not specified)"}
--- END PARAMETERS ---`);

  parts.push(`--- STYLE GUIDE ---
${systemPrompt}
--- END STYLE GUIDE ---`);

  if (svgExamples.length > 0) {
    parts.push(`--- REFERENCE EXAMPLES (for style reference only) ---
The following are example designs in the "${styleName}" style. Use them as visual references for the aesthetic, but create an original design for the brand.
--- END EXAMPLES ---`);
  }

  const fullSystemPrompt = parts.join("\n\n");

  const userLines: string[] = [
    `Generate a single logo icon image for: ${brandName || "a generic icon"}`,
    `Style: ${styleName}`,
  ];
  if (brandVoice) {
    userLines.push(`Brand voice/personality: ${brandVoice}`);
  }
  userLines.push(
    `\nGenerate the image now. Do not describe it — produce the actual image.`
  );
  const userPrompt = userLines.join("\n");

  const model =
    process.env.OPENROUTER_MODEL || "google/gemini-3.1-flash-image-preview";

  // Use fetch directly to handle OpenRouter's non-standard image response format
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://pimpmysvg.xyz",
      "X-Title": "Pimp My SVG",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: fullSystemPrompt },
        { role: "user", content: userPrompt },
      ],
      modalities: ["image", "text"],
      max_tokens: 8192,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenRouter API error ${response.status}: ${errorText.slice(0, 500)}`
    );
  }

  const data = await response.json();
  const message = data.choices?.[0]?.message;
  if (!message) {
    throw new Error("Empty response from OpenRouter API");
  }

  // OpenRouter returns images in a non-standard `images` array on the message
  // Format: message.images[].image_url.url = "data:image/png;base64,..."
  const images = message.images as
    | Array<{ type?: string; image_url: { url: string } }>
    | undefined;

  if (!images || images.length === 0) {
    throw new FatalError(
      "OpenRouter returned no images. Check that the model supports image generation and modalities is set."
    );
  }

  const dataUri = images[0].image_url.url;
  if (!dataUri || !dataUri.startsWith("data:image/")) {
    throw new FatalError(
      `Unexpected image format from OpenRouter: ${dataUri?.slice(0, 100)}`
    );
  }

  // Extract base64 data from data URI ("data:image/png;base64,...")
  const base64Data = dataUri.split(",")[1];
  if (!base64Data) {
    throw new FatalError("Failed to extract base64 data from image data URI");
  }

  return base64Data;
}

// Step 2: Vectorize PNG to SVG via Runware API
async function vectorizePng(pngBase64: string) {
  "use step";

  const apiKey = process.env.RUNWARE_API_KEY;
  if (!apiKey) {
    throw new FatalError("RUNWARE_API_KEY environment variable is required");
  }

  const taskUUID = crypto.randomUUID();

  const response = await fetch("https://api.runware.ai/v1", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        taskType: "vectorize",
        taskUUID,
        model: "recraft:1@1",
        outputType: "URL",
        outputFormat: "SVG",
        includeCost: true,
        inputs: {
          image: pngBase64,
        },
      },
    ]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Runware API error ${response.status}: ${errorText.slice(0, 500)}`
    );
  }

  const apiResponse = await response.json();
  const resultData = apiResponse.data;

  if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
    throw new Error(
      `Runware API returned empty data: ${JSON.stringify(apiResponse).slice(0, 500)}`
    );
  }

  const imageURL = resultData[0].imageURL;
  if (!imageURL) {
    throw new Error(
      `Runware API response missing imageURL: ${JSON.stringify(resultData[0]).slice(0, 500)}`
    );
  }

  // Download the SVG from the returned URL
  const svgResponse = await fetch(imageURL);
  if (!svgResponse.ok) {
    throw new Error(
      `Failed to download SVG from Runware: ${svgResponse.status}`
    );
  }

  const svg = await svgResponse.text();

  if (!svg.includes("<svg")) {
    throw new FatalError(
      `Downloaded content is not a valid SVG: ${svg.slice(0, 200)}`
    );
  }

  return { svg, vectorizeResponse: apiResponse };
}

// Step 3: Store both PNG and SVG assets via internal API endpoint
// (Prisma uses Node.js modules which aren't available in workflow steps)
async function storeAssets(
  jobId: string,
  styleId: string,
  svg: string,
  pngBase64: string,
  vectorizeResponse: unknown,
  brandName: string | null,
  brandVoice: string | null
) {
  "use step";

  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/internal/store-asset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jobId,
      styleId,
      svg,
      pngAsset: pngBase64,
      vectorizeResponse,
      brandName,
      brandVoice,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to store asset: ${res.status} ${err}`);
  }

  const data = await res.json();
  return { token: data.token as string };
}

// Step 4: Mark job as failed via internal API
async function markJobFailed(jobId: string, errorMessage: string) {
  "use step";

  const baseUrl = getBaseUrl();
  await fetch(`${baseUrl}/api/internal/fail-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobId, error: errorMessage }),
  }).catch(() => {}); // Best-effort
}

// Main workflow: PNG generation → Runware vectorization → store both
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
    // Step 1: Generate PNG via Gemini
    const pngBase64 = await generatePng(
      styleName,
      systemPrompt,
      svgExamples,
      brandName,
      brandVoice
    );

    // Step 2: Vectorize PNG to SVG via Runware
    const { svg, vectorizeResponse } = await vectorizePng(pngBase64);

    // Step 3: Store both PNG and SVG
    const { token } = await storeAssets(
      jobId,
      styleId,
      svg,
      pngBase64,
      vectorizeResponse,
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
