import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSvgForJob } from "@/lib/generate-svg";
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

    const style = await prisma.style.findUnique({
      where: { name: styleName },
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

    // Fire-and-forget: kick off SVG generation in the background
    generateSvgForJob(job.id).catch((err) => {
      console.error(`Background SVG generation failed for job ${job.id}:`, err);
    });

    // Return immediately with the job ID for polling
    return NextResponse.json({
      jobId: job.id,
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
