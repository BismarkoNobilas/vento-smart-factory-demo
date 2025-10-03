"use client";

import WaterTankImage from "../custom/WaterTankImage";
import { Card } from "../ui/card";

export default function PumpCard({
  id, // "Pump1" | "Pump2"
  label, // "Pump 1", "Pump 2"
  data,
  uptimes,
  loading,
  role,
  send,
  level = 0, // tank level (default 0)
}) {
  const isOn = data[id];

  return (
    <Card className="p-4 w-[300px] gap-1 h-fit grid grid-cols-2 bg-zinc-50 shadow-sm rounded">
      {/* Header */}
      <div className="grid">
        <h3 className="font-bold">{label}</h3>
        <span className="ml-4 text-blue-600 text-[10px]">
          {isOn ? formatDuration(uptimes[id]) : "0h 0m"}
        </span>
      </div>

      {/* Motor & switch */}
      <div className="grid justify-center row-start-2">
        <img src="motor-off.svg" alt="Motor" width={120} />
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

      {/* Tank level */}
      <div className="row-span-2 items-center">
        <WaterTankImage label={label} level={level} />
      </div>
    </Card>
  );
}
