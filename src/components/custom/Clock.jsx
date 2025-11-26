// components/Clock.jsx
"use client";
import { useApp } from "@/context/AppContext";

export default function Clock() {
  const { now } = useApp();
  return (
    <div className="gap-[2px]">
      {now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
      {now.toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      })}
    </div>
  );
}
