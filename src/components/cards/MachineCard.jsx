import { Card } from "@/components/ui/card";
import {
  chartData,
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

export default function MachineCard({ conveyor, pump, live }) {
  return (
    <div className="grid gap-2">
      <Card className="p-4 w-[1324px] h-screen relative overflow-hidden">
        <div defaultValue="mach1" className="w-full gap-2 h-full">
          <div className="col-span-3 h-fit flex justify-between w-full">
            <h3 className="font-bold">Overall Equipment Effectiveness</h3>
          </div>
          <div className="absolute -left-[160px] w-auto h-auto">
            {/* w-[971px] ml-[390px] mt-[62px] */}
            <FactoryOverlay
              videoSrc="/R2-Inside-factory.webm"
              width="972px"
              overlays={overlays}
            />
          </div>

          <div className="absolute gap-2 w-[208px] h-[152px]">
            <div className="relative left-[2px] top-[12px]">
              <MachineStatusCard machines={machineStatuses} />
            </div>
            <div className="relative left-[664px] top-[-120px]">
              <OEECard />
            </div>
            <div className="relative left-[736px] top-[-114px] w-fit">
              <MiniChartCard />
            </div>
            <div className="relative left-[2px] top-[-160px] w-fit">
              <RunTimeCard logs={logData} />
            </div>
            <div className="relative left-[246px] top-[-312px] w-fit">
              <RunTimeCard
                logs={logData3}
                title="Water Filler"
                status="RUNNING"
                statusColor="bg-green-500"
                warning="WARNING"
                warningColor="bg-orange-500"
              />
            </div>
            <div className="relative left-[490px] top-[-464px] w-fit">
              <RunTimeCard
                logs={logData2}
                title="Water Tank Pump"
                status="STOP"
                statusColor="bg-red-500"
                warning="OKE"
                warningColor="bg-green-500"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
