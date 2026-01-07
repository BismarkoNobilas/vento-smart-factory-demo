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
import { useNotificationStore } from "@/stores/useNotificationStore";
import AlertOverlay from "@/components/custom/AlertOverlay";

import { useEffect, useRef } from "react";
import { evaluateAlarms } from "@/lib/evauateAlarm";

export default function ControlPage() {
  const { live, pump, conv, tv } = useApp();

  const logData3 = [
    { start: "07:00", end: "12:00", status: "STOP" },
    { start: "12:00", end: "19:00", status: "RUNNING" },
    // { start: "15:00", end: "20:00", status: "RUNNING" },
    // { start: "20:00", end: "21:00", status: "WARNING" },
    // { start: "21:00", end: "23:30", status: "RUNNING" },
  ];

  const VIBRATION_WARNING = 3200;
  const VIBRATION_CRITICAL = 5000;

  const lastLevelsRef = useRef({});

  useEffect(() => {
    if (!tv.length) return;

    const latest = tv[tv.length - 1];

    evaluateAlarms(
      {
        vibrationX: latest.vibrationX,
        vibrationY: latest.vibrationY,
        vibrationZ: latest.vibrationZ,
        temperature: latest.temperature,
        V1: live.V1,
        C1: live.C1,
      },
      lastLevelsRef
    );
  }, [tv, live]);

  function getVibrationWarning(tv = []) {
    if (!tv.length) {
      return { warning: "NONE", warningColor: "bg-green-500" };
    }

    const latest = tv[tv.length - 1];

    const values = [
      latest.vibrationX ?? 0,
      latest.vibrationY ?? 0,
      latest.vibrationZ ?? 0,
    ];

    if (values.some((v) => v > VIBRATION_CRITICAL)) {
      return { warning: "CRITICAL", warningColor: "bg-red-600" };
    }

    if (values.some((v) => v > VIBRATION_WARNING)) {
      return { warning: "WARNING", warningColor: "bg-yellow-400" };
    }

    return { warning: "NONE", warningColor: "bg-green-500" };
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
          value: fmt(live.V1),
          unit: "V",
        },
        {
          type: "metric",
          title: "Current",
          value: fmt(live.C1),
          unit: "A",
        },
        {
          type: "chart",
          title: "Current",
          data: conv,
          dataKey: "current",
          unit: "A",
        },
        {
          type: "metric",
          title: "Power",
          value: fmt(live.P1),
          unit: "w",
        },
        { type: "metric", title: "Energy", value: fmt(live.E1), unit: "wh" },
        {
          type: "metric",
          title: "Frequensi",
          value: fmt(live.Q1),
          unit: "hz",
        },
        { type: "temperature", value: fmt(live.Temp) },
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
      {/* <AlertOverlay /> */}
      <Card className="p-4 mx-3 my-1 h-full flex flex-col items-center gap-4">
        <h3 className="font-bold text-2xl">
          Machine Electrical Monitoring Demokit
        </h3>
        <div className="grid grid-cols-1">
          {/* One machine card only */}
          {/* <MachineCard
            title="Smart Factory Machine"
            data={machine5Data}
            index={0}
          /> */}
          {/* <div className="w-auto h-fit">
            <Card></Card>
          </div> */}

          {/* Render Motors */}
          <div className="">
            {machine5Data.map((motor, motorIdx) => (
              <div
                key={motorIdx}
                className="grid grid-cols-6 gap-3 p-4 w-auto max-h-[95vh] mx-auto border-b-2"
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
