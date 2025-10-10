"use client";
import React from "react";
import TitleBlock from "../custom/TitleBlock";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function FactoryOverlay({ videoSrc, overlays }) {
  return (
    <div className="relative w-full aspect-auto max-w-[840px] h-auto">
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

        // if (item.type === "tank") {
        //   return (
        //     <div
        //       key={idx}
        //       className="absolute p-1 h-full"
        //       style={{
        //         top: item.pos.top,
        //         left: item.pos.left,
        //         transform: "translate(-50%, -50%)",
        //       }}
        //     >
        //       <div
        //         className={`${item.color} ${item.skew || ""}`}
        //         style={{
        //           height: item.height,
        //           width: item.width,
        //           minHeight: "2px",
        //           position: "absolute",
        //           bottom: 0, // anchor the colored bar to bottom so it grows upward
        //           transition: "height 0.3s ease", // optional smooth change
        //         }}
        //       />
        //     </div>
        //   );
        // }

        return null;
      })}
      {/* <Popover>
        <PopoverTrigger
          className="absolute cursor-pointer z-50 flex justify-center items-center bg-zinc-100 drop-shadow-[0_1.1px_1.1px_rgba(0,0,0,0.8)] rounded-full"
          style={{
            top: "72%",
            left: "89%",
            transform: "translate(-50%, -50%)",
          }}
        >
           <p className="text-[16px] font-bold text-zinc-800">INFO</p> 
          <img src="info_icon.svg" className="w-[50px] opacity-90" />
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
      </Popover>*/}
    </div>
  );
}

export default FactoryOverlay;
