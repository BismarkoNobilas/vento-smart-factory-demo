"use client";
import React from "react";
import { Card } from "../ui/card";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import RunTimeCard from "./RunTimeCard";
import GaugeCard from "./GaugeCard";
import MiniChartCard from "./MiniChartCard";
import MetricCard from "./MetricCard";
import TemperatureCard from "./TemperatureCard";
import { logData, runtimeData } from "@/data/demoData";

export default function MachineCard({ title, data = [], index }) {
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
    <Card className="grid gap-3 w-fit p-4 h-fit bg-zinc-50 shadow-md">
      <div className="grid w-full h-fit gap-4">
        <RunTimeCard
          logs={runtimeData[index].logs}
          title={runtimeData[index].title}
          status={runtimeData[index].status}
          statusColor={runtimeData[index].statusColor}
          warning={runtimeData[index].warning}
          warningColor={runtimeData[index].warningColor}
          bgColor={runtimeData[index].bgColor}
          className={runtimeData[index].className}
        />

        <div className="grid gap-2">
          {data.map((motor, idx) => {
            const runtimeCard = motor.cards.find((c) => c.type === "runtime");
            const tempCard = motor.cards.find((c) => c.type === "temperature");
            const currentCard = motor.cards.find(
              (c) => c.type === "chart" && c.title === "Current"
            );
            const vibrationCard = motor.cards.find(
              (c) => c.title === "Vibration"
            );

            return (
              <Drawer key={idx}>
                <DrawerTrigger asChild>
                  <div className="grid grid-cols-[120px_1fr] h-fit border border-black rounded-sm p-2 cursor-pointer bg-white hover:bg-zinc-100 transition">
                    {/* Left side */}
                    <div className="grid place-items-center font-bold">
                      {motor.id}
                      <span
                        className={`${
                          runtimeCard?.statusColor || "bg-gray-400"
                        } text-white text-[13px] h-fit w-[80px] text-center`}
                      >
                        {runtimeCard?.status ?? "STOP"}
                      </span>
                    </div>

                    {/* Right side */}
                    <div className="grid grid-cols-[1fr_90px] border-l border-dotted border-black pl-3">
                      <div className="grid grid-rows-3">
                        <span>Power/Ampere Meter</span>
                        <span>Temperature</span>
                        <span>Vibration</span>
                      </div>

                      <div className="grid grid-rows-3">
                        <div className="grid grid-cols-2">
                          <span className="font-bold text-green-500 flex justify-center">
                            {currentCard?.data
                              ? currentCard.data
                                  .at(-1)
                                  ?.[currentCard.dataKey]?.toFixed(2)
                              : "--"}
                          </span>
                          <span className="text-black font-bold">A</span>
                        </div>

                        <div className="grid grid-cols-2">
                          <span className="font-bold text-green-500 flex justify-center">
                            {tempCard?.value ?? "--"}
                          </span>
                          <span className="text-black font-bold">°C</span>
                        </div>

                        <div className="grid grid-cols-2">
                          <span className="font-bold text-green-500 flex justify-center">
                            {vibrationCard?.value ?? "--"}
                          </span>
                          <span className="text-black font-bold">mm/s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DrawerTrigger>

                {/* Drawer content */}
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{motor.id} Details</DrawerTitle>
                  </DrawerHeader>

                  <div className="flex justify-center">
                    <div className="grid grid-cols-3 gap-3 p-4 w-[900px] max-h-[80vh] overflow-y-auto">
                      {motor.cards.map((item, i) => renderCard(item, i))}
                    </div>
                  </div>

                  <DrawerFooter>
                    <DrawerClose>Close</DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
