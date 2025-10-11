"use client";
import MachineControlCard from "./MachineControlCard";
import PumpCard from "./PumpCard";
import RunTimeCard from "./RunTimeCard";
import GaugeCard from "./GaugeCard";
import MiniChartCard from "./MiniChartCard";
import MetricCard from "./MetricCard";
import MiniChart from "../custom/MiniChart";
import TemperatureCard from "./TemperatureCard";
import { machineStatuses, motorStatuses } from "@/data/demoData";
import MachineStatusCard from "./MachineStatusCard";

import React from "react";

export default function MachineCard({
  type = "machine", // "machine" or "pump"
  monitoring = "Machine1",
  title,
  data = [],
  motors = [], // array of card objects to render below the top
}) {
  // choose top card
  const TopCard =
    type === "machine" ? MachineControlCard : type === "pump" ? PumpCard : null;

  // helper to render card by type
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
            height={item.height}
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

  return (
    <div className="grid grid-cols-[max-content_1fr] gap-3 w-full p-4 h-full">
      {/* --- top section --- */}
      <div className="grid w-full h-fit gap-4">
        {TopCard && (
          <TopCard
            id={monitoring}
            title={title || `${monitoring}`}
            data={data}
          />
        )}
        <div className="flex justify-center">
          <MachineStatusCard machines={motorStatuses} />
        </div>
        <div className="grid gap-2">
          {motors.map((motor, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[100px_1fr] border border-black rounded-sm p-2"
            >
              {/* Left side: Motor label */}
              <div className="flex items-center justify-center font-bold text-sm">
                MOTOR {idx + 1}
              </div>

              {/* Right side: Metrics */}
              <div className="grid grid-rows-3 border-l border-dotted border-black pl-3">
                {/* Power */}
                <div className="flex justify-between items-center">
                  <span className="text-[13px]">Power/Ampere Meter</span>
                  <span className="font-bold text-green-500 text-[13px]">
                    {motor.current ?? "--"}{" "}
                    <span className="text-black">A</span>
                  </span>
                </div>

                {/* Temperature */}
                <div className="flex justify-between items-center">
                  <span className="text-[13px]">Temperature</span>
                  <span className="font-bold text-green-500 text-[13px]">
                    {motor.temp ?? "--"} <span className="text-black">°C</span>
                  </span>
                </div>

                {/* Vibration */}
                <div className="flex justify-between items-center">
                  <span className="text-[13px]">Vibration</span>
                  <span className="font-bold text-green-500 text-[13px]">
                    {motor.vibration ?? "--"}{" "}
                    <span className="text-black">mm/s</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid-cols-3 gap-3 hidden">
        {/* --- dynamic content --- */}
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`col-span-${
              item.colSpan || 1
            } w-full h-full flex justify-center items-center`}
          >
            {renderCard(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}
