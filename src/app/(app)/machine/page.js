import EnergyDisplayCard from "@/components/cards/EnergyDisplayCard";
import MachineCard from "@/components/cards/MachineCard";
import PowerStatusCard from "@/components/cards/PowerStatusCard";
import MiniChart from "@/components/custom/MiniChart";
import { Card } from "@/components/ui/card";
import { chartData, logData, motorData } from "@/data/demoData";
import { getInitialData } from "@/lib/getInitialData";

export default async function MachinesPage() {
  const initialData = await getInitialData();

  return (
    <main className="flex-1 p-6 overflow-auto">
      {/* <MachineCard type="machine" subType="conveyor" subCount={4} monitoring="machine1" /> */}

      <Card className="p-4 mx-3 my-1 w-auto h-full relative overflow-hidden gap-2">
        <h3 className="font-bold text-2xl">Machine Electrical Monitoring</h3>
        <MachineCard
          type="machine"
          monitoring="Machine1"
          title="Conveyor Packing"
          motors={motorData}
          data={[
            {
              type: "runtime",
              logs: logData,
              title: "Motor 1",
              status: "RUNNING",
              statusColor: "bg-green-500",
              warning: "OKE",
              warningColor: "bg-green-500",
              className: "col-span-2",
            },
            { type: "temperature", value: 62 },
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
              colSpan: 2,
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
                  domainAdd={5}
                />
              ),
            },
          ]}
        />
      </Card>

      {/* ) : (
        <Card className="p-6 text-center text-gray-500">Loading data…</Card>
      )} */}
    </main>
  );
}
