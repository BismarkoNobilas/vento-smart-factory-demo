"use client";

import { useEffect, useRef } from "react";
import styles from "../css/Temperature.module.css";

export default function Temperature({
  label = "Temp",
  value = 42,
  min = 0,
  max = 100,
  unit = "Celsius",
}) {
  const units = {
    Celsius: "°C",
    Fahrenheit: "°F",
  };

  const rangeRef = useRef(null);
  const tempRef = useRef(null);

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function updateTemperature() {
    if (!tempRef.current) return;
    const r = Number(value);
    const pct = max === min ? 0 : ((r - min) / (max - min)) * 100;
    const h = clamp(pct, 0, 100);
    tempRef.current.style.height = `${h}%`;
    tempRef.current.dataset.value = `${r}${units[unit] ?? ""}`;
  }

  useEffect(() => {
    updateTemperature();
  }, [value, min, max, unit]);

  return (
    <div className={`${styles.wrapper} w-full`}>
      <div className={styles.thermometer}>
        <div
          ref={tempRef}
          className={styles.temperature}
          style={{ height: "0%" }}
          data-value={`${value}${units[unit]}`}
        />
        <div className={styles.graduations} />
      </div>
    </div>
  );
}
