import MiniChartCard from "@/components/cards/MiniChartCard";
import OEECard from "@/components/cards/OEECard";
import RunTimeCard from "@/components/cards/RunTimeCard";
import MiniChart from "@/components/custom/MiniChart";
import TitleBlock from "@/components/custom/TitleBlock";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Components() {
  return (
    <main className="flex-1 p-2 overflow-auto w-auto h-auto">
      <Card className="w-full h-auto p-4 flex justify-center items-center ">
        <Carousel className="max-w-[800px] min-w-[320px]">
          <CarouselPrevious />
          <CarouselContent className="max-w-[800px] min-w-[320px]">
            <CarouselItem
              key="1"
              className="grid grid-cols-1 place-items-center"
            >
              <span className="text-xl font-semibold">
                Overall Equipment Effectiveness Display
              </span>
              <OEECard />
            </CarouselItem>
            <CarouselItem
              key="2"
              className="grid grid-cols-1 place-items-center"
            >
              <span className="text-xl font-semibold">
                Machine Runnng Time Display
              </span>
              <RunTimeCard />
            </CarouselItem>
            <CarouselItem
              key="3"
              className="grid grid-cols-1 place-items-center"
            >
              <span className="text-xl font-semibold">Chart Display</span>
              <MiniChartCard />
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </Card>
    </main>
  );
}
