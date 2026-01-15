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
import { fmt } from "@/lib/numFormat";
import TitleBlock from "@/components/custom/TitleBlock";
import useDemoData from "@/hooks/useDemoData";
import WaterTankImage from "@/components/custom/WaterTankImage";
import { getClient } from "@/lib/getClient";
import RuntimeHistoryTable from "@/components/custom/RuntimeHistoryTable";
import { manualStart, manualStop } from "@/lib/state";
import { useState } from "react";

export default function DemoKitPage() {
  const { live, pump, conv, runtime, connection } = useApp();
  // console.log("🟢 RUNTIME IN PAGE:", mapRuntimeForTimeline(runtime));
  const { production, oee, quantity, water } = useDemoData();
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");

  async function sendToPLC(binary) {
    const dec = binaryToDecimal(binary); // 20
    const payload = padZero(dec, 2);
    console.log("Sending to PLC (decimal):", dec);

    await fetch("/api/mqtt/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: "/PLCMaketSV",
        message: payload,
      }),
    });
  }
  function padZero(value, length = 2) {
    return String(value).padStart(length, "0");
  }

  function binaryToDecimal(binStr) {
    if (!/^[01]+$/.test(binStr)) {
      throw new Error("Invalid binary string");
    }
    return parseInt(binStr, 2);
  }

  function toHHMM(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC", // Ensures it stays 13:00 regardless of your local time zone
    });
  }
  const STOP_REASONS = [
    "Material jam",
    "Maintenance",
    "Overheat",
    "Sensor error",
    "Power issue",
    "Other",
  ];

  function handleStopConfirm() {
    if (!reason) {
      alert("Please select a reason");
      return;
    }

    sendToPLC("000");
    manualStop(reason);

    setShowReason(false);
    setReason("");
  }
  function mapRuntimeForTimeline(runtime) {
    // console.log("Mapping runtime for timeline:", runtime);
    return runtime.map((r) => ({
      start: toHHMM(r.start),
      end: toHHMM(r.end),
      status: r.status,
    }));
  }
  // Render individual cards
  const renderCard = (item, idx) => {
    switch (item.type) {
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
          logs: mapRuntimeForTimeline(runtime),
          title: "Motor 1",
          status: "RUNNING",
          statusColor: "bg-green-500",
          warning: "OK",
          warningColor: "bg-green-500",
          className: "col-span-2",
        },
        {
          type: "metric",
          title: "Voltage",
          value: fmt(live.V1),
          unit: "V",
        },
        {
          type: "chart",
          title: "Voltage",
          data: conv,
          dataKey: "voltage",
          unit: "V",
        },
        { type: "metric", title: "Energy", value: fmt(live.E1), unit: "wh" },

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
          title: "Frequensi",
          value: fmt(live.F1),
          unit: "hz",
        },
        {
          type: "gauge",
          title: "Power",
          value: fmt(live.P1),
          unit: "Watt",
          min: 0,
          max: 26,
        },
        {
          type: "chart",
          title: "Power",
          data: conv,
          dataKey: "power",
          unit: "w",
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
          <div className="justify-items-center">
            <MachineCard
              title="Smart Factory Machine"
              data={machine5Data}
              index={0}
            />
            <div className="grid grid-cols-3 h-fit place-items-start justify-items-center gap-2 mt-3 w-fit">
              <Card className="p-0 gap-0 m-0">
                <div className="grid grid-cols-2 gap-2 p-2 w-fit mx-auto">
                  <div className="col-span-2">
                    <TitleBlock title="Machine" showValue={false} />
                  </div>
                  <div>
                    <button
                      className="bg-green-400 rounded px-3 py-1 text-white"
                      onClick={() => {
                        sendToPLC("011");
                        manualStart();
                      }}
                    >
                      ON
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-red-400 rounded px-3 py-1 text-white"
                      onClick={() => setShowReason(true)}
                    >
                      OFF
                    </button>
                  </div>
                </div>
              </Card>
              <div className="bg-zinc-50 shadow-sm rounded p-2 m-0 w-fit">
                <TitleBlock title="Total Bottle" showValue={false} />
                <div className="flex justify-between items-center p-2">
                  <img src="/water-bottle2.svg" className="h-[100px]" />
                  <div className="grid w-fit p-1">
                    <div className="font-bold text-[22px] text-blue-600 text-center">
                      {quantity}
                    </div>
                    <div className="font-semibold text-[15px] text-center">
                      bottle
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 shadow-sm rounded p-2 w-fit">
                <TitleBlock title="Total Box" showValue={false} />
                <div className="flex justify-between items-center p-2">
                  <img src="/boxicon.png" className="w-[60px]" />
                  <div className="grid w-fit p-1">
                    <div className="font-bold text-[22px] text-blue-600 text-center">
                      {fmt(quantity / 12, 0)}
                    </div>
                    <div className="font-semibold text-[15px] text-center">
                      Box
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <RuntimeHistoryTable data={runtime} />
            </div>
          </div>
          {/* Render Motors */}
          <div className="grid grid-cols-1 col-span-2">
            {machine5Data.map((motor, motorIdx) => (
              <div
                key={motorIdx}
                className="grid grid-cols-3 gap-3 p-4 w-[900px] h-auto mx-auto border-b-2"
              >
                {motor.cards.map((item, i) => renderCard(item, i))}
                <div>
                  <div className="bg-zinc-50 shadow-sm rounded gap-1 h-full w-auto p-2 min-h-[165px]">
                    <TitleBlock title="Water Tank Level" showValue={false} />
                    <div className="grid grid-cols-2">
                      <span className="text-[14px] font-bold z-30 text-blue-700 text-center p-1">
                        Tank 1
                      </span>
                      <span className="text-[14px] font-bold z-30 text-blue-700 text-center p-1">
                        Tank 2
                      </span>
                      <div className="h-fit">
                        <div className="relative">
                          <div className="absolute scale-100 inset-0">
                            <WaterTankImage
                              label=""
                              level={water.tank1.toFixed(1)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="h-fit">
                        <div className="relative">
                          <div className="absolute scale-100 inset-0">
                            <WaterTankImage
                              label=""
                              level={water.tank2.toFixed(1)}
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-[14px] font-medium z-30 text-neutral-700 text-center">
                        {water.tank1.toFixed(1)}%
                      </span>
                      <span className="text-[14px] font-medium z-30 text-neutral-700 text-center">
                        {water.tank2.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showReason && (
            <div className="col-span-2 mt-2 grid gap-2">
              <select
                className="border rounded px-2 py-1"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select stop reason</option>
                {STOP_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/* Optional custom input */}
              {reason === "Other" && (
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Enter reason..."
                  onChange={(e) => setReason(e.target.value)}
                />
              )}

              <div className="flex gap-2 justify-end">
                <button
                  className="px-3 py-1 text-sm border rounded"
                  onClick={() => {
                    setShowReason(false);
                    setReason("");
                  }}
                >
                  Cancel
                </button>

                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                  onClick={handleStopConfirm}
                >
                  Confirm Stop
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </main>
  );
}
