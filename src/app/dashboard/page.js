"use client";
import { useApp } from "@/context/AppContext";
import { useRef } from "react";

export default function Dashboard() {
  const { live, conv, pump, now, role, setRole, publish } = useApp();
  const videoRef = useRef(null);

  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();

  return (
    <main className="flex-1 p-6 overflow-auto">
      <video
        ref={videoRef}
        src="/R2-Inside-factory.webm"
        autoPlay
        loop
        muted
        playsInline // ensures it works on mobile
        // className="w-32 h-32"
      />
      {/* <video>
        <source src="/conveyorrunning.webm"></source>
      </video> */}
      <div className="mt-2 space-x-2">
        <button
          onClick={handlePlay}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          ▶️ Play
        </button>
        <button
          onClick={handlePause}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          ⏸ Pause
        </button>
      </div>
      {/* {live ? (
              <div className="grid grid-cols-[555px_auto] gap-4">
                <PowerStatusCard data={live} onPublish={publish} role={role} />
                <EnergyDisplayCard conveyor={conv} pump={pump} live={live} />
              </div>
            ) : (
              <Card className="p-6 text-center text-gray-500">
                Loading data…
              </Card>
            )} */}
    </main>
  );
}
