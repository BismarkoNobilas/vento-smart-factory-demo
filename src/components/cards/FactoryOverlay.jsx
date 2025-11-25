"use client";
import React from "react";
import TitleBlock from "../custom/TitleBlock";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function FactoryOverlay({ videoSrc, overlays }) {
  return (
    <div className="relative w-full aspect-auto lg:max-w-[840px] h-auto">
      {/* maintain aspect ratio */}
      {/* background video */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded"
      />
      {/* overlays */}
      {overlays.map((item, idx) => {
        if (item.type === "card") {
          return (
            <Popover key={idx}>
              <PopoverTrigger
                className="absolute cursor-pointer z-50"
                style={{
                  top: item.pos.top,
                  left: item.pos.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src="info_icon.svg"
                  className="w-[40px] h-[40px] opacity-90"
                />
              </PopoverTrigger>
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
        // return null;
      })}
    </div>
  );
}

export default FactoryOverlay;
