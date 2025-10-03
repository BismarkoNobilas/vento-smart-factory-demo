// Temperature.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../css/Temperature.module.css";

export default function Temperature({ label = "Temp", initial = 42 }) {
  const units = {
    Celsius: "°C",
    Fahrenheit: "°F",
  };

  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(100);
  const [value, setValue] = useState(initial);
  const [unit, setUnit] = useState("Celsius"); // toggle text only (no conversion)

  const rangeRef = useRef(null);
  const tempRef = useRef(null);

  // update thermometer visual whenever the key values change
  useEffect(() => {
    updateTemperature();
    // ensure range element attributes are in sync
    if (rangeRef.current) {
      rangeRef.current.min = minTemp;
      rangeRef.current.max = maxTemp;
      rangeRef.current.value = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minTemp, maxTemp, value, unit]);

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function updateTemperature() {
    if (!tempRef.current || !rangeRef.current) return;
    const r = Number(rangeRef.current.value);
    const min = Number(minTemp);
    const max = Number(maxTemp);
    const pct = max === min ? 0 : ((r - min) / (max - min)) * 100;
    const h = clamp(pct, 0, 100);
    tempRef.current.style.height = `${h}%`;
    tempRef.current.dataset.value = `${r}${units[unit] ?? ""}`;
  }

  // handlers
  function handleRange(e) {
    const v = Number(e.target.value);
    setValue(v);
  }

  function handleMinChange(e) {
    const v = e.target.value.trim();
    if (v === "" || isNaN(Number(v))) {
      // ignore invalid input
      return;
    }
    const n = Number(v);
    setMinTemp(n);
    // keep current value in range if it fell below new min
    setValue((cur) => (cur < n ? n : cur));
  }

  function handleMaxChange(e) {
    const v = e.target.value.trim();
    if (v === "" || isNaN(Number(v))) return;
    const n = Number(v);
    setMaxTemp(n);
    setValue((cur) => (cur > n ? n : cur));
  }

  function toggleUnit() {
    setUnit((u) => (u === "Celsius" ? "Fahrenheit" : "Celsius"));
    // NOTE: this toggle only changes the unit label; it does NOT convert the numeric value.
  }

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
      {/* <img src="hot.svg" className="absolute " /> */}

      {/* <div className={styles.playground}>
        <div className={styles.range}>
          <input
            id="minTemp"
            type="text"
            value={minTemp}
            onChange={handleMinChange}
            aria-label="Minimum temperature"
          />

          <input
            ref={rangeRef}
            type="range"
            min={minTemp}
            max={maxTemp}
            value={value}
            onChange={handleRange}
            aria-label="Temperature range"
          />

          <input
            id="maxTemp"
            type="text"
            value={maxTemp}
            onChange={handleMaxChange}
            aria-label="Maximum temperature"
          />
        </div>

        <p id="unit" className={styles.unit} onClick={toggleUnit}>
          {unit} {units[unit]}
        </p>
      </div> */}
    </div>
  );
}
