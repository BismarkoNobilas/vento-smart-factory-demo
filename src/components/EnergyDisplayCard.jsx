"use client";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import AnalogGaugeWrapper from "@/components/AnalogGaugeWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Temperature from "./Temperature";

function KV({ k, v, unit = "", val }) {
  return (
    <div
      className={`p-2 m-2 rounded w-[200px] bg-slate-200 flex justify-${
        val ? "between" : "center"
      } font-semibold text-[11px] h-fit`}
    >
      <span>{k}</span>
      {val && (
        <span className="font-mono flex justify-between gap-0.5">
          <span>{v}</span>
          <span>{unit}</span>
        </span>
      )}
    </div>
  );
}

function MiniChart({ data, dataKey, label, axisStateX, axisStateY }) {
  const config = {
    [dataKey]: {
      label,
      color: "#3b82f6",
    },
  };

  // Hybrid Y-axis domain: ignore zeros for scaling
  const getDomain = () => [
    () => {
      const nonZero = data.map((d) => d[dataKey]).filter((v) => v > 0);
      if (nonZero.length === 0) return 0;
      return Math.min(...nonZero) - 2;
    },
    () => {
      const nonZero = data.map((d) => d[dataKey]).filter((v) => v > 0);
      if (nonZero.length === 0) return 10;
      return Math.max(...nonZero) + 2;
    },
  ];

  return (
    <ChartContainer config={config} className="aspect-auto rounded-md h-full">
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
        {axisStateY && <YAxis width={38} />} {/* domain={getDomain()} */}
        <ChartTooltip content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="20%" stopColor="#14E240" stopOpacity={0.8} />
            <stop offset="80%" stopColor="#b0ebbc" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#3b82f6"
          fill="url(#fill)"
          fillOpacity={0.7}
          strokeWidth={1}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

function MiniChartArea({ data, dataKey, label }) {
  const config = {
    [dataKey]: {
      label,
      color: "#3b82f6",
    },
  };

  return (
    <ChartContainer config={config} className="aspect-auto rounded-md h-full">
      <AreaChart accessibilityLayer data={data}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="20%" stopColor="#14E240" stopOpacity={0.8} />
            <stop offset="80%" stopColor="#b0ebbc" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <YAxis
          hide={true}
          domain={["dataMin - 2", "dataMax + 2"]} // shift min/max dynamically
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#14E240"
          fill="url(#fill)"
          fillOpacity={0.7}
          strokeWidth={0}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export default function EnergyDisplayCard({ conveyor, pump, live }) {
  //Demo data
  const chartData = [
    {
      t: "2025-09-10T02:51:34.965Z",
      Current1: 0.0281,
      Current2: 0.0534,
      Voltage1: 228.903,
      Voltage2: 228.172,
      Energy1: 12,
      Energy2: 46,
      Power1: 2.073,
      Power2: 5.413,
      PF1: 0.328,
      PF2: 0.437,
    },
    {
      t: "2025-09-10T02:51:34.965Z",
      Current1: 0.0839,
      Current2: 0.0587,
      Voltage1: 230.306,
      Voltage2: 228.48,
      Energy1: 13,
      Energy2: 48,
      Power1: 3.18,
      Power2: 6.064,
      PF1: 0.334,
      PF2: 0.441,
    },
    {
      t: "2025-09-10T02:51:34.965Z",
      Current1: 0.0785,
      Current2: 0.0722,
      Voltage1: 228.636,
      Voltage2: 228.903,
      Energy1: 15,
      Energy2: 50,
      Power1: 7.956,
      Power2: 7.07,
      PF1: 0.342,
      PF2: 0.388,
    },
    {
      t: "2025-09-10T02:51:34.965Z",
      Current1: 0.0525,
      Current2: 0.078,
      Voltage1: 228.223,
      Voltage2: 229.74,
      Energy1: 16,
      Energy2: 52,
      Power1: 5.343,
      Power2: 7.053,
      PF1: 0.448,
      PF2: 0.393,
    },
    {
      t: "2025-09-10T02:51:34.965Z",
      Current1: 0.0533,
      Current2: 0.0777,
      Voltage1: 228.236,
      Voltage2: 230.056,
      Energy1: 19,
      Energy2: 55,
      Power1: 5.4,
      Power2: 7.226,
      PF1: 0.444,
      PF2: 0.395,
    },
    {
      t: "2025-09-10T02:51:34.965Z",
      Current1: 0.0558,
      Current2: 0.0412,
      Voltage1: 228.25,
      Voltage2: 229.04,
      Energy1: 21,
      Energy2: 57,
      Power1: 5.58,
      Power2: 7.4,
      PF1: 0.44,
      PF2: 0.39,
    },
  ];

  return (
    <div className="grid gap-2">
      <Card className="p-4 w-fit h-fit">
        <Tabs
          defaultValue="mach1"
          className="grid grid-cols-1 w-fit gap-2 h-fit"
        >
          <div className="col-span-3 h-fit flex justify-between w-full">
            <h3 className="font-bold">Electrical Monitoring</h3>
            <TabsList>
              <TabsTrigger value="mach1">Machine 1</TabsTrigger>
              <TabsTrigger value="mach2">Machine 2</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="mach1"
            className="grid grid-cols-3 w-fit gap-2 h-fit data-[state=inactive]:hidden"
            forceMount
          >
            <div className="grid w-[220px] place-items-center bg-zinc-50 shadow-sm rounded">
              <KV k="Conveyor Power" />
              <AnalogGaugeWrapper
                label="Watt"
                value={chartData[5].Power1} //{live.Power1}
                min="0"
                max="12"
                min-label="Low"
                max-label="High"
                values="7"
                className="w-[200px]"
                style={{
                  "--analog-gauge-value-mark-fs": "6cqi",
                  "--analog-gauge-value-mark-asr": "1",
                  "--analog-gauge-bg":
                    "#14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #F7931E, #F7931E, #F7931E, #FF0000, #FF0000 var(--analog-gauge-range), #0000 0 var(--analog-gauge-range)",
                }}
              />
            </div>
            <div className="col-span-2 grid bg-zinc-50 shadow-sm rounded">
              <KV
                k="Conveyor Current"
                v={chartData[5].Current1}
                unit="A"
                val={true}
              />
              <MiniChart
                data={chartData}
                dataKey="Current1"
                label="Current"
                axisStateX={true}
                axisStateY={true}
              />
            </div>
            <div className="grid w-[220px] place-items-center bg-zinc-50 shadow-sm rounded">
              {/* <Temperature /> */}
              <KV k="Conveyor Power Factor" />
              <AnalogGaugeWrapper
                label="%"
                value={chartData[5].PF1 * 100} //{live.PF1 * 100}
                min="0"
                max="80"
                min-label="Low"
                max-label="High"
                values="7"
                className="w-[200px]"
                style={{
                  "--analog-gauge-value-mark-fs": "6cqi",
                  "--analog-gauge-value-mark-asr": "1",
                  "--analog-gauge-bg":
                    "#14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #F7931E, #F7931E, #F7931E, #FF0000, #FF0000 var(--analog-gauge-range), #0000 0 var(--analog-gauge-range)",
                }}
              />
            </div>
            <div className="grid bg-zinc-50 shadow-sm rounded grid-rows-3">
              <KV k="Conveyor Total Energy" />
              <div className="h-full font-bold text-6xl text-emerald-400 flex items-center justify-center">
                {chartData[5].Energy1}
                {/* {live.Energy1} */}
              </div>
              <div className="h-full font-semibold text-3xl flex items-center justify-center">
                Wh
              </div>
            </div>
            <div className="grid bg-zinc-50 shadow-sm rounded grid-rows-[fit_full]">
              <KV k="Conveyor Voltage" v={chartData[5].Voltage1} />
              <MiniChartArea
                data={chartData}
                dataKey="Voltage1"
                label="Voltage"
              />
              <div className="absolute h-[248px] w-[220px] flex items-center justify-center">
                <div className="grid grid-rows-3 h-full w-full">
                  <div></div>
                  <div className="h-full font-bold text-6xl text-emerald-400 flex items-center justify-center">
                    {chartData[5].Voltage1}
                    {/* {live.Energy1} */}
                  </div>
                  <div className="h-full font-semibold text-3xl flex items-center justify-center">
                    V
                  </div>
                </div>
              </div>
            </div>
            <div className="grid bg-zinc-50 shadow-sm rounded grid-rows-[fit_full]">
              <KV k="Temperature" v={chartData[5].Voltage1} />
              <Temperature />
            </div>
          </TabsContent>

          <TabsContent
            value="mach2"
            className="grid grid-cols-3 w-fit gap-2 h-fit data-[state=inactive]:hidden"
            forceMount
          >
            <div className="grid w-[220px] place-items-center bg-zinc-50 shadow-sm rounded">
              <KV k="Conveyor Power" />
              <AnalogGaugeWrapper
                label="Watt"
                value={chartData[5].Power2} //{live.Power1}
                min="0"
                max="12"
                min-label="Low"
                max-label="High"
                values="7"
                className="w-[200px]"
                style={{
                  "--analog-gauge-value-mark-fs": "6cqi",
                  "--analog-gauge-value-mark-asr": "1",
                  "--analog-gauge-bg":
                    "#14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #F7931E, #F7931E, #F7931E, #FF0000, #FF0000 var(--analog-gauge-range), #0000 0 var(--analog-gauge-range)",
                }}
              />
            </div>
            <div className="col-span-2 grid bg-zinc-50 shadow-sm rounded">
              <KV
                k="Conveyor Current"
                v={chartData[5].Current2}
                unit="A"
                val={true}
              />
              <MiniChart
                data={chartData}
                dataKey="Current2"
                label="Current"
                axisStateX={true}
                axisStateY={true}
              />
            </div>
            <div className="grid w-[220px] place-items-center bg-zinc-50 shadow-sm rounded">
              <KV k="Conveyor Power Factor" />
              <AnalogGaugeWrapper
                label="%"
                value={chartData[5].PF2} //{live.PF1 * 100}
                min="0"
                max="80"
                min-label="Low"
                max-label="High"
                values="7"
                className="w-[200px]"
                style={{
                  "--analog-gauge-value-mark-fs": "6cqi",
                  "--analog-gauge-value-mark-asr": "1",
                  "--analog-gauge-bg":
                    "#14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #F7931E, #F7931E, #F7931E, #FF0000, #FF0000 var(--analog-gauge-range), #0000 0 var(--analog-gauge-range)",
                }}
              />
            </div>
            <div className="grid bg-zinc-50 shadow-sm rounded grid-rows-3">
              <KV k="Conveyor Total Energy" />
              <div className="h-full font-bold text-6xl text-emerald-400 flex items-center justify-center">
                {chartData[5].Energy2}
                {/* {live.Energy1} */}
              </div>
              <div className="h-full font-semibold text-3xl flex items-center justify-center">
                Wh
              </div>
            </div>
            <div className="grid bg-zinc-50 shadow-sm rounded grid-rows-[fit_full]">
              <KV k="Conveyor Voltage" v={chartData[5].Voltage2} />
              <MiniChartArea
                data={chartData}
                dataKey="Voltage2"
                label="Voltage"
              />
              <div className="absolute h-[248px] w-[220px] flex items-center justify-center">
                <div className="grid grid-rows-3 h-full w-full">
                  <div></div>
                  <div className="h-full font-bold text-6xl text-emerald-400 flex items-center justify-center">
                    {chartData[5].Voltage2}
                  </div>
                  <div className="h-full font-semibold text-3xl flex items-center justify-center">
                    V
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
