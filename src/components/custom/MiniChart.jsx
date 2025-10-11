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
  height = "h-full",
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
    <div className={`w-full ${height} flex flex-col`}>
      <ChartContainer
        config={config}
        className="aspect-auto rounded-md w-full min-h-[120px]"
        style={{
          height: axisStateX ? "calc(100% - 27px)" : "100%", // tweak 22px for your tick size
        }}
      >
        <AreaChart data={data}>
          {axisStateX && (
            <XAxis
              ddataKey={dataKey} // can be "t" or "day"
              tickMargin={5}
              height={20} // explicitly control axis height
              tickFormatter={(v) => {
                if (dataKey === "t") {
                  // 🕒 Format as time
                  return new Date(v).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });
                } else if (dataKey === "day") {
                  // 📅 Format as date
                  return new Date(v).toLocaleDateString([], {
                    day: "2-digit",
                    month: "short",
                  });
                } else {
                  // default fallback
                  return v;
                }
              }}
            />
          )}
          <YAxis
            width={34}
            domain={domainAdd ? getDomain(domainAdd) : undefined}
            hide={!axisStateY} // hides ticks, line, labels
          />

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
    </div>
  );
}
