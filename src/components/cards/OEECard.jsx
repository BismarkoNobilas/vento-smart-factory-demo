import FullRadialChart from "../custom/FullRadialChart";

export default function OEECard({
  overall = 75,
  quality = 70,
  performance = 25,
  availability = 15,
  actual = 162,
  expected = 210,
  target = 300,
}) {
  return (
    <div className="grid grid-cols-[auto_auto] justify-between col-span-3 gap-4 p-3 items-center w-fit bg-zinc-50 shadow-sm rounded">
      {/* OEE Main Chart */}
      <div className="row-span-2 grid w-fit h-fit">
        <p>OEE</p>
        <FullRadialChart
          value={overall}
          size={200}
          strokeWidth={14}
          label="Overall"
          className="flex justify-center items-center"
        />
      </div>

      {/* Sub Charts */}
      <div className="flex justify-center items-center w-fit h-fit gap-3">
        <FullRadialChart
          value={quality}
          size={120}
          strokeWidth={10}
          label="Quality"
        />
        <FullRadialChart
          value={performance}
          size={120}
          strokeWidth={10}
          label="Performance"
        />
        <FullRadialChart
          value={availability}
          size={120}
          strokeWidth={10}
          label="Availability"
        />
      </div>

      {/* Product Quantity */}
      <div className="grid border-t-2">
        <p>Product Quantity</p>
        <div className="flex justify-between items-center px-8">
          <div>
            <div className="h-full font-bold text-3xl text-[#00aeef] flex items-center justify-center">
              {actual}
            </div>
            <div className="h-full font-semibold text-xs flex items-center justify-center">
              Actual
            </div>
          </div>
          <div>
            <div className="h-full font-bold text-3xl text-[#00aeef] flex items-center justify-center">
              {expected}
            </div>
            <div className="h-full font-semibold text-xs flex items-center justify-center">
              Expected
            </div>
          </div>
          <div>
            <div className="h-full font-bold text-3xl text-[#00aeef] flex items-center justify-center">
              {target}
            </div>
            <div className="h-full font-semibold text-xs flex items-center justify-center">
              Target
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
