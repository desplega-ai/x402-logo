import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const styles = await prisma.style.findMany({
      select: {
        name: true,
        shortDescription: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ styles });
  } catch (error) {
    console.error("Error fetching styles:", error);
    return NextResponse.json(
      { error: "Failed to fetch styles" },
      { status: 500 }
    );
  }
}
