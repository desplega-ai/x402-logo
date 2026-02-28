import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { start } from "workflow/api";
import { generateSvgWorkflow } from "@/workflows/generate-svg";
import { z } from "zod/v4";

const generateSchema = z.object({
  styleName: z.string().min(1, "Style name is required"),
  brandName: z.string().min(1, "Brand name is required").max(100).optional(),
  brandVoice: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = generateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { styleName, brandName, brandVoice } = parsed.data;

    // Fetch style with systemPrompt and svgExamples
    // (style data is passed to the workflow as args since workflow steps
    //  can't use Prisma directly — Node.js modules unavailable in WDK)
    const style = await prisma.style.findUnique({
      where: { name: styleName },
      select: {
        id: true,
        name: true,
        systemPrompt: true,
        svgExamples: true,
      },
    });

    if (!style) {
      return NextResponse.json(
        { error: `Style "${styleName}" not found` },
        { status: 404 }
      );
    }

    // Create a generation job to track the request
    const job = await prisma.generationJob.create({
      data: {
        styleName,
        styleId: style.id,
        brandName: brandName ?? null,
        brandVoice: brandVoice ?? null,
        status: "pending",
      },
    });

    const svgExamples = Array.isArray(style.svgExamples)
      ? (style.svgExamples as string[])
      : [];

    // Start the durable workflow (returns immediately)
    const run = await start(generateSvgWorkflow, [
      job.id,
      style.id,
      style.name,
      style.systemPrompt,
      svgExamples,
      brandName ?? null,
      brandVoice ?? null,
    ]);

    return NextResponse.json({
      jobId: job.id,
      runId: run.runId,
      status: "pending",
    });
  } catch (error) {
    console.error("Error creating generation job:", error);
    return NextResponse.json(
      { error: "Failed to create generation job" },
      { status: 500 }
    );
  }
}
