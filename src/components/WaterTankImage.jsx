"use client";
import { useMemo } from "react";

export default function WaterTankImage({ label, level }) {
  // Convert level (0–100) into % height
  const getLevelPercent = () => `${level}%`;

  // Gradient color changes with level
  const gradient = useMemo(() => {
    if (level > 70) return "from-green-500 to-green-300"; // High
    if (level > 30) return "from-yellow-500 to-yellow-300"; // Mid
    return "from-red-500 to-red-300"; // Low
  }, [level]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-50 justify-center">
        {/* Tank frame */}
        <img
          src="tanki-air.png"
          alt="Water Tank"
          className="absolute inset-0 w-full h-full object-contain z-10"
        />

        {/* Water fill with cylinder effect */}
        <div
          className={`absolute bottom-0 left-0 w-[56%] ml-[35.5px] transition-all mb-[5px] duration-700 bg-gradient-to-t ${gradient}`}
          style={{
            height: getLevelPercent(),
            borderTopLeftRadius: "50% 32px", // curve left
            borderTopRightRadius: "50% 32px", // curve right
            borderBottomRightRadius: "50% 32px", // curve right
            borderBottomLeftRadius: "50% 32px", // curve right
            zIndex: 5,
          }}
        >
          {/* Optional wave overlay */}

          <div
            className="wave-pattern-par absolute top-0 left-0 w-full h-4 rounded-full"
            style={{
              height: 55,
              borderTopLeftRadius: "50% 32px", // curve left
              borderTopRightRadius: "50% 32px", // curve right
              borderBottomRightRadius: "50% 32px", // curve right
              borderBottomLeftRadius: "50% 32px", // curve right
              zIndex: 5,
            }}
          >
            <div
              className="wave-pattern absolute top-0 left-0 w-full h-4 rounded-full"
              style={{
                height: 55,
                borderTopLeftRadius: "50% 32px", // curve left
                borderTopRightRadius: "50% 32px", // curve right
                borderBottomRightRadius: "50% 32px", // curve right
                borderBottomLeftRadius: "50% 32px", // curve right
                zIndex: 5,
              }}
            ></div>
            <div
              className="wave-pattern2 absolute top-0 left-0 w-full h-4 rounded-full"
              style={{
                height: 64,
                borderTopLeftRadius: "50% 32px", // curve left
                borderTopRightRadius: "50% 32px", // curve right
                borderBottomRightRadius: "50% 32px", // curve right
                borderBottomLeftRadius: "50% 32px", // curve right
                zIndex: 5,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Label */}
      <span className="mt-2 text-sm text-white">{label}</span>
    </div>
  );
}
