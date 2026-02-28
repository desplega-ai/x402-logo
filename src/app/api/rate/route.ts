import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod/v4";

const rateSchema = z.object({
  generationId: z.string().min(1, "Generation ID is required"),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = rateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { generationId, rating, feedback } = parsed.data;

    // Find the generation
    const generation = await prisma.logoGeneration.findUnique({
      where: { id: generationId },
      include: { style: true },
    });

    if (!generation) {
      return NextResponse.json(
        { error: "Logo generation not found" },
        { status: 404 }
      );
    }

    if (generation.rating !== null) {
      return NextResponse.json(
        { error: "This logo has already been rated" },
        { status: 409 }
      );
    }

    // Calculate 30% refund
    const refundUsd = Number(generation.priceUsd) * 0.3;

    // TODO: Execute x402 refund transaction
    // The refund will be sent back to generation.walletAddress
    const refundTxHash = null; // Will be set when x402 refund is implemented

    // Update the generation with rating and refund info
    const updated = await prisma.logoGeneration.update({
      where: { id: generationId },
      data: {
        rating,
        ratingFeedback: feedback ?? null,
        refundUsd,
        refundTxHash,
      },
    });

    // Update the style's aggregate rating
    const styleStats = await prisma.logoGeneration.aggregate({
      where: {
        styleId: generation.styleId,
        rating: { not: null },
      },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await prisma.style.update({
      where: { id: generation.styleId },
      data: {
        rating: styleStats._avg.rating ?? 0,
        ratingCount: styleStats._count.rating,
      },
    });

    return NextResponse.json({
      id: updated.id,
      rating: updated.rating,
      refundUsd: Number(refundUsd),
      refundTxHash,
      message: `Thank you for rating! ${Number(refundUsd).toFixed(4)} USDC refund ${refundTxHash ? "processed" : "pending"}.`,
    });
  } catch (error) {
    console.error("Error rating logo:", error);
    return NextResponse.json(
      { error: "Failed to rate logo" },
      { status: 500 }
    );
  }
}
