import { manualStart } from "@/lib/state";
import { NextResponse } from "next/server";

export async function POST() {
  await manualStart();
  return NextResponse.json({ success: true });
}
