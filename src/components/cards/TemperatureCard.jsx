"use client";

import { Card } from "@/components/ui/card"; // assuming KV was renamed to TitleBlock
import TitleBlock from "../custom/TitleBlock";
import Temperature from "../custom/Temperature";
// your component

export default function TemperatureCard({ value }) {
  return (
    <Card className="grid bg-zinc-50 shadow-sm rounded grid-rows-[max-content_1fr] min-w-[220px] w-full h-full p-2">
      <TitleBlock title="Temperature" value={value} unit="°C" showValue />
      <Temperature value={value} />
    </Card>
  );
}
