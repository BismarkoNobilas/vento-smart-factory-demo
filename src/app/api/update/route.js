import { broadcast } from "../stream/route";

let lastData = null; // Keep latest in memory

export async function POST(req) {
  try {
    const body = await req.json();

    lastData = body;

    // Push to all SSE clients
    broadcast(lastData);

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}

// Allow GET so you can debug easily
export async function GET() {
  return Response.json({ lastData });
}
