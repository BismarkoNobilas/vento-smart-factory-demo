import EnergyDisplayCard from "@/components/cards/EnergyDisplayCard";
import MachineCard from "@/components/cards/MachineCard";
import PowerStatusCard from "@/components/cards/PowerStatusCard";
import MiniChart from "@/components/custom/MiniChart";
import { Card } from "@/components/ui/card";
import { chartData, logData } from "@/data/demoData";
import { getInitialData } from "@/lib/getInitialData";

export default async function MachinesPage() {
  const initialData = await getInitialData();

  return (
    <main className="flex-1 p-6 overflow-auto">
      {/* <MachineCard type="machine" subType="conveyor" subCount={4} monitoring="machine1" /> */}
      <Card>
        <MachineCard
          type="machine"
          monitoring="Machine1"
          title="Conveyor Packing"
          data={[
            { type: "runtime", logs: logData, colSpan: 3 },
            { type: "temperature", value: 42, colSpan: 3 },
            {
              type: "gauge",
              title: "Power",
              value: 10,
              unit: "Watt",
              min: 0,
              max: 12,
            },
            {
              type: "chart",
              title: "Current",
              data: chartData,
              dataKey: "Current1",
              unit: "A",
            },
            {
              type: "metric",
              title: "Voltage",
              value: 220,
              unit: "V",
              chart: (
                <MiniChart
                  data={chartData}
                  dataKey="Voltage1"
                  label="Voltage"
                />
              ),
            },
          ]}
        />
      </Card>
      <div className="grid grid-cols-[555px_auto] gap-4">
        <PowerStatusCard
          data={initialData}
          pump={initialData.pump}
          live={initialData.live}
        />
        <EnergyDisplayCard
          conveyor={initialData.conv}
          pump={initialData.pump}
          live={initialData.live}
        />
      </div>
      {/* ) : (
        <Card className="p-6 text-center text-gray-500">Loading data…</Card>
      )} */}
    </main>
  );
}
