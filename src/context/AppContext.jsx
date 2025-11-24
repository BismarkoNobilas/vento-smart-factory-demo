// context/AppContext.jsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children, initialData }) {
  const [live, setLive] = useState(initialData?.live ?? null);
  const [conv, setConv] = useState(initialData?.conv ?? []);
  const [pump, setPump] = useState(initialData?.pump ?? []);
  const [now, setNow] = useState(new Date());
  const [role, setRole] = useState("Manager");

  async function fetchLive() {
    try {
      const r = await fetch("/api/mqtt");
      const j = await r.json();

      if (j.success) setLive(j.data);
    } catch (e) {
      console.error("fetchLive error:", e);
    }
  }

  async function fetchHistory() {
    try {
      const [c, p] = await Promise.all([
        fetch("/api/history?group=conveyor").then((r) => r.json()),
        fetch("/api/history?group=pump").then((r) => r.json()),
      ]);
      if (c.success) setConv(c.data);
      if (p.success) setPump(p.data);
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
    // const interval = setInterval(fetchLive, 5000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{ live, conv, pump, now, role, setRole, publish }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
