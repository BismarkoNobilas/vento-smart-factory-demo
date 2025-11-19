import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 overflow-auto justify-center items-center w-auto h-auto container mx-auto">
      <Card className="min-w-[450px] min-h-[100px] flex justify-center items-center p-4">
        <span className="text-yellow-200 font-bold text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Welcome to Vento Engineering
        </span>
        <span className="text-blue-500 font-bold text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          IOT Dashboard
        </span>
      </Card>
    </main>
  );
}
