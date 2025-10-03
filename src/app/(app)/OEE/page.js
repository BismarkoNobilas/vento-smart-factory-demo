import MachineCard from "@/components/cards/MachineCard";
import { Card } from "@/components/ui/card";
import { getInitialData } from "@/lib/getInitialData";

export default async function OEEPage() {
  const initialData = await getInitialData();
  return (
    <main className="flex-1 p-2 overflow-auto">
      {/* {live ? ( */}
      <div className="grid gap-4">
        <MachineCard />
      </div>
      {/* ) : (
         <Card className="p-6 text-center text-gray-500">Loading data…</Card>
       )} */}
    </main>
  );
}
