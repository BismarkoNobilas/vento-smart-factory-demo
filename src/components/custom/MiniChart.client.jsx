"use client";

import dynamic from "next/dynamic";

const MiniChart = dynamic(() => import("./MiniChart"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[120px] flex items-center justify-center text-xs text-muted-foreground">
      Loading chart…
    </div>
  ),
});

export default MiniChart;
