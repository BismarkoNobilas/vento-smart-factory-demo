"use client";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { live, conv, pump, now, role, setRole, publish } = useApp();

  return (
    <main className="flex-1 p-6 overflow-auto">
      {/* {live ? (
        <div className="grid grid-cols-[555px_auto] gap-4">
          <PowerStatusCard data={live} onPublish={publish} role={role} />
          <EnergyDisplayCard conveyor={conv} pump={pump} live={live} />
        </div>
      ) : (
        <Card className="p-6 text-center text-gray-500">Loading data…</Card>
      )} */}
    </main>
  );
}
