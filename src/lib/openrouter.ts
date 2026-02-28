import OpenAI from "openai";

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}

const globalForOpenRouter = globalThis as unknown as { openrouter: OpenAI };

export const openrouter =
  globalForOpenRouter.openrouter ||
  new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://pimpmysvg.xyz",
      "X-Title": "Pimp My SVG",
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForOpenRouter.openrouter = openrouter;
}

export const DEFAULT_MODEL =
  process.env.OPENROUTER_MODEL || "google/gemini-3.1-flash-image-preview";
