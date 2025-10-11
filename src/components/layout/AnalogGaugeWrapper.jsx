//AnalogGaugeWrapper.jsx
"use client";
import { useEffect } from "react";

export default function AnalogGaugeWrapper(props) {
  useEffect(() => {
    import("@browser.style/analog-gauge");
  }, []);

  return <analog-gauge {...props}></analog-gauge>;
}
