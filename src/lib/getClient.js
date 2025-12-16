// getClient.js
import mqtt from "mqtt";

let client = null;

export function getClient() {
  if (!client) {
    const url = process.env.MQTT_URL || "mqtt://192.168.0.123:1883";
    client = mqtt.connect(url);

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
