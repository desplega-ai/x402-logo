import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;

    const job = await prisma.generationJob.findUnique({
      where: { id: jobId },
      include: { asset: true },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    if (job.status === "completed" && job.asset) {
      return NextResponse.json({
        status: "completed",
        token: job.asset.token,
        svg: job.asset.asset,
        style: job.styleName,
      });
    }

    if (job.status === "failed") {
      return NextResponse.json({
        status: "failed",
        error: job.error,
      });
    }

    // pending or processing
    return NextResponse.json({
      status: job.status,
    });
  } catch (error) {
    console.error("Error checking job status:", error);
    return NextResponse.json(
      { error: "Failed to check job status" },
      { status: 500 }
    );
  }
}
