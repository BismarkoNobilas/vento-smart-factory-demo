// lib/mqtt/osmsClient.js
import mqtt from "mqtt";

const GLOBAL_KEY = "__MQTT_OSMS__";

export function getOsmsClient() {
  if (globalThis[GLOBAL_KEY]?.connected) {
    return globalThis[GLOBAL_KEY];
  }

  const client = mqtt.connect("mqtt://192.168.0.123:1883", {
    clientId: "web-osms",
    clean: false,
    reconnectPeriod: 2000,
    keepalive: 60,
  });

  client.on("connect", () => {
    console.log("✅ OSMS MQTT connecteds");
    client.subscribe("/UploadTopic", { qos: 1 }, (err) => {
      if (!err) console.log("📡 OSMS subscribed /UploadTopic");
    });
  });

  client.on("error", (e) => console.error("❌ OSMS MQTT error:", e.message));

  globalThis[GLOBAL_KEY] = client;
  return client;
}
