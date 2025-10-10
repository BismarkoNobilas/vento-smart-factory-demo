"use client";

import { Card } from "@/components/ui/card"; // assuming KV was renamed to TitleBlock
import TitleBlock from "../custom/TitleBlock";
import Temperature from "../custom/Temperature";
// your component

export default function TemperatureCard({ value }) {
  return (
    <Card className="grid bg-zinc-50 shadow-sm rounded grid-rows-[fit_auto] min-w-[220px] p-2">
      <TitleBlock title="Temperature" value={value} unit="°C" showValue />
      <Temperature />
    </Card>
  );
}
