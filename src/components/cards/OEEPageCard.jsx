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
      <div className="hidden md:block md:absolute md:left-[30px] md:top-[150px]">
        <FactoryOverlay
          videoSrc="/R6-Inside-factory.webm"
          overlays={overlays}
        />
      </div>

      {/* MAIN GRID: mobile=1 column, desktop=9 columns */}
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4 mt-6 md:absolute md:top-[25px] md:left-0 md:right-0 m-4">
        {/* Machine status card */}
        <div className="md:col-span-2 md:scale-125 md:justify-self-end md:self-end">
          <MachineStatusCard machines={machineStatuses} />
        </div>

        {/* Water tank card */}
        <Card
          className="relative bg-zinc-50 shadow-sm rounded gap-1 h-full p-2 
                         w-full md:w-[170px] 
                         md:col-start-5 md:col-end-7 md:justify-self-end"
        >
          <TitleBlock title="Water Tank Level" showValue={false} />

          {/* Desktop absolute, mobile stacked */}
          <div className="hidden md:block">
            <div className="absolute left-[40px] top-[20px] scale-65">
              <WaterTankImage label="" level={water.tank1.toFixed(1)} />
            </div>
            <span className="absolute top-[112px] left-[36px] text-[12px] font-medium">
              {water.tank2.toFixed(1)}%
            </span>
            <span className="absolute top-[42px] left-[35px] text-[12px] font-bold text-blue-700">
              Tank 1
            </span>
            <span className="absolute top-[112px] left-[107px] text-[12px] font-medium">
              {water.tank1.toFixed(1)}%
            </span>
            <span className="absolute top-[42px] left-[104px] text-[12px] font-bold text-blue-700">
              Tank 2
            </span>
            <div className="absolute -left-[30px] top-[20px] scale-65">
              <WaterTankImage label="" level={water.tank2.toFixed(1)} />
            </div>
          </div>

          {/* Mobile layout simpler */}
          <div className="md:hidden grid gap-2">
            <WaterTankImage label="Tank 1" level={water.tank1.toFixed(1)} />
            <WaterTankImage label="Tank 2" level={water.tank2.toFixed(1)} />
          </div>
        </Card>

        {/* Runtime card */}
        <div className="md:col-start-7 md:col-end-9">
          <RunTimeCard logs={logData} />
        </div>

        {/* Energy + maintenance */}
        <div className="grid gap-2">
          <MetricCard title="Total Energy" value={301} unit="Wh" />
          <MetricCard title="Last Maintance" value={42} unit="Days" />
        </div>

        {/* Water filling machine */}
        <div className="md:col-start-7 md:col-end-9">
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
          <MetricCard title="Total Energy" value={142} unit="Wh" />
          <MetricCard title="Last Maintance" value={11} unit="Days" />
        </div>

        {/* OEE card */}
        <div className="md:col-span-5 md:row-span-2 md:self-end">
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
        <div className="md:col-start-7 md:col-end-9">
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
          <MetricCard title="Total Energy" value={223} unit="Wh" />
          <MetricCard title="Last Maintance" value={63} unit="Days" />
        </div>

        {/* Mini chart */}
        <div className="md:col-span-4">
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
