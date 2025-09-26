import { NextResponse } from "next/server";
import { setAutoControl, state } from "@/lib/state";

export async function POST(req) {
  try {
    const { type, enabled } = await req.json();
    setAutoControl(type, enabled);
    console.log(`🔧 AutoControl (${type}) set to:`, enabled);
    return NextResponse.json({ success: true, state });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    autoPumpControl: state.autoPumpControl,
    autoLampControl: state.autoLampControl,
  });
}
