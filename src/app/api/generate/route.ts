import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSvg } from "@/lib/generate-svg";
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

    // Load style with systemPrompt and svgExamples for generation
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
        status: "processing",
      },
    });

    try {
      // Generate SVG via OpenRouter
      const svg = await generateSvg({
        systemPrompt: style.systemPrompt,
        svgExamples: Array.isArray(style.svgExamples)
          ? (style.svgExamples as string[])
          : [],
        brandName,
        brandVoice,
      });

      const asset = await prisma.asset.create({
        data: {
          asset: svg,
          styleId: style.id,
          brandName: brandName ?? null,
          brandVoice: brandVoice ?? null,
          jobId: job.id,
        },
      });

      // Mark job as completed
      await prisma.generationJob.update({
        where: { id: job.id },
        data: { status: "completed" },
      });

      return NextResponse.json({
        token: asset.token,
        svg: asset.asset,
        style: style.name,
      });
    } catch (genError) {
      // Mark job as failed
      await prisma.generationJob.update({
        where: { id: job.id },
        data: {
          status: "failed",
          error:
            genError instanceof Error ? genError.message : "Unknown error",
          retryCount: { increment: 1 },
        },
      });
      throw genError;
    }
  } catch (error) {
    console.error("Error generating asset:", error);
    return NextResponse.json(
      { error: "Failed to generate asset" },
      { status: 500 }
    );
  }
}
