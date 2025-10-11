"use client";

import { Card } from "@/components/ui/card";
import TitleBlock from "../custom/TitleBlock";

export default function MetricCard({
  title,
  value,
  unit,
  chart = null, // optional chart
  color = "text-emerald-400",
  className = "",
  textSize = "text-5xl", // 🔹 default text size for value
  unitSize = "text-3xl", // 🔹 default text size for unit
}) {
  return (
    <Card
      className={`bg-zinc-50 shadow-sm rounded relative gap-1 h-full w-full p-2 ${className}`}
    >
      {/* Title */}
      <TitleBlock title={title} showValue={false} />

      {/* Chart (optional) */}
      {chart && <div className="relative h-full">{chart}</div>}

      {/* Value + Unit */}
      <div
        className={`${
          chart
            ? "absolute inset-0 flex items-center justify-center w-full p-2 space-x-3 h-full"
            : "flex items-center justify-center w-full p-1 space-x-3 h-full"
        }`}
      >
        <div
          className={`h-fit font-bold ${textSize} ${color} flex items-center justify-center`}
        >
          {value}
        </div>
        <div className={`h-suto font-semibold ${unitSize} flex justify-center`}>
          {unit}
        </div>
      </div>
    </Card>
  );
}
