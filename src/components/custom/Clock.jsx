// components/Clock.jsx
"use client";
import { useApp } from "@/context/AppContext";

export default function Clock() {
  const { now } = useApp();
  return (
    <div>
      {now.toLocaleDateString()}{" "}
      {now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </div>
  );
}
