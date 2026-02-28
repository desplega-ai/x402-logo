import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const generation = await prisma.logoGeneration.findUnique({
      where: { token },
      select: {
        svgContent: true,
        brandName: true,
        style: { select: { name: true } },
        createdAt: true,
      },
    });

    if (!generation || !generation.svgContent) {
      return NextResponse.json(
        { error: "Asset not found" },
        { status: 404 }
      );
    }

    return new NextResponse(generation.svgContent, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Disposition": `inline; filename="${generation.brandName}-logo.svg"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching asset:", error);
    return NextResponse.json(
      { error: "Failed to fetch asset" },
      { status: 500 }
    );
  }
}
