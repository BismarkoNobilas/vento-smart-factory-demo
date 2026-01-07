"use client";

import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/card";

import MachineCard from "@/components/cards/MachineCard";
import RunTimeCard from "@/components/cards/RunTimeCard";
import TemperatureCard from "@/components/cards/TemperatureCard";
import GaugeCard from "@/components/cards/GaugeCard";
import MiniChartCard from "@/components/cards/MiniChartCard";
import MetricCard from "@/components/cards/MetricCard";
import MiniChart from "@/components/custom/MiniChart.client";
import { fmt } from "@/lib/numFormat";
import MachineTimelineBig from "@/components/custom/MachineTimelineBig";

export default function PreventfPage() {
  const { live, pump, conv, tv } = useApp();

  const logData3 = [
    { start: "07:00", end: "12:00", status: "STOP" },
    { start: "12:00", end: "15:00", status: "RUNNING" },
    { start: "15:00", end: "20:00", status: "WARNING" },
    { start: "20:00", end: "21:00", status: "STOP" },
    // { start: "21:00", end: "23:30", status: "RUNNING" },
  ];

  const timelineLabels = ["07:00", "15:00", "23:00", "07:00"];
  function getVibrationWarning(tv = []) {
    if (!tv.length) {
      return {
        warning: "NONE",
        warningColor: "bg-green-500",
      };
    }

    // get latest tv point (most recent)
    const latest = tv[tv.length - 1];

    const values = [
      latest.vibrationX ?? 0,
      latest.vibrationY ?? 0,
      latest.vibrationZ ?? 0,
    ];

    if (values.some((v) => v > 3000)) {
      return {
        warning: "CRITICAL",
        warningColor: "bg-red-600",
      };
    }

    if (values.some((v) => v > 2000)) {
      return {
        warning: "WARNING",
        warningColor: "bg-yellow-400",
      };
    }

    return {
      warning: "NONE",
      warningColor: "bg-green-500",
    };
  }

  const vibrationWarning = getVibrationWarning(tv);
  // Render individual cards
  const renderCard = (item, idx) => {
    switch (item.type) {
      case "runtime":
        return (
          <div key={idx} className="col-span-2">
            <RunTimeCard
              key={idx}
              logs={item.logs}
              title={item.title}
              status={item.status}
              statusColor={item.statusColor}
              warning={item.warning}
              warningColor={item.warningColor}
              className={item.className}
            />
          </div>
        );

      case "temperature":
        return <TemperatureCard key={idx} value={item.value} />;

      case "gauge":
        return (
          <GaugeCard
            key={idx}
            title={item.title}
            value={item.value}
            unit={item.unit}
            min={item.min}
            max={item.max}
          />
        );

      case "chart":
        return (
          <div key={idx} className="col-span-2">
            <MiniChartCard
              key={idx}
              title={item.title}
              data={item.data}
              dataKey={item.dataKey}
              unit={item.unit}
            />
          </div>
        );

      case "metric":
        return (
          <MetricCard
            key={idx}
            title={item.title}
            value={item.value}
            unit={item.unit}
            chart={item.chart}
          />
        );

      default:
        return null;
    }
  };

  // Machine demo/live combined data
  const machine5Data = [
    {
      id: "Motor 1",
      cards: [
        {
          type: "runtime",
          logs: logData3,
          title: "Motor 1",
          status: "Running",
          statusColor: "bg-green-500",
          warning: vibrationWarning.warning,
          warningColor: vibrationWarning.warningColor,
          className: "col-span-2",
        },
        {
          type: "metric",
          title: "Voltage",
          value: fmt(live.V1 + 220),
          unit: "V",
        },
        {
          type: "metric",
          title: "Current",
          value: 0.31,
          unit: "A",
        },
        {
          type: "chart",
          title: "Current",
          data: conv,
          dataKey: "current",
          unit: "A",
        },
        { type: "metric", title: "Power", value: live.P1 - 870, unit: "w" },
        { type: "metric", title: "Energy", value: live.E1 - 9272, unit: "wh" },
        {
          type: "metric",
          title: "Frequensi",
          value: live.Q1 + 50,
          unit: "hz",
        },
        { type: "temperature", value: live?.Temp * 0.01 },
        {
          type: "chart",
          title: "Temperature",
          data: tv,
          dataKey: "temperature",
          unit: "C",
        },
        {
          type: "chart",
          title: "VibrationX",
          data: tv,
          dataKey: "vibrationX",
          unit: "mm/s",
        },
        {
          type: "chart",
          title: "VibrationY",
          data: tv,
          dataKey: "vibrationY",
          unit: "mm/s",
        },
        {
          type: "chart",
          title: "VibrationZ",
          data: tv,
          dataKey: "vibrationZ",
          unit: "mm/s",
        },
      ],
    },
  ];

  return (
    <main className="flex-1 p-1 overflow-auto">
      <Card className="p-4 mx-3 my-1 h-full flex flex-col items-center gap-4">
        {/* <h3 className="font-bold text-2xl">
          Machine Electrical Monitoring Demokit
        </h3> */}
        <div className="grid grid-cols-1 gap-5">
          {/* One machine card only */}
          <div className="w-auto h-fit flex gap-4 justify-center place-items-center">
            <Card className="p-6 w-auto h-fit bg-zinc-50">
              <div className="grid gap-3">
                <h3 className="text-2xl font-semibold">Machine Information</h3>
                <div className="grid grid-cols-2 text-lg">
                  <h4 className="font-light">Nama Mesin</h4>
                  <h4 className="text-center">DemoKit Machine</h4>
                  <h4 className="font-light">ID Mesin</h4>
                  <h4 className="text-center">DK01</h4>
                  <h4 className="font-light">Banyak Motor</h4>
                  <h4 className="text-center">1</h4>
                </div>
              </div>
            </Card>
            <Card className="p-6 w-auto h-fit bg-zinc-50">
              <div className="grid gap-3">
                <h3 className="text-2xl font-semibold">
                  Performa Mesin DemoKit
                </h3>
                <div className="flex gap-5">
                  <Card className="p-0 gap-0 h-fit w-auto">
                    <h3 className="text-xl px-6 py-2 font-semibold">
                      Status Machine
                    </h3>
                    <h3 className="bg-red-500 text-amber-50 text-3xl font-extrabold px-20 py-2 text-center">
                      STOP
                    </h3>
                  </Card>
                  <Card className="p-0 gap-0 h-fit w-auto">
                    <h3 className="text-xl px-6 py-2 font-semibold">
                      Peringatan
                    </h3>
                    <h3 className="bg-yellow-400 text-amber-50 text-3xl font-extrabold px-20 py-2 text-center">
                      Perbaikan V-Belt
                    </h3>
                  </Card>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Card className="gap-0 place-items-center p-3 h-fit w-auto">
                    <h4>Lama berjalan</h4>
                    <h4 className="font-bold text-center">00:23:15:13</h4>
                  </Card>
                  <Card className="gap-0 place-items-center p-3 h-fit w-auto">
                    <div className="grid">
                      <h4>Motor Rusak</h4>
                      <h4 className="font-bold text-center">1</h4>
                    </div>
                  </Card>
                  <Card className="gap-0 place-items-center p-3 h-fit w-auto">
                    <div className="grid">
                      <h4>Peringatan</h4>
                      <h4 className="font-bold text-center">1</h4>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
          <div>
            {/* Legend */}
            <div className="flex gap-2 mt-1 text-[14px]">
              <span className="flex items-center gap-1">
                <span className="w-5 h-5 bg-green-500"></span> RUNNING
              </span>
              <span className="flex items-center gap-1">
                <span className="w-5 h-5 bg-yellow-400"></span> WARNING
              </span>
              <span className="flex items-center gap-1">
                <span className="w-5 h-5 bg-red-500"></span> STOP
              </span>
            </div>
            {/* Timeline */}
            <div className="mt-1">
              <MachineTimelineBig logs={logData3} />
              <div className="flex justify-between text-[15px]">
                {timelineLabels.map((label, i) => (
                  <span key={i}>{label}</span>
                ))}
              </div>
            </div>
          </div>
          <Card className="bg-zinc-50 grid p-6 gap-2">
            <h3 className="text-2xl font-semibold">Peventive Maintenance</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card className="grid gap-0 p-0 w-auto">
                <h3 className="p-2 font-bold text-center">Timming Belt</h3>
                <div className="grid grid-cols-2 gap-3 px-3">
                  <h4>Running Time/Live Time</h4>
                  <h4 className="text-right">
                    <span className="text-green-500">41</span>/5000 Jam
                  </h4>
                  <h4>Date Estimate</h4>
                  <h4 className="text-right">
                    <span className="text-green-500">04/06/2026</span>
                  </h4>
                </div>
                <h3 className="p-3 text-xl text-center">
                  Status:
                  <span className="px-4 bg-green-500 text-white font-bold mx-2">
                    OKE
                  </span>
                </h3>
              </Card>
              <Card className="grid gap-0 p-0 w-auto">
                <h3 className="p-2 font-bold text-center">V-Belt</h3>
                <div className="grid grid-cols-2 gap-3 px-3">
                  <h4>Running Time/Live Time</h4>
                  <h4 className="text-right">
                    <span className="text-yellow-400">4578</span>/5000 Jam
                  </h4>
                  <h4>Date Estimate</h4>
                  <h4 className="text-right">
                    <span className="text-yellow-400">28/12/2025</span>
                  </h4>
                </div>
                <h3 className="p-3 text-xl text-center">
                  Status:
                  <span className="px-4 bg-yellow-400 text-white font-bold mx-2">
                    REPAIR
                  </span>
                </h3>
              </Card>
              <Card className="grid gap-0 p-0 w-auto">
                <h3 className="p-2 font-bold text-center">Bearing</h3>
                <div className="grid grid-cols-2 gap-3 px-3">
                  <h4>Running Time/Live Time</h4>
                  <h4 className="text-right">
                    <span className="text-green-500">171</span>/5000 Jam
                  </h4>
                  <h4>Date Estimate</h4>
                  <h4 className="text-right">
                    <span className="text-green-500">24/05/2026</span>
                  </h4>
                </div>
                <h3 className="p-3 text-xl text-center">
                  Status:
                  <span className="px-4 bg-green-500 text-white font-bold mx-2">
                    OKE
                  </span>
                </h3>
              </Card>
            </div>
          </Card>

          {/* Render Motors */}
          {/* <div className="">
            {machine5Data.map((motor, motorIdx) => (
              <div
                key={motorIdx}
                className="grid grid-cols-6 gap-3 p-4 w-auto max-h-[95vh] mx-auto border-b-2"
              >
                {motor.cards.map((item, i) => renderCard(item, i))}
              </div>
            ))}
          </div> */}
        </div>
      </Card>
    </main>
  );
}
