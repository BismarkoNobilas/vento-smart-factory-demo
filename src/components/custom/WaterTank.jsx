"use client";
import { useMemo } from "react";

export default function WaterTank({ label, level }) {
  // Convert level (0–3) into % height
  const getLevelPercent = () => {
    switch (level) {
      case 2:
        return "85%";
      case 1:
        return "30%"; // Low
      default:
        return "0%"; // Empty
    }
  };

  // Gradient color changes by level
  const gradient = useMemo(() => {
    switch (level) {
      case 1:
        return "bg-gradient-to-t from-red-600 to-red-400";
      case 2:
        return "bg-gradient-to-t from-green-600 to-green-400";
      default:
        return "bg-gray-800"; // Empty (dark gray)
    }
  }, [level]);

  return (
    <div className="flex flex-col items-center">
      {/* Tank outline */}

      <div className="relative w-24 h-48 rounded-full border-4 border-blue-400 overflow-hidden">
        {/* Water fill with wave */}

        <img
          className="relative"
          src="/water-tank-2.png"
          alt="Motor"
          width={250}
        />
        <div
          className={`absolute bottom-0 left-0 w-full transition-all duration-700 bg-gradient-to-t ${gradient}`}
          style={{ height: getLevelPercent() }}
        >
          {/* Moving wave overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="wave"></div>
            <div className="wave delay"></div>
          </div>
        </div>
      </div>
      <span className="mt-2 text-sm text-white">
        {label}
        {[" - Empty", " - Low", " - Mid", " - High"][level]}
      </span>
    </div>
  );
}
