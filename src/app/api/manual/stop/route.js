import { manualStop } from "@/lib/state";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { reason } = await req.json();
  await manualStop(reason);
  return NextResponse.json({ success: true });
}
