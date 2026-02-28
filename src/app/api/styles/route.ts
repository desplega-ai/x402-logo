import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const styles = await prisma.style.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        priceUsd: true,
        rating: true,
        ratingCount: true,
        color: true,
        iconSvg: true,
      },
      orderBy: { rating: "desc" },
    });

    return NextResponse.json({
      styles: styles.map((s) => ({
        ...s,
        priceUsd: Number(s.priceUsd),
        rating: Number(s.rating),
      })),
    });
  } catch (error) {
    console.error("Error fetching styles:", error);
    return NextResponse.json(
      { error: "Failed to fetch styles" },
      { status: 500 }
    );
  }
}
