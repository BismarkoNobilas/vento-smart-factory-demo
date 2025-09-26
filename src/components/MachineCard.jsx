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
import FullRadialChart, { FullChartRadial } from "./FullRadialChart";
import MachineTimeline from "./MachineTimeline";

function KV({ k, v, unit = "", val, width = 200 }) {
  return (
    <div
      className={`p-2 rounded w-[${width}px] bg-slate-200 flex justify-${
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
    <ChartContainer
      config={config}
      className="aspect-auto rounded-md h-[140px]"
    >
      <AreaChart data={data}>
        {axisStateX && (
          <XAxis
            dataKey="t"
            tickMargin={5}
            tickFormatter={(v) => {
              const d = new Date(v);
              const hour = d.getHours().toString().padStart(2, "0");
              return `${hour}:00`; // force minutes to 00
            }}
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

export default function MachineCard({ conveyor, pump, live }) {
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
      t: "2025-09-10T03:51:34.965Z",
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
      t: "2025-09-10T04:51:34.965Z",
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
      t: "2025-09-10T05:51:34.965Z",
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
      t: "2025-09-10T06:51:34.965Z",
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
      t: "2025-09-10T07:51:34.965Z",
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
  const logs = [
    { start: "07:00", end: "14:00", status: "RUNNING" },
    { start: "14:00", end: "15:00", status: "STOP" },
    { start: "15:00", end: "20:00", status: "RUNNING" },
    { start: "20:00", end: "21:00", status: "WARNING" },
    { start: "21:00", end: "23:30", status: "RUNNING" },
  ];

  return (
    <div className="grid gap-2">
      <Card className="p-4 w-full h-fit">
        <Tabs
          defaultValue="mach1"
          className="grid grid-cols-[auto_full] w-fit gap-2 h-fit"
        >
          <div className="col-span-3 h-fit flex justify-between w-full">
            <h3 className="font-bold">Overall Equipment Effectiveness</h3>
            {/* <TabsList>
              <TabsTrigger value="mach1">Machine 1</TabsTrigger>
              <TabsTrigger value="mach2">Machine 2</TabsTrigger>
            </TabsList> */}
          </div>
          <div
            value="mach1"
            className="grid grid-cols-3 w-fit gap-2 h-fit data-[state=inactive]:hidden"
            // forceMount
          >
            <div className="grid grid-cols-[auto_auto] justify-between col-span-3 gap-4 p-3 items-center w-fit bg-zinc-50 shadow-sm rounded">
              <div className="row-span-2 grid w-fit h-fit">
                <p>OEE</p>
                <FullRadialChart
                  value={75}
                  size={200}
                  strokeWidth={14}
                  label="Overall"
                  className="flex justify-center items-center"
                />
              </div>
              <div className="flex justify-center items-center w-fit h-fit gap-3">
                <FullRadialChart
                  value={70}
                  size={120}
                  strokeWidth={10}
                  label="Quality"
                />
                <FullRadialChart
                  value={25}
                  size={120}
                  strokeWidth={10}
                  label="Performance"
                />
                <FullRadialChart
                  value={15}
                  size={120}
                  strokeWidth={10}
                  label="Availability"
                />
              </div>
              <div className="grid border-t-2">
                <p>Product Quantity</p>
                <div className="flex justify-between items-center px-8">
                  <div>
                    <div className="h-full font-bold text-3xl text-[#00aeef] flex items-center justify-center">
                      {162}
                      {/* {live.Energy1} */}
                    </div>
                    <div className="h-full font-semibold text-xs flex items-center justify-center">
                      Actual
                    </div>
                  </div>
                  <div>
                    <div className="h-full font-bold text-3xl text-[#00aeef] flex items-center justify-center">
                      {210}
                      {/* {live.Energy1} */}
                    </div>
                    <div className="h-full font-semibold text-xs flex items-center justify-center">
                      Expected
                    </div>
                  </div>
                  <div>
                    <div className="h-full font-bold text-3xl text-[#00aeef] flex items-center justify-center">
                      {300}
                      {/* {live.Energy1} */}
                    </div>
                    <div className="h-full font-semibold text-xs flex items-center justify-center">
                      Target
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="grid w-[220px] place-items-center bg-zinc-50 shadow-sm rounded">
              <KV k="Availability" />
              <AnalogGaugeWrapper
                label="%"
                value={chartData[5].PF1 * 100} //{live.PF1 * 100}
                min="0"
                max="100"
                min-label="Low"
                max-label="High"
                values="7"
                className="w-[200px]"
                style={{
                  "--analog-gauge-value-mark-fs": "6cqi",
                  "--analog-gauge-value-mark-asr": "1",
                  "--analog-gauge-bg":
                    "#FF0000, #FF0000, #FF0000, #FF0000, #FF0000, #F7931E, #F7931E, #F7931E, #14E240, #14E240, #14E240 var(--analog-gauge-range), #0000 0 var(--analog-gauge-range)",
                }}
              />
            </div> */}
            <div className="col-span-2 grid bg-zinc-50 shadow-sm rounded w-auto">
              <KV
                k="Production Rate"
                v={chartData[5].Energy1}
                unit=""
                val={true}
              />
              <MiniChart
                data={chartData}
                dataKey="Energy1"
                label="Energy"
                axisStateX={true}
                axisStateY={true}
              />
            </div>

            <div className="col-span-2 grid bg-zinc-50 shadow-sm rounded w-auto">
              <div className="p-6">
                <h2 className="font-bold">Packaging Machine</h2>

                <div className="flex gap-4 mt-2">
                  <span className="font-semibold text-[12px]">Status:</span>
                  <span className="bg-green-500 text-white px-2 text-[12px]">
                    RUNNING
                  </span>
                </div>
                <div className="flex gap-4 mt-1">
                  <span className="font-semibold text-[12px]">Peringatan:</span>
                  <span className="bg-green-500 text-white px-2 text-[12px]">
                    OKE
                  </span>
                </div>

                <div className="mt-4">
                  <MachineTimeline logs={logs} />
                  <div className="flex justify-between text-sm mt-1">
                    <span>07:00</span>
                    <span>15:00</span>
                    <span>23:00</span>
                    <span>07:00</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-green-500"></span> RUNNING
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-yellow-400"></span> PERINGATAN
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-red-500"></span> STOP
                  </span>
                </div>
              </div>
            </div>
            <div className="flex mt-auto">
              <div className="grid bg-zinc-50 shadow-sm rounded w-fit place-content-center h-fit pb-3">
                <KV k="Status" />
                <div className="flex gap-4 mt-2 px-3">
                  <span className="font-semibold text-[12px]">Machine 1:</span>
                  <span className="bg-green-500 text-white text-[12px] h-fit w-[80px] text-center">
                    RUNNING
                  </span>
                </div>
                <div className="flex gap-4 mt-2 px-3">
                  <span className="font-semibold text-[12px]">Machine 2:</span>
                  <span className="bg-red-500 text-white text-[12px] h-fit w-[80px] text-center">
                    STOP
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-auto absolute ml-[455px]">
            <video
              src="/R2-Inside-factory.webm"
              autoPlay
              loop
              muted
              playsInline // ensures it works on mobile
              className="h-[570px] mt-[35px]"
            />
          </div>

          <div className="absolute bg-zinc-50 shadow-sm rounded grid-rows-3 w-fit mt-[320px] ml-[1020px] p-1">
            <KV k="Pack Production" width={100} />
            <div className="h-fit font-bold text-2xl text-orange-400 flex items-center justify-center">
              {162}
              {/* {live.Energy1} */}
            </div>
            <div className="h-fit font-semibold text-xl flex items-center justify-center">
              Unit
            </div>
          </div>
          <div className="absolute bg-zinc-50 shadow-sm rounded grid-rows-3 w-fit mt-[150px] ml-[720px] p-1">
            <KV k="Bottle Production" width={110} />
            <div className="h-fit font-bold text-2xl text-blue-700 flex items-center justify-center">
              {1944}
              {/* {live.Energy1} */}
            </div>
            <div className="h-fit font-semibold text-xl flex items-center justify-center">
              Unit
            </div>
          </div>
          <div className="absolute w-fit mt-[205px] ml-[1148px] p-1">
            <div className="h-[80px] w-[11px] bg-green-400 -skew-y-22"></div>
          </div>
          <div className="absolute w-fit mt-[199px] ml-[1063px] p-1">
            <div className="h-[40px] w-[11px] bg-red-500 -skew-y-22"></div>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
