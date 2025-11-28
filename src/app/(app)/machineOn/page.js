// src/app/(app)/machineOn/page.js
"use client";
import MachineCard from "@/components/cards/MachineCard";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { machine5Data } from "@/data/demoData";
import useLiveState from "@/hooks/useLiveState";

export default function MachinesOnPage() {
  const live = useLiveState();
  console.log(live);

  // fallback while loading or no MQTT data yet
  if (!live) {
    return (
      <main className="flex-1 p-1 overflow-auto">
        <Card className="p-4 mx-3 my-1 w-auto h-full relative overflow-hidden gap-2 flex justify-center items-center">
          <h3 className="font-bold text-2xl">Machine Electrical Monitoring</h3>
          <div className="flex justify-center"></div>
          <Carousel
            opts={{ align: "start", slidesToScroll: 1, loop: false }}
            className="w-fit max-w-[1230px]"
          >
            <CarouselContent className="-ml-0 w-auto">
              <CarouselItem key={1} className="pl-1">
                <div className="p-1">
                  <MachineCard
                    title="Packaging Machine"
                    data={machine5Data}
                    index={0}
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious /> <CarouselNext />
          </Carousel>
        </Card>
      </main>
    );
  }

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
              {/* <MachineCard
                title="Packaging Machine"
                data={live} // <— LIVE STATE
                index={0}
              /> */}
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Card>
    </main>
  );
}
