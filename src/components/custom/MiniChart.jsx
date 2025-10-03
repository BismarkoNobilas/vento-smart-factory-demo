"use client";

import { AreaChart, Area, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // adjust path if needed

export default function MiniChart({
  data = [],
  dataKey,
  label,
  axisStateX,
  axisStateY,
  domainAdd,
}) {
  const config = {
    [dataKey]: {
      label,
      color: "#3b82f6",
    },
  };

  // Compute Y-axis domain (ignores 0 values unless everything is 0)
  const getDomain = (add) => [
    () => {
      const nonZero = data.map((d) => d[dataKey]).filter((v) => v > 0);
      if (nonZero.length === 0) return 0;
      return Math.min(...nonZero) - add;
    },
    () => {
      const nonZero = data.map((d) => d[dataKey]).filter((v) => v > 0);
      if (nonZero.length === 0) return 10;
      return Math.max(...nonZero) + add;
    },
  ];

  return (
    <ChartContainer
      config={config}
      className="aspect-auto rounded-md h-full w-full"
    >
      <AreaChart data={data}>
        {axisStateX && (
          <XAxis
            dataKey="t"
            tickMargin={5}
            tickFormatter={(v) =>
              new Date(v).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            }
          />
        )}
        {axisStateY && (
          <YAxis
            width={34}
            {...(domainAdd ? { domain: getDomain(domainAdd) } : {})}
          />
        )}

        <ChartTooltip content={<ChartTooltipContent />} />

        <defs>
          <linearGradient id={`fill-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="20%" stopColor="#14E240" stopOpacity={0.8} />
            <stop offset="80%" stopColor="#b0ebbc" stopOpacity={0.8} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#3b82f6"
          fill={`url(#fill-${dataKey})`}
          fillOpacity={0.7}
          strokeWidth={1}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
