"use client";

import { Card } from "@/components/ui/card";
import TitleBlock from "../custom/TitleBlock";
import AnalogGaugeWrapper from "../layout/AnalogGaugeWrapper";

export default function GaugeCard({
  title,
  value,
  unit,
  min = 0,
  max = 100,
  minLabel = "Low",
  maxLabel = "High",
  values = 7,
  className = "",
  style = {},
}) {
  return (
    <Card
      className={`grid w-[220px] place-items-center bg-zinc-50 shadow-sm rounded ${className}`}
    >
      <TitleBlock title={title} showValue={false} />
      <AnalogGaugeWrapper
        label={unit}
        value={value}
        min={min}
        max={max}
        min-label={minLabel}
        max-label={maxLabel}
        values={values}
        className="w-[200px]"
        style={{
          "--analog-gauge-value-mark-fs": "6cqi",
          "--analog-gauge-value-mark-asr": "1",
          "--analog-gauge-bg":
            "#14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #14E240, #F7931E, #F7931E, #F7931E, #FF0000, #FF0000 var(--analog-gauge-range), #0000 0 var(--analog-gauge-range)",
          ...style,
        }}
      />
    </Card>
  );
}
