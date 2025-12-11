"use client";

import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/card";

import MachineCard from "@/components/cards/MachineCard";
import RunTimeCard from "@/components/cards/RunTimeCard";
import TemperatureCard from "@/components/cards/TemperatureCard";
import GaugeCard from "@/components/cards/GaugeCard";
import MiniChartCard from "@/components/cards/MiniChartCard";
import MetricCard from "@/components/cards/MetricCard";
import MiniChart from "@/components/custom/MiniChart";

import { logData3 } from "@/data/demoData";

export default function ControlPage() {
  const { live, pump, conv, tv } = useApp();

  // Render individual cards
  const renderCard = (item, idx) => {
    switch (item.type) {
      case "runtime":
        return (
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
          <MiniChartCard
            key={idx}
            title={item.title}
            data={item.data}
            dataKey={item.dataKey}
            unit={item.unit}
          />
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
          status: "WARNING",
          statusColor: "bg-yellow-400",
          warning: "WARNING",
          warningColor: "bg-yellow-400",
          className: "col-span-2",
        },
        { type: "temperature", value: live?.Temperature / 100 ?? 0 },
        {
          type: "chart",
          title: "Temperature",
          data: tv,
          dataKey: "temperature",
          unit: "C",
        },
        {
          type: "chart",
          title: "VX",
          data: tv,
          dataKey: "vibrationX",
          unit: "mm/s",
        },
        {
          type: "chart",
          title: "VY",
          data: tv,
          dataKey: "vibrationY",
          unit: "mm/s",
        },
        {
          type: "chart",
          title: "VZ",
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
        <h3 className="font-bold text-2xl">Machine Electrical Monitoring</h3>
        <div className="grid grid-cols-3">
          {/* One machine card only */}
          <MachineCard
            title="Smart Factory Machine"
            data={machine5Data}
            index={0}
          />

          {/* Render Motors */}
          <div className="grid grid-cols-1 col-span-2">
            {machine5Data.map((motor, motorIdx) => (
              <div
                key={motorIdx}
                className="grid grid-cols-3 gap-3 p-4 w-[900px] max-h-[90vh] mx-auto border-b-2"
              >
                {motor.cards.map((item, i) => renderCard(item, i))}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </main>
  );
}
