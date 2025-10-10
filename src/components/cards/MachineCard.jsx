"use client";
import MachineControlCard from "./MachineControlCard";
import PumpCard from "./PumpCard";
import RunTimeCard from "./RunTimeCard";
import GaugeCard from "./GaugeCard";
import MiniChartCard from "./MiniChartCard";
import MetricCard from "./MetricCard";
import MiniChart from "../custom/MiniChart";
import TemperatureCard from "./TemperatureCard";

export default function MachineCard({
  type = "machine", // "machine" or "pump"
  monitoring = "Machine1",
  title,
  data = [], // array of card objects to render below the top
}) {
  // choose top card
  const TopCard =
    type === "machine" ? MachineControlCard : type === "pump" ? PumpCard : null;

  // helper to render card by type
  const renderCard = (item, idx) => {
    switch (item.type) {
      case "runtime":
        return <RunTimeCard key={idx} logs={item.logs} />;
      case "temperature":
        return <TemperatureCard key={idx} value={item.value} />;
      case "gauge":
        return (
          <GaugeCard
            key={idx}
            title={item.title}
            value={item.value}
            unit={item.unit}
            min={item.min}
            max={item.max}
          />
        );
      case "chart":
        return (
          <MiniChartCard
            key={idx}
            title={item.title}
            data={item.data}
            dataKey={item.dataKey}
            unit={item.unit}
          />
        );
      case "metric":
        return (
          <MetricCard
            key={idx}
            title={item.title}
            value={item.value}
            unit={item.unit}
            chart={item.chart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-9 gap-3 place-items-center w-full p-4 h-full">
      {/* --- top section --- */}
      <div className="col-span-9 grid grid-cols-2 w-full">
        {TopCard && (
          <TopCard
            id={monitoring}
            title={title || `${monitoring}`}
            data={data}
          />
        )}
      </div>

      {/* --- dynamic content --- */}
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`col-span-${
            item.colSpan || 3
          } w-full h-full flex justify-center items-center`}
        >
          {renderCard(item, idx)}
        </div>
      ))}
    </div>
  );
}
