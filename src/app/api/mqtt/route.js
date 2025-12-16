// api/mqtt/route.js

import { NextResponse } from "next/server";
import { getClient } from "@/lib/getClient";
import { state, onIncoming, buffers } from "@/lib/state";

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
const msgt = {
  V1: 243,
  C1: 0,
  P1: 0.5,
  E1: 2689,
  F1: 50,
  Q1: 1,
  V2: 243,
  C2: 0.027,
  P2: 2.1,
  E2: 218,
  F2: 50,
  Q2: 0.32,
  Pm1L: 0,
  Pm1H: 0,
  Pm2L: 0,
  Pm2H: 0,
  M1: 0,
  M2: 0,
  Lp: 0,
  P1: 0,
  P2: 0,
};
// Attach the message listener once
if (!client.listenerCount("message")) {
  let lastTriggeredMinute = null; // keep track of last action minute
  client.on("message", (topic, payload) => {
    // console.log(client);
    try {
      if (topic !== "/UploadTopic") return;
      const msg = JSON.parse(payload.toString());
      // console.log("📥 MQTT RECEIVED:", msg);
      // pushToCloud(msg);
      onIncoming(msg);
      // console.log("📥 /UploadTopic:", msg);
      // 🔍 Time-based auto Lamp control
      const now = new Date();
      const minute = now.getMinutes();
      if (state.autoPumpControl) {
        if (msg.Pump1_High === 1) {
          console.log("⚡ Auto control: Pump1 HIGH → Turn Pump1 OFF, Pump2 ON");
          setTimeout(() => {
            client.publish(
              "/DownloadTopic",
              JSON.stringify({
                rw_prot: {
                  Ver: "1.0.1",
                  dir: "down",
                  id: "USR-M100",
                  w_data: [
                    { name: "DO2", value: "1" }, // Pump2 ON
                  ],
                },
              })
            );
          }, 2000);
        }

        // Auto logic: if Pump2 high → turn Pump2 OFF, Pump1 ON
        if (msg.Pump2_High === 1) {
          console.log("⚡ Auto control: Pump2 HIGH → Turn Pump2 OFF, Pump1 ON");
          setTimeout(() => {
            client.publish(
              "/DownloadTopic",
              JSON.stringify({
                rw_prot: {
                  Ver: "1.0.1",
                  dir: "down",
                  id: "USR-M100",
                  w_data: [
                    { name: "DO1", value: "1" }, // Pump1 ON
                  ],
                },
              })
            );
          }, 2000);
        }
      }

      if (msg.Pump1_High === 1 && msg.Pump1 === 1) {
        console.log("⚡ Auto control: Pump1 HIGH → Turn Pump1 OFF, Pump2 ON");
        setTimeout(() => {
          client.publish(
            "/DownloadTopic",
            JSON.stringify({
              rw_prot: {
                Ver: "1.0.1",
                dir: "down",
                id: "USR-M100",
                w_data: [
                  { name: "DO1", value: "0" }, // Pump1 OFF
                ],
              },
            })
          );
        }, 2000);
      }

      if (msg.Pump2_High === 1 && msg.Pump2 === 1) {
        console.log("⚡ Auto control: Pump2 HIGH → Turn Pump2 OFF, Pump1 ON");
        setTimeout(() => {
          client.publish(
            "/DownloadTopic",
            JSON.stringify({
              rw_prot: {
                Ver: "1.0.1",
                dir: "down",
                id: "USR-M100",
                w_data: [
                  { name: "DO2", value: "0" }, // Pump2 OFF
                ],
              },
            })
          );
        }, 2000);
      }

      if (state.autoLampControl) {
        if (minute !== lastTriggeredMinute) {
          if (minute === 1) {
            client.publish(
              "/DownloadTopic",
              JSON.stringify({
                rw_prot: {
                  Ver: "1.0.1",
                  dir: "down",
                  id: "USR-M100",
                  w_data: [
                    {
                      name: "DO5",
                      value: "0",
                    },
                  ],
                },
              })
            );
            console.log("⏰ Auto Lamp OFF (minute 1)");
            lastTriggeredMinute = minute;
          }
          if (minute === 2) {
            client.publish(
              "/DownloadTopic",
              JSON.stringify({
                rw_prot: {
                  Ver: "1.0.1",
                  dir: "down",
                  id: "USR-M100",
                  w_data: [
                    {
                      name: "DO5",
                      value: "1",
                    },
                  ],
                },
              })
            );
            console.log("⏰ Auto Lamp ON (minute 2)");
            lastTriggeredMinute = minute;
          }
          if (minute === 31) {
            client.publish(
              "/DownloadTopic",
              JSON.stringify({
                rw_prot: {
                  Ver: "1.0.1",
                  dir: "down",
                  id: "USR-M100",
                  w_data: [
                    {
                      name: "DO5",
                      value: "0",
                    },
                  ],
                },
              })
            );
            console.log("⏰ Auto Lamp OFF (minute 31)");
            lastTriggeredMinute = minute;
          }
          if (minute === 32) {
            client.publish(
              "/DownloadTopic",
              JSON.stringify({
                rw_prot: {
                  Ver: "1.0.1",
                  dir: "down",
                  id: "USR-M100",
                  w_data: [
                    {
                      name: "DO5",
                      value: "1",
                    },
                  ],
                },
              })
            );
            console.log("⏰ Auto Lamp ON (minute 32)");
            lastTriggeredMinute = minute;
          }
        }
      }
    } catch (e) {
      console.error("❌ invalid JSON from MQTT3:", e.message);
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
      // connection,
    },
  });
}

// // POST -> publish control commands (UI buttons)
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { topic, message } = body;

//     const payload = buildPublishPayload(message);

//     client.publish(topic, JSON.stringify(payload));
//     console.log("📤 Published:", topic, JSON.stringify(payload, null, 2));

//     return NextResponse.json({ success: true, payload });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }

// function buildPublishPayload(updates = {}) {
//   const mapping = {
//     Machine1: "DO1",
//     Machine2: "DO2",
//     Lamp: "DO3",
//     Pump1: "DO4",
//     Pump2: "DO5",
//   };

//   const w_data = Object.entries(updates)
//     .filter(([key, value]) => mapping[key] !== undefined) // only known devices
//     .map(([key, value]) => ({
//       name: mapping[key],
//       value: String(value),
//     }));

//   return {
//     rw_prot: {
//       Ver: "1.0.1",
//       dir: "down",
//       id: "USR-M100",
//       w_data,
//     },
//   };
// }
