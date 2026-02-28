import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod/v4";

const generateSchema = z.object({
  styleSlug: z.string().min(1, "Style slug is required"),
  brandName: z.string().min(1, "Brand name is required").max(100),
  brandVoice: z.string().min(1, "Brand voice is required").max(500),
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

    const { styleSlug, brandName, brandVoice } = parsed.data;

    // Look up the style
    const style = await prisma.style.findUnique({
      where: { slug: styleSlug, active: true },
    });

    if (!style) {
      return NextResponse.json(
        { error: `Style "${styleSlug}" not found` },
        { status: 404 }
      );
    }

    // TODO: x402 payment verification
    // The x402 middleware will handle payment before this point.
    // Extract payment info from x402 headers when integrated.
    const paymentTxHash = request.headers.get("x-402-receipt") ?? null;
    const walletAddress = request.headers.get("x-402-payer") ?? null;

    // TODO: Call LLM service to generate SVG logo
    // This is a placeholder — the actual generation logic depends on
    // which SVG generation service is chosen (task d research).
    const svgContent = generatePlaceholderSvg(brandName, style.name);

    // Record the generation
    const generation = await prisma.logoGeneration.create({
      data: {
        styleId: style.id,
        brandName,
        brandVoice,
        svgContent,
        priceUsd: style.priceUsd,
        paymentTxHash,
        walletAddress,
      },
    });

    return NextResponse.json({
      id: generation.id,
      token: generation.token,
      svg: svgContent,
      style: style.name,
      priceUsd: Number(style.priceUsd),
    });
  } catch (error) {
    console.error("Error generating logo:", error);
    return NextResponse.json(
      { error: "Failed to generate logo" },
      { status: 500 }
    );
  }
}

/**
 * Placeholder SVG generator — will be replaced with actual LLM-based generation.
 */
function generatePlaceholderSvg(brandName: string, styleName: string): string {
  const initial = brandName.charAt(0).toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="24" fill="#3b82f6"/>
  <text x="100" y="120" text-anchor="middle" font-size="80" font-weight="bold" fill="white" font-family="system-ui">${initial}</text>
  <text x="100" y="170" text-anchor="middle" font-size="14" fill="white" opacity="0.7" font-family="system-ui">${styleName}</text>
</svg>`;
}
