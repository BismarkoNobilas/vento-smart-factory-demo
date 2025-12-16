"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function MiniChart({
  data = [],
  dataKey,
  label,
  axisStateX,
  axisStateY,
  domainAdd,
  height = "h-full",
  type: initialType = "area", // 👈 NEW (area | bar)
  showToggle = true, // 👈 optional button
  // 👇 NEW
  alertValue = 3000, // number (e.g. 80)
  alertLabel = "ALERT",
  alertColor = "#ef4444", // red-500
}) {
  const [mounted, setMounted] = useState(false);
  const [type, setType] = useState(initialType);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = {
    [dataKey]: {
      label,
      color: "#3b82f6",
    },
  };

  // ⛔ prevent SSR / empty-data crash
  if (!mounted || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="min-h-[120px] flex items-center justify-center text-xs text-muted-foreground">
        No data
      </div>
    );
  }

  // Compute Y-axis domain (ignores 0 unless all 0)
  const getDomain = (add) => [
    () => {
      const nonZero = data.map((d) => d[dataKey]).filter((v) => v > 0);
      return nonZero.length ? Math.min(...nonZero) - add : 0;
    },
    () => {
      const nonZero = data.map((d) => d[dataKey]).filter((v) => v > 0);
      return nonZero.length ? Math.max(...nonZero) + add : 10;
    },
  ];

  // Axis formatter (unchanged)
  const renderXAxis = () =>
    axisStateX && (
      <XAxis
        dataKey="t"
        tickMargin={5}
        height={20}
        tickFormatter={(v) =>
          new Date(v).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        }
      />
    );

  const renderYAxis = () => (
    <YAxis
      width={34}
      domain={domainAdd ? getDomain(domainAdd) : undefined}
      hide={!axisStateY}
    />
  );

  return (
    <div className={`w-full ${height} flex flex-col`}>
      <ChartContainer
        config={config}
        className="aspect-auto rounded-md w-full min-h-[120px]"
        style={{
          height: axisStateX ? "calc(100% - 27px)" : "100%",
        }}
      >
        {/* ⚠️ Chart container stays stable */}
        {type === "area" ? (
          <AreaChart data={data}>
            {renderXAxis()}
            {renderYAxis()}
            <ChartTooltip content={<ChartTooltipContent />} />

            <defs>
              <linearGradient
                id={`fill-${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="20%" stopColor="#14E240" stopOpacity={0.8} />
                <stop offset="80%" stopColor="#b0ebbc" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <Area
              type="linear"
              dataKey={dataKey}
              stroke="#3b82f6"
              fill={`url(#fill-${dataKey})`}
              fillOpacity={0.7}
              strokeWidth={1}
              dot={false}
              isAnimationActive={false}
            />
            {typeof alertValue === "number" && (
              <ReferenceLine
                y={alertValue}
                stroke={alertColor}
                strokeDasharray="6 4"
                strokeWidth={2}
                label={{
                  value: alertLabel,
                  position: "right",
                  fill: alertColor,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
            )}
          </AreaChart> //ohrgyczdu
        ) : (
          <BarChart data={data}>
            {renderXAxis()}
            {renderYAxis()}
            <ChartTooltip content={<ChartTooltipContent />} />

            <Bar
              dataKey={dataKey}
              fill="#3b82f6"
              radius={[3, 3, 0, 0]}
              isAnimationActive={false}
            />
            {typeof alertValue === "number" && (
              <ReferenceLine
                y={alertValue}
                stroke={alertColor}
                strokeDasharray="6 4"
                strokeWidth={2}
                label={{
                  value: alertLabel,
                  position: "right",
                  fill: alertColor,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
            )}
          </BarChart>
        )}
      </ChartContainer>

      {/* 🔘 Toggle button */}
      {showToggle && (
        <div className="flex justify-end mt-1">
          <button
            className="text-xs text-blue-500 hover:underline"
            onClick={() => setType(type === "area" ? "bar" : "area")}
          >
            Switch to {type === "area" ? "Bar" : "Area"}
          </button>
        </div>
      )}
    </div>
  );
}
