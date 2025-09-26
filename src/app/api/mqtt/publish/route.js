// import { NextResponse } from "next/server";
// import { getClient } from "@/lib/getClient";

// export async function POST(req) {
//   try {
//     const { topic, message } = await req.json();
//     const client = getClient();

//     client.publish(topic, JSON.stringify(message));
//     console.log("📤 Published:", topic, message);

//     return NextResponse.json({ success: true, sent: { topic, message } });
//   } catch (err) {
//     console.error("Publish error:", err);
//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { getClient } from "@/lib/getClient"; // your mqtt client

function buildPublishPayload(updates = {}) {
  const mapping = {
    Machine1: "DO4",
    Machine2: "DO3",
    Lamp: "DO5",
    Pump1: "DO1",
    Pump2: "DO2",
  };

  const w_data = Object.entries(updates)
    .filter(([key]) => mapping[key] !== undefined)
    .map(([key, value]) => ({
      name: mapping[key],
      value: String(value),
    }));

  console.log(w_data);
  return {
    rw_prot: {
      Ver: "1.0.1",
      dir: "down",
      id: "USR-M100",
      w_data,
    },
  };
}

export async function POST(req) {
  try {
    const { topic, message } = await req.json();
    const client = getClient();

    const payload = buildPublishPayload(message);

    client.publish(topic, JSON.stringify(payload));
    console.log("📤 Published:", topic, JSON.stringify(payload, null, 2));

    return NextResponse.json({ success: true, payload });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
