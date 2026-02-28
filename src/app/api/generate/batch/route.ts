import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod/v4";

const BATCH_SIZE = 10;
const BATCH_MULTIPLIER = 8; // 10 logos for 8x the single price

const batchSchema = z.object({
  styleSlug: z.string().min(1, "Style slug is required"),
  brandName: z.string().min(1, "Brand name is required").max(100),
  brandVoice: z.string().min(1, "Brand voice is required").max(500),
  count: z.number().int().min(1).max(BATCH_SIZE).default(BATCH_SIZE),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = batchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { styleSlug, brandName, brandVoice, count } = parsed.data;

    const style = await prisma.style.findUnique({
      where: { slug: styleSlug, active: true },
    });

    if (!style) {
      return NextResponse.json(
        { error: `Style "${styleSlug}" not found` },
        { status: 404 }
      );
    }

    // Batch pricing: count/BATCH_SIZE * BATCH_MULTIPLIER * single price
    // For 10 logos: 8x single price (20% discount per logo)
    const singlePrice = Number(style.priceUsd);
    const batchPrice = (count / BATCH_SIZE) * BATCH_MULTIPLIER * singlePrice;
    const pricePerLogo = batchPrice / count;

    const paymentTxHash = request.headers.get("x-402-receipt") ?? null;
    const walletAddress = request.headers.get("x-402-payer") ?? null;

    const results = [];
    for (let i = 0; i < count; i++) {
      const svgContent = generatePlaceholderSvg(brandName, style.name, i);

      const generation = await prisma.logoGeneration.create({
        data: {
          styleId: style.id,
          brandName,
          brandVoice,
          svgContent,
          priceUsd: pricePerLogo,
          paymentTxHash,
          walletAddress,
        },
      });

      results.push({
        id: generation.id,
        token: generation.token,
        svg: svgContent,
      });
    }

    return NextResponse.json({
      count: results.length,
      style: style.name,
      totalPriceUsd: batchPrice,
      pricePerLogo,
      logos: results,
    });
  } catch (error) {
    console.error("Error generating batch:", error);
    return NextResponse.json(
      { error: "Failed to generate batch" },
      { status: 500 }
    );
  }
}

function generatePlaceholderSvg(
  brandName: string,
  styleName: string,
  variant: number
): string {
  const initial = brandName.charAt(0).toUpperCase();
  const hue = (220 + variant * 30) % 360;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="24" fill="hsl(${hue}, 70%, 55%)"/>
  <text x="100" y="120" text-anchor="middle" font-size="80" font-weight="bold" fill="white" font-family="system-ui">${initial}</text>
  <text x="100" y="170" text-anchor="middle" font-size="14" fill="white" opacity="0.7" font-family="system-ui">${styleName} #${variant + 1}</text>
</svg>`;
}
