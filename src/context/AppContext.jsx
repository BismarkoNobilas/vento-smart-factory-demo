// context/AppContext.jsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children, initialData }) {
  const [live, setLive] = useState(initialData?.live ?? null);
  const [conv, setConv] = useState(initialData?.conv ?? []);
  const [pump, setPump] = useState(initialData?.pump ?? []);
  const [tv, setTv] = useState(initialData?.tv ?? []);
  const [now, setNow] = useState(new Date());
  const [role, setRole] = useState("Manager");
  const [connection, setConnection] = useState(null);

  async function fetchLive() {
    try {
      const r = await fetch("/api/mqtt");
      const j = await r.json();
      if (j.success) {
        setLive(j.data);
        setConnection(j.data.connection);
        if (j.data.conv) setConv(j.data.conv);
        if (j.data.pump) setPump(j.data.pump);
        if (j.data.tv) setTv(j.data.tv);
      }
    } catch (e) {
      console.error("fetchLive error:", e);
    }
  }

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
      console.error("fetchHistory error:", e);
    }
  }

  async function publish(topic, message) {
    await fetch("/api/mqtt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, message }),
    });
    fetchLive();
  }

  useEffect(() => {
    setNow(new Date());

    // if no server data, load once
    if (!initialData) {
      fetchLive();
      fetchHistory();
    }

    // live polling every 5s
    const interval = setInterval(fetchLive, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{ live, conv, pump, connection, tv, now, role, setRole, publish }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
