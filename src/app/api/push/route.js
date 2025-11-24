import { broadcast } from "../stream/route";

export async function POST(request) {
  try {
    const body = await request.json();

    // Broadcast to all SSE clients
    broadcast(body);

    return Response.json({ status: "ok", received: body });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
