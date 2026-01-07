// lib/mqtt/maketClient.js
import mqtt from "mqtt";

const GLOBAL_KEY = "__MQTT_MAKET__";

export function getMaketClient() {
  if (globalThis[GLOBAL_KEY]?.connected) {
    return globalThis[GLOBAL_KEY];
  }

  const client = mqtt.connect("mqtt://192.168.0.120:1883", {
    clientId: "web-maket-display",
    clean: false,
    reconnectPeriod: 2000,
    keepalive: 60,
  });

  client.on("connect", () => {
    console.log("✅ Maket MQTT connected");
    client.subscribe("/PLCMaketPV", { qos: 1 }, (err) => {
      if (!err) console.log("📡 Maket subscribed /PLCMaketPV");
    });
  });

  client.on("error", (e) => console.error("❌ Maket MQTT error:", e.message));

  globalThis[GLOBAL_KEY] = client;
  return client;
}
