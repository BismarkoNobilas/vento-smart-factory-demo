"use client";
import { useApp } from "@/context/AppContext";

export default function Clock() {
  const { now } = useApp();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const weekday = now.toLocaleDateString("en-US", {
    weekday: "short",
  }); // Wed

  const dayMonth = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  }); // 27/11

  return (
    <div className="whitespace-nowrap font-mono">
      {time} | {weekday}, {dayMonth}
    </div>
  );
}
