import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Internal endpoint for workflow steps to store generated assets.
 * Workflow steps can't use Prisma directly (Node.js modules not available),
 * so they call this endpoint via fetch() instead.
 */
export async function POST(request: NextRequest) {
  try {
    const {
      jobId,
      styleId,
      svg,
      pngAsset,
      vectorizeResponse,
      brandName,
      brandVoice,
    } = await request.json();

    if (!jobId || !styleId || !svg) {
      return NextResponse.json(
        { error: "Missing required fields: jobId, styleId, svg" },
        { status: 400 }
      );
    }

    const asset = await prisma.asset.create({
      data: {
        asset: svg,
        pngAsset: pngAsset ?? null,
        vectorizeResponse: vectorizeResponse ?? undefined,
        styleId,
        brandName: brandName ?? null,
        brandVoice: brandVoice ?? null,
        jobId,
      },
    });

    await prisma.generationJob.update({
      where: { id: jobId },
      data: { status: "completed" },
    });

    return NextResponse.json({ token: asset.token });
  } catch (error) {
    console.error("Error storing asset:", error);
    return NextResponse.json(
      { error: "Failed to store asset" },
      { status: 500 }
    );
  }
}
