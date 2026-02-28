import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod/v4";

const rateSchema = z.object({
  token: z.string().uuid("A valid generation token is required"),
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

    const { token, rating, feedback } = parsed.data;

    // Find the generation by token
    const generation = await prisma.logoGeneration.findUnique({
      where: { token },
      include: { style: true },
    });

    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found. Invalid token." },
        { status: 404 }
      );
    }

    // Verify that a payment actually happened
    if (!generation.paymentTxHash) {
      return NextResponse.json(
        { error: "No payment record found for this generation. Review rewards require a verified payment." },
        { status: 402 }
      );
    }

    // Idempotency — rating + reward can only happen once
    if (generation.rating !== null) {
      return NextResponse.json(
        { error: "This logo has already been reviewed" },
        { status: 409 }
      );
    }

    // Calculate 30% review reward
    const rewardUsd = Number(generation.priceUsd) * 0.3;

    // TODO: Execute x402 reward transaction
    const rewardTxHash = null; // Will be set when x402 reward payout is implemented

    // Update the generation with rating and reward info
    const updated = await prisma.logoGeneration.update({
      where: { token },
      data: {
        rating,
        ratingFeedback: feedback ?? null,
        rewardUsd,
        rewardTxHash,
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
      token: updated.token,
      rating: updated.rating,
      rewardUsd: Number(rewardUsd),
      rewardTxHash,
      message: `Thanks for your review! Your ${Number(rewardUsd).toFixed(4)} USDC reward is ${rewardTxHash ? "on its way" : "pending"}.`,
    });
  } catch (error) {
    console.error("Error rating logo:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
