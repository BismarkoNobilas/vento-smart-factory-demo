import { chartData, productionData } from "@/data/demoData";
import MiniChart from "../custom/MiniChart";
import TitleBlock from "../custom/TitleBlock";

export default function MiniChartCard({
  title = "Current1",
  unit = "A",
  height = "h-[260px]",
  chartHeight,
  data = chartData,
  dataKey = "Current1",
  axisStateX = true,
  axisStateY = true,
  domainAdd,
}) {
  return (
    <div
      className={`"grid bg-zinc-50 shadow-sm rounded min-w-[260px] max-w-[800px] w-full p-2 ${height} "`}
    >
      <TitleBlock
        title={title}
        value={data[data.length - 1]?.[dataKey]}
        unit={unit}
        showValue={true}
      />
      <MiniChart
        data={data}
        dataKey={dataKey}
        label={dataKey}
        axisStateX={axisStateX}
        axisStateY={axisStateY}
        domainAdd={domainAdd}
        {...(chartHeight ? { height: chartHeight } : {})}
      />
    </div>
  );
}
