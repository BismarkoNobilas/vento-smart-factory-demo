import MachineCard from "@/components/cards/MachineCard";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  machine1Data,
  machine2Data,
  machine3Data,
  machine4Data,
} from "@/data/demoData";

export default async function MachinesPage() {
  return (
    <main className="flex-1 p-1 overflow-auto">
      {/* <MachineCard type="machine" subType="conveyor" subCount={4} monitoring="machine1" /> */}

      <Card className="p-4 mx-3 my-1 w-auto h-full relative overflow-hidden gap-2 flex justify-center items-center">
        <h3 className="font-bold text-2xl">Machine Electrical Monitoring</h3>
        <div className="flex justify-center"></div>
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
            loop: false,
          }}
          className="w-full max-w-[1230px]"
        >
          <CarouselContent className="-ml-0 w-[1200px]">
            <CarouselItem key={1} className="pl-1 basis-[37%]">
              <div className="p-1">
                <MachineCard
                  title="Packaging Machine"
                  data={machine1Data}
                  index={0}
                />
              </div>
            </CarouselItem>
            <CarouselItem key={2} className="pl-1 basis-[37%]">
              <div className="p-1">
                <MachineCard
                  title="Water Filling Machine"
                  data={machine2Data}
                  index={1}
                />
              </div>
            </CarouselItem>
            <CarouselItem key={3} className="pl-1 basis-[37%]">
              <div className="p-1">
                <MachineCard
                  title="Water Tank Pump"
                  data={machine3Data}
                  index={2}
                />
              </div>
            </CarouselItem>
            <CarouselItem key={4} className="pl-1 basis-[37%]">
              <div className="p-1">
                <MachineCard title="Conveyors" data={machine4Data} index={0} />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Card>

      {/* ) : (
        <Card className="p-6 text-center text-gray-500">Loading data…</Card>
      )} */}
    </main>
  );
}
