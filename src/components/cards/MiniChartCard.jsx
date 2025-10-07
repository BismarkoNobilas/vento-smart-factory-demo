import { chartData, productionData } from "@/data/demoData";
import MiniChart from "../custom/MiniChart";
import TitleBlock from "../custom/TitleBlock";

export default function MiniChartCard({
  height = "h-[240px]",
  chartHeight,
  data = chartData,
  dataKey,
}) {
  return (
    <div
      className={`"col-span-2 grid bg-zinc-50 shadow-sm rounded min-w-[260px] max-w-[800px] w-full p-2 ${height} "`}
    >
      <TitleBlock
        title="Production Rate"
        value={data[data.length - 1].count}
        unit=""
        showValue={true}
      />
      <MiniChart
        data={data}
        dataKey={dataKey}
        label={dataKey}
        axisStateX={true}
        axisStateY={false}
        {...(chartHeight ? { height: chartHeight } : {})}
      />
    </div>
  );
}
