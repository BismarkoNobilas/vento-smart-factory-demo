// hooks/useDemoData.js
"use client";
import { useState, useEffect } from "react";
import {
  generateProductionData,
  generateOEEData,
  getProductionQuantity,
  generateWaterLevel,
} from "@/lib/demoData";

export default function useDemoData() {
  const [production, setProduction] = useState(generateProductionData());
  const [oee, setOee] = useState(generateOEEData());
  const [quantity, setQuantity] = useState(getProductionQuantity());
  const [water, setWater] = useState(generateWaterLevel());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Shift production window (1–30, then 2–31, etc.)
      setProduction((prev) => {
        const newData = [...prev];
        const nextIndex = (index + 1) % 31; // move 1 step, loop after 30
        setIndex(nextIndex);

        // Simulate new incoming data
        const last = newData[newData.length - 1];
        const nextTime = new Date(new Date(last.t).getTime() + 60000);
        const nextValue = 150 + Math.floor(Math.random() * 100);

        newData.push({ t: nextTime.toISOString(), count: nextValue });
        if (newData.length > 60) newData.shift(); // keep only 60 points

        return newData;
      });

      // Update other data
      setOee(generateOEEData());
      setQuantity(getProductionQuantity());
      setWater(generateWaterLevel());
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  // Return visible slice (30 points)
  const visibleProduction = production.slice(index, index + 30);

  return { production: visibleProduction, oee, quantity, water };
}
