import { NextResponse } from "next/server";

const spec = {
  openapi: "3.0.0",
  info: {
    title: "OMGHOST API",
    version: "1.0.0",
    description:
      "AI-powered SVG icon generation service. Pay per generation via the x402 protocol.",
  },
  paths: {
    "/api/generate": {
      post: {
        summary: "Generate a custom SVG icon in your chosen style",
        "x-agentcash-auth": {
          mode: "paid",
        },
        "x-payment-info": {
          protocols: ["x402"],
          pricingMode: "fixed",
          price: "0.10",
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["styleName"],
                properties: {
                  styleName: {
                    type: "string",
                    description: "Name of the icon style to use",
                  },
                  brandName: {
                    type: "string",
                    description: "Brand name to incorporate",
                    maxLength: 100,
                  },
                  brandVoice: {
                    type: "string",
                    description: "Brand voice/style description",
                    maxLength: 500,
                  },
                },
              },
            },
          },
        },
        responses: {
          "402": {
            description: "Payment Required",
          },
          "200": {
            description: "Generation job created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    jobId: {
                      type: "string",
                      description: "Generation job ID for polling status",
                    },
                    runId: {
                      type: "string",
                      description: "Workflow run ID",
                    },
                    status: {
                      type: "string",
                      enum: ["pending"],
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid request parameters",
          },
          "404": {
            description: "Style not found",
          },
        },
      },
    },
  },
};

export function GET() {
  return NextResponse.json(spec);
}
