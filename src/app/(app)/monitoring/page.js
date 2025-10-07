import MachineCard from "@/components/cards/MachineCard";
import { Card } from "@/components/ui/card";
import { getInitialData } from "@/lib/getInitialData";

export default async function MonitoringPage() {
  const initialData = await getInitialData();
  return (
    <div className="flex-1 px-2 justify-center items-center w-full min-h-screen">
      {/* {live ? ( */}
      <MachineCard />
      {/* ) : (
         <Card className="p-6 text-center text-gray-500">Loading data…</Card>
       )} */}
    </div>
  );
}
