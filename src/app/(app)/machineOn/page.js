// src/app/(app)/machineOn/page.js
"use client";
import MachineCard from "@/components/cards/MachineCard";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { logData3 } from "@/data/demoData";
import MiniChart from "@/components/custom/MiniChart";

export default function MachinesOnPage() {
  const { live, now, role, pump, conv } = useApp(); // <-- must use useApp()
  // console.log(pump);
  // console.log(conv);
  // console.log(live);
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
        { type: "temperature", value: 72 },
        {
          type: "gauge",
          title: "Power",
          value: live.Power1,
          unit: "Watt",
          min: 0,
          max: 12,
        },
        {
          type: "chart",
          title: "Current",
          data: conv,
          dataKey: "current",
          unit: "A",
          colSpan: 2,
        },
        {
          type: "metric",
          title: "Voltage",
          value: live.Voltage1,
          unit: "V",
          chart: (
            <MiniChart
              data={conv}
              dataKey="voltage"
              label="Voltage"
              domainAdd={5}
            />
          ),
        },
        { type: "metric", title: "Vibration", value: 17, unit: "mm/s" },
      ],
    },
    {
      id: "Motor 2",
      cards: [
        {
          type: "runtime",
          logs: logData3,
          title: "Motor 2",
          status: "RUNNING",
          statusColor: "bg-green-500",
          warning: "OK",
          warningColor: "bg-green-500",
          className: "col-span-2",
        },
        { type: "temperature", value: 59 },
        {
          type: "gauge",
          title: "Power",
          value: live.Power2,
          unit: "Watt",
          min: 0,
          max: 12,
        },
        {
          type: "chart",
          title: "Current",
          data: pump,
          dataKey: "current",
          unit: "A",
          colSpan: 2,
        },
        {
          type: "metric",
          title: "Voltage",
          value: live.Voltage2,
          unit: "V",
          chart: (
            <MiniChart
              data={pump}
              dataKey="coltage"
              label="Voltage"
              domainAdd={5}
            />
          ),
        },
        { type: "metric", title: "Vibration", value: 12, unit: "mm/s" },
      ],
    },
  ];
  // console.log(machine5Data);

  return (
    <main className="flex-1 p-1 overflow-auto">
      <Card className="p-4 mx-3 my-1 w-auto h-full relative overflow-hidden gap-2 flex justify-center items-center">
        <h3 className="font-bold text-2xl">Machine Electrical Monitoring</h3>

        <Carousel
          opts={{ align: "start", slidesToScroll: 1, loop: false }}
          className="w-fit max-w-[1230px]"
        >
          <CarouselContent className="-ml-0 w-auto">
            <CarouselItem className="pl-1">
              <MachineCard
                title="Smart Factory Machine"
                data={machine5Data} // <— LIVE STATE
                index={0}
              />
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Card>
    </main>
  );
}
