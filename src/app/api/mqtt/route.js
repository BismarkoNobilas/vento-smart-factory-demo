// api/mqtt/route.js

import { NextResponse } from "next/server";
import { getClient } from "@/lib/getClient";
import { state, onIncoming, buffers, onMqttConnect } from "@/lib/state";

const client = getClient();
// local-server/pushToVercel.js

async function pushToCloud(data) {
  await fetch("https://vento-smart-factory.vercel.app/api/push", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((out) => console.log("Pushed:", out))
    .catch((err) => console.error("Failed:", err));
}

// Attach the message listener once
if (!client.listenerCount("message")) {
  let lastTriggeredMinute = null; // keep track of last action minute
  client.on("message", (topic, payload) => {
    // console.log(client);
    try {
      if (topic !== "/PLCMaketPV") return;
      const raw = payload
        .toString("utf8")
        .replace(/[\x00-\x1F\x7F]/g, "") // remove NULL bytes
        .trim(); // remove padding spaces / newlines
      // console.log("📥 MQTT before:", raw);
      const add = raw;
      // console.log("📥 MQTT after:", add);
      const msg = JSON.parse(add);
      onIncoming(msg);
      onMqttConnect();

      // pushToCloud(msg);

      // 🔍 Time-based auto Lamp control
      const now = new Date();
      const minute = now.getMinutes();
    } catch (e) {
      console.error("❌ invalid JSON from this MQTT3:", e.message);
    }
  });
}

// GET -> current state for UI cards
export async function GET() {
  // pushToCloud(msgt);
  return NextResponse.json({
    success: true,
    data: {
      ...state,
      conv: buffers.conveyor,
      pump: buffers.pump,
      tv: buffers.tv,
      runtime: buffers.runtime,
      // connection,
    },
  });
}
