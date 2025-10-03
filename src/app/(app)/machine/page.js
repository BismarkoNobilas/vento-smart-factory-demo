import EnergyDisplayCard from "@/components/cards/EnergyDisplayCard";
import PowerStatusCard from "@/components/cards/PowerStatusCard";
import { getInitialData } from "@/lib/getInitialData";

export default async function MachinesPage() {
  const initialData = await getInitialData();

  return (
    <main className="flex-1 p-6 overflow-auto">
      {/* {live ? ( */}
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
