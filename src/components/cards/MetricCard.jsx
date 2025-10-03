"use client";

import { Card } from "@/components/ui/card";
import TitleBlock from "../custom/TitleBlock";

export default function MetricCard({
  title,
  value,
  unit,
  chart = null, // pass a chart component or leave null
  color = "text-emerald-400",
  className = "",
}) {
  return (
    <Card className={`grid bg-zinc-50 shadow-sm rounded relative ${className}`}>
      {/* Title */}
      <TitleBlock title={title} showValue={false} />

      {/* Chart (optional) */}
      {chart && <div className="relative">{chart}</div>}

      {/* Value + Unit overlay (centered if chart, stacked if not) */}
      <div
        className={`${
          chart
            ? "absolute inset-0 flex items-center justify-center"
            : "grid grid-rows-2 h-full w-full"
        }`}
      >
        <div
          className={`h-full font-bold text-6xl ${color} flex items-center justify-center`}
        >
          {value}
        </div>
        <div className="h-full font-semibold text-3xl flex items-center justify-center">
          {unit}
        </div>
      </div>
    </Card>
  );
}
