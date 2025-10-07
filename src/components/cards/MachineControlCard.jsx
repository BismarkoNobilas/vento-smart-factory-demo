"use client";

import { Card } from "@/components/ui/card";

export default function MachineControlCard({
  id, // "Machine1" | "Machine2"
  title, // e.g. "Machine 1 (Conveyor Packing)"
  data,
  uptimes,
  loading,
  role,
  send,
  conveyors = 4, // number of conveyor GIFs (default 4)
}) {
  const isOn = data[id];

  return (
    <Card className="p-4 w-[504px] gap-1 h-fit grid grid-cols-2 bg-zinc-50 shadow-sm rounded">
      {/* Header */}
      <div className="col-span-2 grid">
        <h3 className="font-bold">{title}</h3>
        <span className="ml-4 text-blue-600 text-[11px]">
          {isOn ? formatDuration(uptimes[id]) : "0h 0m"}
        </span>
      </div>

      {/* Machine toggle */}
      <div className="grid justify-center gap-3">
        <img src="motor.svg" alt="Motor" width={150} />
        <div className="flex justify-center items-center space-x-2">
          <span>OFF</span>
          <label className="switch">
            <input
              type="checkbox"
              disabled={loading || role === "Operator"}
              checked={isOn}
              onChange={() => send(id, isOn ? 0 : 1)}
            />
            <span className="slider round"></span>
          </label>
          <span>ON</span>
        </div>
      </div>

      {/* Conveyor images */}
      <div className="grid auto-flow-col grid-cols-2">
        {Array.from({ length: conveyors }).map((_, i) => (
          <img
            key={i}
            src={isOn ? "conveyor-running.gif" : "conveyor-running.gif"}
            alt={`Conveyor ${i + 1}`}
            width={100}
            height={100}
          />
        ))}
      </div>
    </Card>
  );
}
