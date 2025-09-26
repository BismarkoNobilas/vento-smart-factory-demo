"use client";
import EnergyDisplayCard from "@/components/EnergyDisplayCard";
import PowerStatusCard from "@/components/PowerStatusCard";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useRef } from "react";

export default function Dashboard() {
  const { live, conv, pump, now, role, setRole, publish } = useApp();
  const videoRef = useRef(null);

  return (
    <main className="flex-1 p-6 overflow-auto">
      {live ? (
        <div className="grid grid-cols-[555px_auto] gap-4">
          <PowerStatusCard data={live} onPublish={publish} role={role} />
          <EnergyDisplayCard conveyor={conv} pump={pump} live={live} />
        </div>
      ) : (
        <Card className="p-6 text-center text-gray-500">Loading data…</Card>
      )}
    </main>
  );
}
