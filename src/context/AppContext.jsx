// context/AppContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children, initialData }) {
  // ======================
  // CORE STATES
  // ======================
  const [live, setLive] = useState(initialData?.live ?? null);
  const [conv, setConv] = useState(initialData?.conv ?? []);
  const [pump, setPump] = useState(initialData?.pump ?? []);
  const [tv, setTv] = useState(initialData?.tv ?? []);
  const [runtime, setRuntime] = useState(initialData?.runtime ?? []); // ✅ RUNTIME HISTORY (CSV)
  // console.log(runtime);
  const [connection, setConnection] = useState(null);
  const [now, setNow] = useState(new Date());
  const [role, setRole] = useState("Manager");

  // ======================
  // LIVE DATA (MQTT SNAPSHOT)
  // ======================
  async function fetchLive() {
    try {
      const r = await fetch("/api/mqtt");
      const j = await r.json();
      console.log("🟢 MQTT response:", j);

      if (!j.success) return;

      setLive(j.data);
      setConnection(j.data.connection ?? null);

      if (j.data.conv) setConv(j.data.conv);
      if (j.data.pump) setPump(j.data.pump);
      if (j.data.tv) setTv(j.data.tv);
    } catch (e) {
      console.error("❌ fetchLive error:", e);
    }
  }

  // ======================
  // HISTORY (CHART DATA)
  // ======================
  async function fetchHistory() {
    try {
      const [c, p, t] = await Promise.all([
        fetch("/api/history?group=conveyor").then((r) => r.json()),
        fetch("/api/history?group=pump").then((r) => r.json()),
        fetch("/api/history?group=tv").then((r) => r.json()),
      ]);

      if (c.success) setConv(c.data);
      if (p.success) setPump(p.data);
      if (t.success) setTv(t.data);
    } catch (e) {
      console.error("❌ fetchHistory error:", e);
    }
  }

  // ======================
  // ✅ RUNTIME HISTORY (CSV → API)
  // ======================
  async function fetchRuntime(date = "today") {
    try {
      const r = await fetch(`/api/history/runtime?date=${date}`);

      const j = await r.json();

      if (!j.success) return;

      setRuntime(j.data);
    } catch (e) {
      console.error("❌ fetchRuntime error:", e);
      setRuntime([]);
    }
  }

  // ======================
  // MQTT PUBLISH
  // ======================
  async function publish(topic, message) {
    try {
      await fetch("/api/mqtt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, message }),
      });

      // refresh snapshot after publish
      fetchLive();
    } catch (e) {
      console.error("❌ publish error:", e);
    }
  }

  // ======================
  // EFFECTS
  // ======================
  useEffect(() => {
    setNow(new Date());
    // console.log("⏱️ Polling useEffect");

    // initial load (no SSR data)
    if (!initialData) {
      fetchHistory();
      fetchRuntime("today"); // initial runtime load
      fetchLive();
    }

    // 🔴 Live data: every 3 seconds
    const liveInterval = setInterval(() => {
      fetchLive();
    }, 3_000);

    // 🟢 Runtime history: every 1 minute
    const runtimeInterval = setInterval(() => {
      fetchRuntime("today");
    }, 5_000);

    return () => {
      clearInterval(liveInterval);
      clearInterval(runtimeInterval);
    };
  }, []);

  // ======================
  // PROVIDER
  // ======================
  return (
    <AppContext.Provider
      value={{
        // live
        live,
        connection,

        // charts
        conv,
        pump,
        tv,

        // runtime
        runtime,

        // misc
        now,
        role,
        setRole,

        // actions
        publish,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ======================
// HOOK
// ======================
export function useApp() {
  return useContext(AppContext);
}
