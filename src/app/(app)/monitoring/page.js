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
    const update = () => {
      const w = window.innerWidth;
      setWidth(w);

      // Scale parameters
      const minW = 320;
      const maxW = 600;
      const minScale = 0.7;
      const maxScale = 1.0;

      let t = (w - minW) / (maxW - minW);
      t = Math.min(1, Math.max(0, t));
      const newScale = minScale + t * (maxScale - minScale);

      // Set CSS variable for mobile scale
      document.documentElement.style.setProperty("--mobScale", newScale);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  let Component;

  // ✔ Only Mobile < 1024px
  if (width < 640) Component = OEEPageCardMob;
  else if (width < 1024) Component = OEEPageCard;
  else if (width < 1280) Component = OEEPageCardLG;
  else if (width < 1536) Component = OEEPageCardXL;
  else Component = OEEPageCard2XL;

  return (
    <main className="flex-1 px-2 justify-center items-center w-auto max-w-[1536px] h-fit overflow-auto place-self-center">
      {/* Mobile uses dynamic scale wrapper */}
      {width < 640 ? (
        <div
          className="origin-top mx-auto"
          style={{
            transform: "scale(var(--mobScale))",
            transformOrigin: "top center",
          }}
        >
          <OEEPageCardMob />
        </div>
      ) : (
        <Component />
      )}
    </main>
  );
}
