import { broadcast } from "../stream/route";

export async function POST(request) {
  const body = await request.json();

  // send to all SSE clients
  broadcast(body);

  return Response.json({ status: "ok" });
}
