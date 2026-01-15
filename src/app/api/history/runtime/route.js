import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { onIncomingRuntime } from "@/lib/state";

const DATA_DIR = path.join(process.cwd(), "data");

function todayFile() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return path.join(DATA_DIR, `runtime_history_${y}-${m}-${dd}.csv`);
}

function readTimeline(file) {
  if (!fs.existsSync(file)) return [];

  const lines = fs.readFileSync(file, "utf8").trim().split("\n");
  const [, ...rows] = lines; // skip header
  return rows.map((line) => {
    const clean = (v) => v.replace(/^"|"$/g, "").replace(/\r/g, "").trim();

    const [start, end, status, reason, source] = line.split(",").map(clean);

    return {
      start,
      end,
      status,
      reason: reason || null,
      source,
    };
  });
}

export async function GET() {
  try {
    const file = todayFile();

    // console.log("RUNTIME FILE:", file);

    const timeline = readTimeline(file);

    // console.log("RUNTIME TIMELINE:", timeline);
    onIncomingRuntime(timeline);
    return NextResponse.json({
      success: true,
      data: timeline,
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
