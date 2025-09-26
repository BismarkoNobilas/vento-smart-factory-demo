import { NextResponse } from "next/server";
import { buffers } from "@/lib/state";

// GET /api/history?group=conveyor|pump
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const group = searchParams.get("group");
  if (!["conveyor", "pump"].includes(group)) {
    return NextResponse.json(
      { success: false, error: "invalid group" },
      { status: 400 }
    );
  }
  return NextResponse.json({ success: true, data: buffers[group] });
}
