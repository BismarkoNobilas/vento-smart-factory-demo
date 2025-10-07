"use client";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import AnalogGaugeWrapper from "@/components/layout/AnalogGaugeWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Temperature from "../custom/Temperature";
import TemperatureCard from "./TemperatureCard";
import MetricCard from "./MetricCard";
import GaugeCard from "./GaugeCard";
import MiniChartCard from "./MiniChartCard";
import { chartData } from "@/data/demoData";
import MiniChart from "../custom/MiniChart";

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

// function MiniChart({
//   data,
//   dataKey,
//   label,
//   axisStateX,
//   axisStateY,
//   domainAdd,
// }) {
//   const config = {
//     [dataKey]: {
//       label,
//       color: "#3b82f6",
//     },
//   };

//   // Hybrid Y-axis domain: ignore zeros for scaling
//   const getDomain = () => [
//     () => {
//       const nonZero = data.map((d) => d[dataKey]).filter((v) => v > 0);
//       if (nonZero.length === 0) return 0;
//       return Math.min(...nonZero) - 2;
//     },
//     () => {
//       const nonZero = data.map((d) => d[dataKey]).filter((v) => v > 0);
//       if (nonZero.length === 0) return 10;
//       return Math.max(...nonZero) + 2;
//     },
//   ];

//   return (
//     <ChartContainer config={config} className="aspect-auto rounded-md h-full">
//       <AreaChart data={data}>
//         {axisStateX && (
//           <XAxis
//             dataKey="t"
//             tickMargin={5}
//             tickFormatter={(v) =>
//               new Date(v).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: false,
//               })
//             }
//           />
//         )}
//         {axisStateY && <YAxis width={38} />} {/* domain={getDomain()} */}
//         <ChartTooltip content={<ChartTooltipContent />} />
//         <defs>
//           <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="20%" stopColor="#14E240" stopOpacity={0.8} />
//             <stop offset="80%" stopColor="#b0ebbc" stopOpacity={0.8} />
//           </linearGradient>
//         </defs>
//         <Area
//           type="monotone"
//           dataKey={dataKey}
//           stroke="#3b82f6"
//           fill="url(#fill)"
//           fillOpacity={0.7}
//           strokeWidth={1}
//           dot={false}
//         />
//       </AreaChart>
//     </ChartContainer>
//   );
// }

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
            <GaugeCard
              title="Conveyor Power"
              value={chartData[5].Power1} // or live.Power1
              unit="Watt"
              min={0}
              max={12}
            />
            <div className="col-span-2">
              <MiniChartCard
                title="Conveyor Current"
                data={chartData}
                dataKey="Current1"
                unit="A"
                height="h-[300px]"
              />
            </div>

            <GaugeCard
              title="Conveyor Power Factor"
              value={chartData[5].PF1 * 100} // or live.PF1 * 100
              unit="%"
              min={0}
              max={80}
            />
            <MetricCard
              title="Conveyor Total Energy"
              value={chartData[5].Energy1}
              unit="Wh"
            />
            <MetricCard
              title="Conveyor Voltage"
              value={chartData[5].Voltage1}
              unit="V"
              chart={
                <MiniChart
                  data={chartData}
                  dataKey="Voltage1"
                  label="Voltage"
                  domainAdd={5}
                />
              }
            />

            <TemperatureCard value={chartData[5].Voltage1} />
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
