"use client";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  redirect("/monitoring");
  const [data, setData] = useState("No data yet");

  useEffect(() => {
    const evtSource = new EventSource("/api/stream");

    evtSource.onmessage = (e) => {
      setData(JSON.parse(e.data));
    };

    evtSource.onerror = () => {
      console.log("SSE connection lost. Retrying...");
    };

    return () => evtSource.close();
  }, []);

  return (
    <main className="flex-1 p-6 overflow-auto justify-center items-center w-auto h-auto">
      <Card className="min-w-[450px] min-h-[100px] flex justify-center items-center p-4">
        <span className="text-yellow-200 font-bold text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Welcome to Vento Engineering
        </span>
        <span className="text-blue-500 font-bold text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          IOT Dashboard
        </span>
      </Card>
      <div>
        <h1>Realtime Data from SSE</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  );
}
