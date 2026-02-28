import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod/v4";

const rateSchema = z.object({
  token: z.string().uuid("A valid token is required"),
  text: z.string().max(1000).optional(),
  rating: z.number().int().min(1).max(5),
  styleName: z.string().min(1, "Style name is required"),
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

    const { token, text, rating, styleName } = parsed.data;

    // Validate no duplicate rating for this token
    const existing = await prisma.rate.findUnique({
      where: { token },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This token has already been rated" },
        { status: 409 }
      );
    }

    // Find the style
    const style = await prisma.style.findUnique({
      where: { name: styleName },
    });

    if (!style) {
      return NextResponse.json(
        { error: `Style "${styleName}" not found` },
        { status: 404 }
      );
    }

    // Save the rating
    await prisma.rate.create({
      data: {
        token,
        text: text ?? null,
        rating,
        styleId: style.id,
      },
    });

    // Recalculate average rating for the style
    const aggregate = await prisma.rate.aggregate({
      where: { styleId: style.id },
      _avg: { rating: true },
    });

    const newAverage = aggregate._avg.rating ?? 0;

    await prisma.style.update({
      where: { id: style.id },
      data: { averageRating: newAverage },
    });

    return NextResponse.json({
      success: true,
      averageRating: newAverage,
    });
  } catch (error) {
    console.error("Error rating:", error);
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 }
    );
  }
}
