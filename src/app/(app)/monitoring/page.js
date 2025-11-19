import OEEPageCard from "@/components/cards/OEEPageCard";
import { getInitialData } from "@/lib/getInitialData";

export default async function MonitoringPage() {
  return (
    <div className="flex-1 px-2 justify-center items-center w-full min-h-screen container mx-auto">
      {/* {live ? ( */}
      <OEEPageCard />
      {/* ) : (
         <Card className="p-6 text-center text-gray-500">Loading data…</Card>
       )} */}
    </div>
  );
}
