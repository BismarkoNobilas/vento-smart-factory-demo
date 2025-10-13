import MiniChartCard from "@/components/cards/MiniChartCard";
import OEECard from "@/components/cards/OEECard";
import RunTimeCard from "@/components/cards/RunTimeCard";
import MiniChart from "@/components/custom/MiniChart";
import TitleBlock from "@/components/custom/TitleBlock";
import { Card, CardContent } from "@/components/ui/card";
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

                <h3 className="font-semibold text-base">Value Definitions</h3>
                <p>
                  The timeline data is derived from <b>runtime logs</b> that
                  store the start and end times for each state period. Example
                  structure:
                </p>

                <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">
                  {`[
  { start: "07:00", end: "14:00", status: "RUNNING" },
  { start: "14:00", end: "15:00", status: "STOP" },
  { start: "15:00", end: "20:00", status: "RUNNING" },
  { start: "20:00", end: "21:00", status: "WARNING" }
]`}
                </pre>

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
              <div className="h-[200px] w-[400px]">
                <MiniChartCard />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </Card>
    </main>
  );
}
