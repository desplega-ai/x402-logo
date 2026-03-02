import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    version: 1,
    resources: ["POST /api/generate"],
  });
}
