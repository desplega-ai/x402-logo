import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Internal endpoint for workflow steps to mark jobs as failed.
 * Workflow steps can't use Prisma directly (Node.js modules unavailable).
 */
export async function POST(request: NextRequest) {
  try {
    const { jobId, error: errorMessage } = await request.json();

    if (!jobId) {
      return NextResponse.json(
        { error: "Missing required field: jobId" },
        { status: 400 }
      );
    }

    await prisma.generationJob.update({
      where: { id: jobId },
      data: {
        status: "failed",
        error: errorMessage ?? "Unknown error",
        retryCount: { increment: 1 },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error marking job as failed:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}
