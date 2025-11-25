"use client";
import { Card } from "@/components/ui/card";
import {
  logData,
  logData2,
  logData3,
  machineStatuses,
  overlays,
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
      {/* Desktop absolute overlay */}
      <div className="lg:absolute lg:left-[0px] lg:top-[260px] xl:top-[120px] lg:w-5/9">
        <FactoryOverlay
          videoSrc="/R6-Inside-factory.webm"
          overlays={overlays}
        />
      </div>

      {/* MAIN GRID: mobile=1 column, desktop=9 columns */}
      <div className="grid grid-cols-3 lg:grid-cols-9 gap-4 mt-6 lg:absolute lg:top-[25px] lg:left-0 lg:right-0 m-4">
        {/* Machine status card */}
        <div className="col-span-2 lg:scale-125 lg:place-self-end lg:self-center">
          <MachineStatusCard machines={machineStatuses} />
        </div>

        {/* Water tank card */}
        <div className="lg:col-start-5 lg:col-end-7 justify-self-end bg-zinc-50 shadow-sm rounded gap-1 h-auto lg:h-full w-[170px] p-2 min-h-[160px]">
          <TitleBlock title="Water Tank Level" showValue={false} />

          <div className="grid grid-cols-2">
            <span className="text-[12px] font-bold z-30 text-blue-700 text-center p-1">
              Tank 1
            </span>
            <span className="text-[12px] font-bold z-30 text-blue-700 text-center p-1">
              Tank 2
            </span>
            <div className="h-fit">
              <div className="relative">
                <div className="absolute scale-45 lg:scale-69 inset-0">
                  <WaterTankImage label="" level={water.tank1.toFixed(1)} />
                </div>
              </div>
            </div>
            <div className="h-fit">
              <div className="relative">
                <div className="absolute scale-45 lg:scale-69 inset-0">
                  <WaterTankImage label="" level={water.tank2.toFixed(1)} />
                </div>
              </div>
            </div>
            <span className="text-[12px] font-medium z-30 text-neutral-700 text-center">
              {water.tank1.toFixed(1)}%
            </span>
            <span className="text-[12px] font-medium z-30 text-neutral-700 text-center">
              {water.tank2.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Runtime card */}
        <div className="col-span-2 lg:col-start-7 lg:col-end-9">
          <RunTimeCard logs={logData} />
        </div>

        {/* Energy + maintenance */}
        <div className="grid gap-2">
          <MetricCard
            title="Total Energy"
            value={301}
            unit="Wh"
            textSize="text-[18px]"
            unitSize="text-[15px]"
          />
          <MetricCard
            title="Last Maintance"
            value={42}
            unit="Days"
            textSize="text-[18px]"
            unitSize="text-[15px]"
          />
        </div>

        {/* Water filling machine */}
        <div className="col-span-2 lg:col-start-7 lg:col-end-9">
          <RunTimeCard
            logs={logData3}
            title="Water Filling Machine"
            status="RUNNING"
            statusColor="bg-green-500"
            warning="WARNING"
            warningColor="bg-orange-500"
          />
        </div>

        {/* Right-side metric */}
        <div className="grid gap-2">
          <MetricCard
            title="Total Energy"
            value={142}
            unit="Wh"
            textSize="text-[18px]"
            unitSize="text-[15px]"
          />
          <MetricCard
            title="Last Maintance"
            value={11}
            unit="Days"
            textSize="text-[18px]"
            unitSize="text-[15px]"
          />
        </div>

        {/* OEE card */}
        <div className="lg:col-span-5 lg:row-span-2 lg:self-end">
          <OEECard
            overall={oee.Overall}
            quality={oee.Quality}
            performance={oee.Performance}
            availability={oee.Availability}
          />
        </div>

        {/* Bottle count */}
        <Card className="bg-zinc-50 shadow-sm rounded p-2">
          <TitleBlock title="Total Bottle" showValue={false} />
          <div className="flex justify-between items-center p-2">
            <img src="/water-bottle2.svg" className="h-[117px]" />
            <div className="grid w-fit p-1">
              <div className="font-bold text-[22px] text-blue-600 text-center">
                {quantity}
              </div>
              <div className="font-semibold text-[15px] text-center">
                bottle
              </div>
            </div>
          </div>
        </Card>

        {/* Tank pump runtime */}
        <div className="lg:col-start-7 lg:col-end-9">
          <RunTimeCard
            logs={logData2}
            title="Water Tank Pump"
            status="STOP"
            statusColor="bg-red-500"
            warning="OKE"
            warningColor="bg-green-500"
          />
        </div>

        {/* Energy + maintenance */}
        <div className="grid gap-2">
          <MetricCard
            title="Total Energy"
            value={223}
            unit="Wh"
            textSize="text-[18px]"
            unitSize="text-[15px]"
          />
          <MetricCard
            title="Last Maintance"
            value={63}
            unit="Days"
            textSize="text-[18px]"
            unitSize="text-[15px]"
          />
        </div>

        {/* Mini chart */}
        <div className="lg:col-span-4">
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
