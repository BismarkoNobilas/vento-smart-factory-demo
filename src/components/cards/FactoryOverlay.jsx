import React from "react";
import TitleBlock from "../custom/TitleBlock";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function FactoryOverlay({ videoSrc, width, height = "auto", overlays }) {
  return (
    <div className="relative" style={{ width, height }}>
      {/* background video */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="h-auto w-full"
      />

      {/* overlays */}
      {overlays.map((item, idx) => {
        if (item.type === "card") {
          return (
            <Popover key={idx}>
              <PopoverTrigger
                className="absolute w-15 h-15 bg-zinc-500/30 rounded "
                style={{ top: item.pos.top, left: item.pos.left }}
              ></PopoverTrigger>

              <PopoverContent className="absolute bg-zinc-50/95 shadow-sm rounded p-1 w-fit grid-rows-3">
                <TitleBlock title={item.title} width={item.width || 100} />
                <div
                  className={`h-fit font-bold text-2xl flex items-center justify-center ${item.color}`}
                >
                  {item.value}
                </div>
                <div className="h-fit font-semibold text-xl flex items-center justify-center">
                  {item.unit}
                </div>
              </PopoverContent>
            </Popover>
          );
        }

        if (item.type === "tank") {
          return (
            <div
              key={idx}
              className="absolute w-fit p-1"
              style={{ top: item.pos.top, left: item.pos.left }}
            >
              <div
                className={`${item.color} ${item.skew || ""}`}
                style={{ height: item.height, width: item.width }}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default FactoryOverlay;
