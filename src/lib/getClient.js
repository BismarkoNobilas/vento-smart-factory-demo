// getClient.js
// Ensures exactly one MQTT client + one subscription
import mqtt from "mqtt";

let client = null;

export function getClient() {
  if (!client) {
    const url = process.env.MQTT_URL || "mqtt://172.24.82.40:1883";
    client = mqtt.connect(url);

    client.on("connect", () => {
      console.log("✅ MQTT connected:", url);
      client.subscribe("/UploadTopic", (err) => {
        if (!err) console.log("📡 Subscribed to /UploadTopic");
      });
    });
  }
  return client;
}
