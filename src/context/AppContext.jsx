"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [live, setLive] = useState(null);
  const [conv, setConv] = useState([]);
  const [pump, setPump] = useState([]);
  const [now, setNow] = useState(new Date());
  const [role, setRole] = useState("Manager");

  async function fetchLive() {
    const r = await fetch("/api/mqtt");
    const j = await r.json();
    if (j.success) setLive(j.data);
  }

  async function fetchHistory() {
    const [c, p] = await Promise.all([
      fetch("/api/history?group=conveyor").then((r) => r.json()),
      fetch("/api/history?group=pump").then((r) => r.json()),
    ]);
    if (c.success) setConv(c.data);
    if (p.success) setPump(p.data);
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
    fetchLive();
    fetchHistory();
    setNow(new Date());
  }, []);

  return (
    <AppContext.Provider
      value={{ live, conv, pump, now, role, setRole, publish }}
    >
      {children}
    </AppContext.Provider>
  );
}

// custom hook to use context easily
export function useApp() {
  return useContext(AppContext);
}
