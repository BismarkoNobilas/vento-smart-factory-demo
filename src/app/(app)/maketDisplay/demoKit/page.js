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
import { useState } from "react";

export default function DemoKitPage() {
  const { live, pump, conv, runtime, connection } = useApp();
  // console.log("🟢 RUNTIME IN PAGE:", mapRuntimeForTimeline(runtime));
  // console.log("🟢 LIVE IN PAGE:", live);
  const { production, oee, quantity, water } = useDemoData();
  const [category, setCategory] = useState("");
  const [subReason, setSubReason] = useState("");
  const [customReason, setCustomReason] = useState("");

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

  async function handleStart() {
    await fetch("/api/manual/start", { method: "POST" });
  }

  async function handleStop(reason) {
    await fetch("/api/manual/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
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
    });
  }
  const STOP_REASONS = ["Normal Stop", "Maintenance", "Other"];
  const Mt_REASONS = [
    //maintanance reasons
    "Monthly check",
    "Cleaning",
    "Lubrication",
    "Material jam",
    "Overheat",
    "Sensor error",
    "Power issue",
    "Other",
  ];

  const OK_REASONS = ["Normal Stop"];

  const WARNING_REASONS = [
    "Maintenance",
    "Monthly check",
    "Cleaning",
    "Lubrication",
  ];

  const CRITICAL_REASONS = [
    "Material jam",
    "Overheat",
    "Sensor error",
    "Power issue",
  ];
  function warningColor(status) {
    if (!status) return "bg-zinc-400";

    if (OK_REASONS.includes(status)) return "bg-green-500";
    if (CRITICAL_REASONS.includes(status)) return "bg-red-500";
    if (WARNING_REASONS.includes(status)) return "bg-yellow-400";
    // "Other" or unknown
    return "bg-yellow-400";
  }

  function handleStopConfirm() {
    if (!reason) {
      alert("Please select a reason");
      return;
    }

    // sendToPLC("00");
    // handleStop(reason);

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
  function OnOff({ on }) {
    return (
      <span
        className={`px-2 py-1 text-xs font-bold rounded ${
          on ? "bg-green-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {on ? "ON" : "OFF"}
      </span>
    );
  }
  function getLatestRuntime(runtime = []) {
    if (!runtime.length) return null;
    return runtime[runtime.length - 1];
  }
  function statusColor(status) {
    switch (status) {
      case "RUNNING":
        return "bg-green-500";
      case "WARNING":
        return "bg-yellow-400";
      case "STOP":
        return "bg-red-500";
      case "DISCONNECTED":
        return "bg-gray-500";
      default:
        return "bg-zinc-400";
    }
  }
  const latest = getLatestRuntime(runtime);

  function status(status) {
    if (!status) return;
    if (status === 1) return "RUNNING";
    if (status === 0) return "STOP";
    return "UNKNOWN";
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
          title: "Motor",
          status: status(live.conv1) || "N/A",
          statusColor: statusColor(latest?.status) || "bg-zinc-400",
          warning: latest?.reason || "Normal",
          warningColor: warningColor(latest?.reason) || "bg-zinc-400",
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
                    <TitleBlock title="Status Machine" showValue={false} />
                  </div>
                  <div>
                    <button
                      className={`${live.conv1 === 1 ? "bg-green-500" : "bg-gray-400"} rounded px-3 py-1 text-white `}
                      onClick={() => {
                        sendToPLC("011");
                        // handleStart();
                      }}
                    >
                      ON
                    </button>
                  </div>
                  <div>
                    <button
                      className={`${live.conv1 === 0 ? "bg-red-500" : "bg-gray-400"} rounded px-3 py-1 text-white `}
                      onClick={() => {
                        sendToPLC("000");
                        setShowReason(true);
                      }}
                    >
                      OFF
                    </button>
                  </div>
                </div>
                {showReason && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg w-[360px] p-4 grid gap-3">
                      <h3 className="text-lg font-semibold text-center">
                        Machine Has Stopped!!!
                      </h3>

                      <p className="text-sm text-gray-600">
                        Please select stop reason:
                      </p>

                      {/* Main category */}
                      <select
                        className="border rounded px-2 py-1"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setSubReason("");
                          setCustomReason("");
                        }}
                      >
                        <option value="">Select category</option>
                        {STOP_REASONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>

                      {/* Maintenance reasons */}
                      {category === "Maintenance" && (
                        <select
                          className="border rounded px-2 py-1"
                          value={subReason}
                          onChange={(e) => setSubReason(e.target.value)}
                        >
                          <option value="">Select maintenance reason</option>
                          {Mt_REASONS.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* Other input */}
                      {category === "Other" && (
                        <input
                          className="border rounded px-2 py-1"
                          placeholder="Enter reason..."
                          value={customReason}
                          onChange={(e) => setCustomReason(e.target.value)}
                        />
                      )}

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                          onClick={() => {
                            setCategory("");
                            setSubReason("");
                            setCustomReason("");
                            setShowReason(false);
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                          disabled={
                            !category ||
                            (category === "Maintenance" && !subReason) ||
                            (category === "Other" && !customReason)
                          }
                          onClick={handleStopConfirm}
                        >
                          Confirm Stop
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
        </div>
      </Card>
    </main>
  );
}
