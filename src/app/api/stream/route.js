export const runtime = "nodejs"; // Required for SSE on Vercel
export const dynamic = "force-dynamic"; // Prevent caching

let clients = []; // connected browsers

export async function GET() {
  return new Response(
    new ReadableStream({
      start(controller) {
        const interval = setInterval(() => {}, 1000); // keep alive

        const client = { controller };
        clients.push(client);

        controller.enqueue(`event: connected\ndata: ok\n\n`);

        // When browser closes connection
        controller.onclose = () => {
          clients = clients.filter((c) => c !== client);
          clearInterval(interval);
        };
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    }
  );
}

// Function to broadcast data (called from POST route)
export function broadcast(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((c) => c.controller.enqueue(payload));
}
