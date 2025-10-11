"use client";
import { Card } from "@/components/ui/card";
import {
  chartData,
  logData,
  logData2,
  logData3,
  machineStatuses,
  overlays,
  productionData,
} from "@/data/demoData";
import OEECard from "./OEECard";
import MiniChartCard from "./MiniChartCard";
import RunTimeCard from "./RunTimeCard";
import MachineStatusCard from "./MachineStatusCard";
import FactoryOverlay from "./FactoryOverlay";
import MetricCard from "./MetricCard";
import TitleBlock from "../custom/TitleBlock";
import WaterTankImage from "../custom/WaterTankImage";
import useDemoData from "@/hooks/useDemoData";

export default function OEEPageCard({ conveyor, pump, live }) {
  const { production, oee, quantity, water } = useDemoData();
  return (
    <Card className="p-4 mx-3 my-1 w-auto h-full relative overflow-hidden gap-2">
      <h3 className="font-bold text-2xl">Overall Equipment Effectiveness</h3>
      <div className="absolute left-[30px] top-[150px] w-auto h-auto">
        {/* w-[971px] ml-[390px] mt-[62px] */}
        <FactoryOverlay
          videoSrc="/R6-Inside-factory.webm"
          overlays={overlays}
        />
      </div>
      <div className="absolute grid grid-cols-9 gap-2 top-[25px] w-auto left-0 right-0 m-4">
        <div className="col-span-2 scale-125 justify-self-end self-end">
          <MachineStatusCard machines={machineStatuses} />
        </div>

        <Card className="col-start-5 col-end-7 justify-self-end grid relative bg-zinc-50 shadow-sm roundedgap-1 h-full w-[170px] p-2">
          <TitleBlock title="Water Tank Level" showValue={false} />
          <div className="absolute left-[40px] top-[20px] scale-65">
            <WaterTankImage label="" level={water.tank1.toFixed(1)} />
          </div>
          <span className="absolute top-[112px] left-[36px] text-[12px] font-medium z-30 text-neutral-700">
            {water.tank2.toFixed(1)}%
          </span>
          <span className="absolute top-[42px] left-[35px] text-[12px] font-bold z-30 text-blue-700">
            Tank 1
          </span>
          <span className="absolute top-[112px] left-[107px] text-[12px] font-medium z-30 text-neutral-700">
            {water.tank1.toFixed(1)}%
          </span>
          <span className="absolute top-[42px] left-[104px] text-[12px] font-bold z-30 text-blue-700">
            Tank 2
          </span>
          <div className="absolute -left-[30px] top-[20px] scale-65">
            <WaterTankImage label="" level={water.tank2.toFixed(1)} />
          </div>
        </Card>
        <div className="col-start-7 col-end-9">
          <RunTimeCard logs={logData} />
        </div>
        <div className="grid gap-2">
          <MetricCard
            title="Total Energy"
            value={301}
            unit="Wh"
            textSize="text-[18px]"
            unitSize="text-[15px]"
            className="w-full"
          />
          <MetricCard
            title="Last Maintance"
            value={42}
            unit="Days"
            textSize="text-[18px]"
            unitSize="text-[15px]"
            className="w-full"
          />
        </div>
        <div className="col-start-7 col-end-9">
          <RunTimeCard
            logs={logData3}
            title="Water Filling Machine"
            status="RUNNING"
            statusColor="bg-green-500"
            warning="WARNING"
            warningColor="bg-orange-500"
          />
        </div>
        <div className="grid gap-2">
          <MetricCard
            title="Total Energy"
            value={142}
            unit="Wh"
            textSize="text-[18px]"
            unitSize="text-[15px]"
            className="w-full"
          />
          <MetricCard
            title="Last Maintance"
            value={11}
            unit="Days"
            textSize="text-[18px]"
            unitSize="text-[15px]"
            className="w-full"
          />
        </div>
        <div className="col-span-5 row-span-2 self-end">
          <OEECard
            overall={oee.Overall}
            quality={oee.Quality}
            performance={oee.Performance}
            availability={oee.Availability}
          />
        </div>
        {/* <MetricCard
            title="Total Bottle"
            value={223}
            unit=""
            textSize="text-[18px]"
            unitSize="text-[15px]"
            className="w-full"
          /> */}
        <Card className="bg-zinc-50 shadow-sm rounded relative gap-1 h-full p-2">
          {/* Title */}
          <TitleBlock title="Total Bottle" showValue={false} />
          <div className="flex justify-between items-center p-2">
            <img src="/water-bottle2.svg" className="h-[117px]" />
            <div className="grid w-fit p-1 h-fit">
              <div className="h-fit font-bold text-[22px] text-blue-600 flex items-center justify-center">
                {quantity}
              </div>
              <div className="h-suto font-semibold text-[15px] flex justify-center">
                bottle
              </div>
            </div>
          </div>
        </Card>
        <div className="col-start-7 col-end-9">
          <RunTimeCard
            logs={logData2}
            title="Water Tank Pump"
            status="STOP"
            statusColor="bg-red-500"
            warning="OKE"
            warningColor="bg-green-500"
            className="col-span-2"
          />
        </div>
        <div className="grid gap-2">
          <MetricCard
            title="Total Energy"
            value={223}
            unit="Wh"
            textSize="text-[18px]"
            unitSize="text-[15px]"
            className="w-full"
          />
          <MetricCard
            title="Last Maintance"
            value={63}
            unit="Days"
            textSize="text-[18px]"
            unitSize="text-[15px]"
            className="w-full"
          />
        </div>
        <div className="col-span-4">
          <MiniChartCard
            chartHeight="h-[118px]"
            height="h-fit"
            data={production}
            dataKey="count"
            axisStateY={false}
            domainAdd={25}
          />
        </div>
      </div>
      <div className="h-[1340px]" />
    </Card>
  );
}
