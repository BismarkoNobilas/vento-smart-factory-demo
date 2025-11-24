import MiniChartCard from "@/components/cards/MiniChartCard";
import OEECard from "@/components/cards/OEECard";
import RunTimeCard from "@/components/cards/RunTimeCard";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { logData } from "@/data/demoData";

export default function Widgets() {
  return (
    <main className="flex-1 p-2 overflow-auto w-auto h-auto">
      <Card className="w-full h-auto p-4 flex justify-center items-center ">
        <Carousel className="max-w-[800px] min-w-[320px]">
          <CarouselPrevious />
          <CarouselContent className="max-w-[800px] min-w-[320px]">
            <CarouselItem
              key="1"
              className="grid grid-cols-1 place-items-center h-fit gap-2"
            >
              <span className="text-xl font-semibold">
                Overall Equipment Effectiveness Display
              </span>
              <OEECard />
              <Card className="p-4 text-sm leading-relaxed space-y-3 text-gray-800 gap-1">
                <p>
                  This widget provides a real-time visualization of{" "}
                  <b>Overall Equipment Effectiveness (OEE)</b>, a key metric
                  used to evaluate how efficiently production equipment is
                  performing. It combines three factors: <b>Quality</b>,{" "}
                  <b>Performance</b>, and <b>Availability</b>, to give an
                  overall measure of manufacturing effectiveness.
                </p>

                <h3 className="font-semibold text-base">Widget Sections</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <b>Overall Gauge</b> : Displays the combined OEE percentage,
                    calculated from the three contributing factors.
                  </li>
                  <li>
                    <b>Quality Gauge</b> : Shows the percentage of good units
                    produced versus total units.
                  </li>
                  <li>
                    <b>Performance Gauge</b> : Indicates the production rate
                    compared to the ideal rate.
                  </li>
                  <li>
                    <b>Availability Gauge</b> : Reflects actual machine
                    operating time versus planned production time.
                  </li>
                  <li>
                    <b>Product Quantity</b> : Displays <b>Actual</b>,{" "}
                    <b>Expected</b>, and <b>Target</b> quantities for easy
                    visual comparison.
                  </li>
                </ul>

                <h3 className="font-semibold text-base">Value Definitions</h3>
                <p>
                  <b>OEE</b> = (Quality × Performance × Availability) / 10000
                  <br />
                  <b>Quality</b> = (Good Units ÷ Total Units) × 100
                  <br />
                  <b>Performance</b> = (Ideal Cycle Time × Total Units ÷
                  Operating Time) × 100
                  <br />
                  <b>Availability</b> = (Operating Time ÷ Planned Production
                  Time) × 100
                </p>

                <h3 className="font-semibold text-base">Color Thresholds</h3>
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <span>
                    <b>0–50%</b> —{" "}
                    <span className="text-red-500 font-semibold">Bad</span>
                  </span>
                  <span>
                    <b>50–75%</b> —{" "}
                    <span className="text-orange-500 font-semibold">
                      Moderate
                    </span>
                  </span>
                  <span>
                    <b>90–100%</b> —{" "}
                    <span className="text-green-500 font-semibold">
                      Excellent
                    </span>
                  </span>
                </div>

                <h3 className="font-semibold text-base">Example</h3>
                <p>
                  <b>OEE:</b> 75% &nbsp; <b>Quality:</b> 70% &nbsp;{" "}
                  <b>Performance:</b> 25% &nbsp; <b>Availability:</b> 15%
                  <br />
                  <b>Product Quantity:</b> 162 Actual / 210 Expected / 300
                  Target
                </p>

                <p className="italic text-gray-600">
                  The widget updates in real time and dynamically changes gauge
                  colors based on performance thresholds. You can configure
                  these thresholds or adapt them to different time periods
                  (hourly, shift, daily).
                </p>
              </Card>
            </CarouselItem>
            <CarouselItem
              key="2"
              className="grid grid-cols-1 place-items-center h-fit gap-2"
            >
              <span className="text-xl font-semibold">
                Machine Running Time Display
              </span>
              <div className="h-[200px] w-[400px]">
                <RunTimeCard logs={logData} />
              </div>
              <Card className="p-4 gap-1 text-sm leading-relaxed space-y-3 text-gray-800">
                <h2 className="font-bold text-lg">
                  Machine Running Time Display
                </h2>
                <p>
                  The <b>Machine Running Time Display</b> provides a visual
                  overview of a machine’s operational timeline throughout the
                  day. It helps monitor when the machine is <b>running</b>,{" "}
                  <b>stopped</b>, or experiencing a <b>warning</b> condition,
                  allowing operators and maintenance teams to quickly assess
                  productivity and identify downtime periods.
                </p>

                <h3 className="font-semibold text-base">Widget Sections</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <b>Title</b> : Displays the machine name (e.g.{" "}
                    <b>Packaging Machine</b>).
                  </li>
                  <li>
                    <b>Status</b> : Shows the current machine state in real
                    time, such as
                    <span className="text-green-600 font-semibold">
                      {" "}
                      RUNNING
                    </span>
                    ,
                    <span className="text-yellow-500 font-semibold">
                      {" "}
                      WARNING
                    </span>
                    , or{" "}
                    <span className="text-red-500 font-semibold"> STOP</span>.
                  </li>
                  <li>
                    <b>Caution</b> : Displays a short description or alert
                    message related to machine safety or condition (e.g. “OK”,
                    “Overheat”, or “No Signal”).
                  </li>
                  <li>
                    <b>Timeline Bar</b> : A horizontal bar divided into colored
                    segments representing the machine’s operational state over
                    time. Each color corresponds to a different condition,
                    aligned with the hourly time markers below.
                  </li>
                  <li>
                    <b>Legend</b> — A reference showing what each color means
                    (RUNNING, WARNING, STOP).
                  </li>
                </ul>

                <h3 className="font-semibold text-base">Color Indicators</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span>
                    <span className="inline-block w-3 h-3 bg-green-500 mr-1 rounded-sm"></span>{" "}
                    <b>RUNNING</b> : Machine is active and functioning normally
                  </span>
                  <span>
                    <span className="inline-block w-3 h-3 bg-yellow-400 mr-1 rounded-sm"></span>{" "}
                    <b>WARNING</b> : Machine has minor issues but still
                    operational
                  </span>
                  <span>
                    <span className="inline-block w-3 h-3 bg-red-500 mr-1 rounded-sm"></span>{" "}
                    <b>STOP</b> : Machine has stopped due to downtime or failure
                  </span>
                </div>

                <h3 className="font-semibold text-base">Example</h3>
                <p>
                  <b>Status:</b> RUNNING &nbsp; | &nbsp; <b>Caution:</b> OK
                  <br />
                  Timeline shows operation from <b>07:00</b> to <b>07:00</b>{" "}
                  next day, with color-coded states indicating uptime and
                  downtime.
                </p>

                <p className="italic text-gray-600">
                  The widget automatically updates according to real-time
                  runtime logs, making it ideal for monitoring equipment
                  activity across multiple shifts or production lines.
                </p>
              </Card>
            </CarouselItem>
            <CarouselItem
              key="3"
              className="grid grid-cols-1 place-items-center h-fit gap-2"
            >
              <span className="text-xl font-semibold">Chart Display</span>
              <div className="h-fit w-[400px]">
                <MiniChartCard />
              </div>
              <Card className="text-sm text-gray-700 leading-relaxed p-2 gap-1">
                <p className="font-semibold text-lg mb-1">
                  Chart Display Description
                </p>
                <p>
                  The <span className="font-semibold">Chart Display</span>{" "}
                  visualizes data trends over time or specific measurements,
                  such as current, temperature, or voltage. It uses a smooth
                  area chart to represent changes clearly and effectively.
                </p>

                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    <span className="font-medium">Title:</span> Displayed at the
                    top, showing the metric name (e.g.,{" "}
                    <span className="italic">Current1</span>).
                  </li>
                  <li>
                    <span className="font-medium">Value Label:</span> The latest
                    value can be displayed on the top-right corner (e.g.,{" "}
                    <span className="text-blue-600 font-semibold">
                      0.0558 A
                    </span>
                    ). This is optional.
                  </li>
                  <li>
                    <span className="font-medium">Axes:</span> Both{" "}
                    <span className="italic">X-axis</span> and{" "}
                    <span className="italic">Y-axis</span> can be shown or
                    hidden. The X-axis typically represents time or index, while
                    the Y-axis shows the measurement value.
                  </li>
                  <li>
                    <span className="font-medium">Color Customization:</span>{" "}
                    The chart fill and line color are fully customizable. For
                    example, green can represent safe or normal values, while
                    orange or red can represent warning or high levels.
                  </li>
                  <li>
                    <span className="font-medium">Dynamic Data:</span> The chart
                    updates in real-time or periodically based on the provided
                    dataset.
                  </li>
                  <li>
                    <span className="font-medium">Responsive Design:</span> The
                    chart adjusts automatically to fit various screen sizes and
                    container widths.
                  </li>
                </ul>

                <p className="mt-3">
                  This chart can be used to monitor any process or machine
                  parameter that changes over time, helping users quickly detect
                  patterns, spikes, or anomalies in performance.
                </p>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </Card>
    </main>
  );
}
