import { chartData } from "@/data/demoData";
import MiniChart from "../custom/MiniChart";
import TitleBlock from "../custom/TitleBlock";

export default function MiniChartCard({}) {
  return (
    <div className="col-span-2 grid bg-zinc-50 shadow-sm rounded min-w-[260px] max-w-[800px] h-[240px] p-2">
      <TitleBlock
        title="Production Rate"
        value={chartData[5].Energy1}
        unit=""
        showValue={true}
      />
      <MiniChart
        data={chartData}
        dataKey="Energy1"
        label="Energy"
        axisStateX={true}
        axisStateY={true}
      />
    </div>
  );
}
