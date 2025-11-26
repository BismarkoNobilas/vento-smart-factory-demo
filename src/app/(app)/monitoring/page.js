"use client";
import OEEPageCard from "@/components/cards/OEEPageCard";
import OEEPageCard2XL from "@/components/cards/OEEPageCard2XL";
import OEEPageCardLG from "@/components/cards/OEEPageCardLG";
import OEEPageCardMob from "@/components/cards/OEEPageCardMob";
import OEEPageCardXL from "@/components/cards/OEEPageCardXL";
// import { getInitialData } from "@/lib/getInitialData";
import { useEffect, useState } from "react";

export default function MonitoringPage() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  let Component;

  if (width < 1024) Component = "mob";
  else if (width < 1280) Component = OEEPageCardLG;
  else if (width < 1536) Component = OEEPageCardXL;
  else Component = OEEPageCard2XL;

  return (
    <main className="flex-1 px-2 justify-center items-center w-auto max-w-[1536px] h-fit overflow-auto place-self-center">
      {Component === "mob" ? (
        // ⬇️ Dynamic scale wrapper ONLY for mobile version
        <div className="origin-top scale-[clamp(0.7,calc(100vw/580),1)]">
          <OEEPageCardMob />
        </div>
      ) : (
        <Component />
      )}
    </main>
  );
}
