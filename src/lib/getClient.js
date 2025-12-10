// getClient.js
// Ensures exactly one MQTT client + one subscription
import mqtt from "mqtt";

let client = null;

export function getClient() {
  if (!client) {
    const url = process.env.MQTT_URL || "wss://192.168.0.123:8084/mqtt";
    // client = mqtt.connect(url, {
    //   reconnectPeriod: 2000, // auto reconnect every 2s
    // });
    client.on("connect", () => {
      console.log("✅ MQTT connected:", url);
      client.subscribe("/UploadTopic", (err) => {
        if (!err) console.log("📡 Subscribed to /UploadTopic");
      });
    });

    client.on("error", (err) => {
      console.error("❌ MQTT error:", err);
    });

    client.on("close", () => {
      console.log("🔌 MQTT disconnected");
    });
  }
  return client;
}
