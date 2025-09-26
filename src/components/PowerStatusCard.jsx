"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WaterTankImage from "./WaterTankImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function PowerStatusCard({ data, onPublish, role }) {
  const [loading, setLoading] = useState(false);
  const [uptimes, setUptimes] = useState({
    Machine1: 0,
    Machine2: 0,
    Pump1: 0,
    Pump2: 0,
    Lamp: 0,
  });
  const [lastOn, setLastOn] = useState({});
  const [autoPump, setAutoPump] = useState(false);
  const [autoLamp, setAutoLamp] = useState(false);

  async function send(topicKey, value) {
    setLoading(true);
    try {
      console.log("this is " + value);
      const res = await fetch("/api/mqtt/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "/DownloadTopic",
          message: { [topicKey]: value },
        }),
      });

      const json = await res.json();
      console.log("📤 Publish result:", json);
    } catch (err) {
      console.error("Publish error:", err);
    }
    setLoading(false);
  }

  // let timer;
  // Track uptime
  useEffect(() => {
    const interval = setInterval(() => {
      setUptimes((prev) => {
        const next = { ...prev };
        ["Machine1", "Machine2", "Pump1", "Pump2", "Lamp"].forEach((k) => {
          if (data[k]) {
            if (!lastOn[k]) setLastOn((l) => ({ ...l, [k]: Date.now() }));
            const start = lastOn[k] || Date.now();
            next[k] = Date.now() - start;
          } else {
            next[k] = 0;
            setLastOn((l) => ({ ...l, [k]: null }));
          }
        });
        return next;
      });
    }, 1000);
    // fetch("/api/auto")
    //   .then((res) => res.json())
    //   .then((d) => {
    //     setAutoPump(d.autoPumpControl);
    //     setAutoLamp(d.autoLampControl);
    //   });

    // cycleLamp(); // start the cycle once component mounts

    // TURN OFF and ON Automaticly at 6 am then 5 pm
    // const autoLamp = setInterval(() => {
    //   const hour = new Date().getHours();
    //   if (hour === 6) send("Lamp", 0); // turn off at 6 AM
    //   if (hour === 17) send("Lamp", 1); // turn on at 5 PM
    // }, 3600000); // check every hour

    return () => {
      // clearTimeout(timer);
      clearInterval(interval);
      // clearInterval(autoLamp);
    };
  }, [data, lastOn]);

  // let isOn = false;
  // function cycleLamp() {
  //   if (isOn) {
  //     // turn OFF after 1 min
  //     send("lamp", 0);
  //     isOn = false;
  //     timer = setTimeout(cycleLamp, 1 * 60 * 1000); // 1 min
  //   } else {
  //     // turn ON for 30 min
  //     send("lamp", 1);
  //     isOn = true;
  //     timer = setTimeout(cycleLamp, 30 * 60 * 1000); // 30 min
  //   }
  // }

  const formatDuration = (ms) => {
    const m = Math.floor(ms / 60000);
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return `${h}h ${mm}m`;
  };

  // async function toggleAuto(type, value) {
  //   if (type === "pump") setAutoPump(value);
  //   if (type === "lamp") setAutoLamp(value);

  //   await fetch("/api/auto", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ type, enabled: value }),
  //   });
  // }

  const Badge = ({ on }) => (
    <span
      className={`px-2 py-0.5 rounded text-xs ${
        on ? "bg-green-600" : "bg-slate-600"
      }`}
    >
      {on ? "ON" : "OFF"}
    </span>
  );

  return (
    <Card className="grid place-items-center w-full p-4 h-fit">
      <Tabs
        defaultValue="machs"
        className="grid place-items-center w-full gap-2"
      >
        <div className="col-span-3 h-fit flex justify-between w-full">
          <h3 className="font-bold">Power Controller</h3>
          <TabsList>
            <TabsTrigger value="machs">Machines</TabsTrigger>
            <TabsTrigger value="pumps">Pumps</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="machs" className="gap-2 grid h-fit">
          <div className="p-4 w-[504px] gap-1 h-fit grid grid-cols-2 bg-zinc-50 shadow-sm rounded">
            <div className="col-span-2 grid">
              <h3 className="font-bold">Machine 1 (Conveyor Packing)</h3>
              <span className="ml-4 text-blue-600 text-[11px]">
                {data.Machine1 ? formatDuration(uptimes["Machine1"]) : "0h 0m"}
              </span>
            </div>
            <div className="grid justify-center gap-3">
              <img src="mesin.png" alt="Motor" width={150} />
              <div className="flex justify-center items-center space-x-2">
                <span>OFF</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    disabled={loading || role === "Operator"}
                    checked={data.Machine1}
                    onChange={() => send("Machine1", data.Machine1 ? 0 : 1)}
                  />
                  <span className="slider round"></span>
                </label>
                <span>ON</span>
              </div>
            </div>
            <div className="grid auto-flow-col grid-cols-2">
              <img
                src={`${
                  data.Machine1
                    ? "conveyor-running.gif"
                    : "conveyor-running.gif"
                }`}
                alt="Coveyor 1"
                width={100}
                height={100}
              />
              <img
                src={`${
                  data.Machine1
                    ? "conveyor-running.gif"
                    : "conveyor-running.gif"
                }`}
                alt="Coveyor 2"
                width={100}
                height={100}
              />
              <img
                src={`${
                  data.Machine1
                    ? "conveyor-running.gif"
                    : "conveyor-running.gif"
                }`}
                alt="Coveyor 3"
                width={100}
                height={100}
              />
              <img
                src={`${
                  data.Machine1
                    ? "conveyor-running.gif"
                    : "conveyor-running.gif"
                }`}
                alt="Coveyor 4"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="p-4 w-[504px] gap-1 h-fit grid grid-cols-2 bg-zinc-50 shadow-sm rounded">
            <div className="col-span-2 grid">
              <h3 className="font-bold">Machine 2 (Conveyor Shipping)</h3>
              <span className="ml-4 text-blue-600 text-[10px]">
                {data.Machine2 ? formatDuration(uptimes["Machine1"]) : "0h 0m"}
              </span>
            </div>
            <div className="grid justify-center gap-3">
              <img src="mesin.png" alt="Motor" width={150} />
              <div className="flex justify-center items-center space-x-2">
                <span>OFF</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    disabled={loading || role === "Operator"}
                    checked={data.Machine2}
                    onChange={() => send("Machine1", data.Machine2 ? 0 : 1)}
                  />
                  <span className="slider round"></span>
                </label>
                <span>ON</span>
              </div>
            </div>
            <div className="grid auto-flow-col grid-cols-2">
              <img
                src={`${
                  data.Machine2
                    ? "conveyor-running.gif"
                    : "conveyor-running.gif"
                }`}
                alt="Coveyor 1"
                width={100}
                height={100}
              />
              <img
                src={`${
                  data.Machine2
                    ? "conveyor-running.gif"
                    : "conveyor-running.gif"
                }`}
                alt="Coveyor 2"
                width={100}
                height={100}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="pumps" className="gap-2 grid w-full h-fit">
          <div className="p-4 w-[300px] gap-1 h-fit grid grid-cols-2 bg-zinc-50 shadow-sm rounded">
            <div className="grid">
              <h3 className="font-bold">Pump 1</h3>
              <span className="ml-4 text-blue-600 text-[10px]">
                {data.Pump1 ? formatDuration(uptimes["Pump1"]) : "0h 0m"}
              </span>
            </div>
            <div className="grid justify-center row-start-2">
              <img className="" src="motor-off.svg" alt="Motor" width={120} />
              <div className="flex justify-center items-center space-x-2">
                <span>OFF</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    disabled={loading || role === "Operator"}
                    checked={data.Pump1}
                    onChange={() => send("Machine1", data.Pump1 ? 0 : 1)}
                  />
                  <span className="slider round"></span>
                </label>
                <span>ON</span>
              </div>
            </div>
            <div className="row-span-2 items-center">
              <WaterTankImage label="Pump 1" level={70} />
            </div>
          </div>
          <div className="p-4 w-[300px] gap-1 h-fit grid grid-cols-2 bg-zinc-50 shadow-sm rounded">
            <div className="grid">
              <h3 className="font-bold">Pump 2</h3>
              <span className="ml-4 text-blue-600 text-[10px]">
                {data.Pump1 ? formatDuration(uptimes["Pump2"]) : "0h 0m"}
              </span>
            </div>
            <div className="grid justify-center row-start-2">
              <img className="" src="motor-off.svg" alt="Motor" width={120} />
              <div className="flex justify-center items-center space-x-2">
                <span>OFF</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    disabled={loading || role === "Operator"}
                    checked={data.Pump2}
                    onChange={() => send("Machine1", data.Pump2 ? 0 : 1)}
                  />
                  <span className="slider round"></span>
                </label>
                <span>ON</span>
              </div>
            </div>
            <div className="row-span-2 items-center">
              <WaterTankImage label="Pump 2" level={80} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

{
  /* 
  DEMO: Auto ON/OFF lamp
        Add this inside useEffect to simulate:
        
        const autoLamp = setInterval(() => {
          const hour = new Date().getHours();
          if (hour === 6) send("lamp", 0); // turn off at 6 AM
          if (hour === 17) send("lamp", 1); // turn on at 5 PM
        }, 3600000);
        return () => clearInterval(autoLamp);
      */
}
{
  /*
        
  
         Pump 1 & 2 
        {[
          { key: "Pump1", label: "Water Pump 1" },
          { key: "Pump2", label: "Water Pump 2" },
        ].map(({ key, label }) => (
          <div key={key} className="mb-2 flex items-center gap-3">
            <div className="font-semibold w-60">{label}</div>
            <Badge on={!!data[key]} />
            <span className="ml-3 text-xs text-blue-600">
              {data[key] ? formatDuration(uptimes[key]) : "0h 0m"}
            </span>
            <Button
              className={`ml-auto px-3 py-1 rounded-full ${
                data[key]
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading || role === "Operator"}
              onClick={() => send(key, data[key] ? 0 : 1)}
            >
              {data[key] ? "Turn OFF" : "Turn ON"}
            </Button>
          </div>
        ))}
        <div className="grid grid-cols-6 items-center">
          <div className="col-span-4"></div>
          <span className="w-40">Auto Pump :</span>
          <Button
            onClick={() => toggleAuto("pump", !autoPump)}
            className={`ml-auto px-3 py-1 rounded-full
            ${
              autoPump
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }
            `}
            disabled={loading || role !== "Manager"}
          >
            {autoPump ? "Turn OFF" : "Turn ON"}
          </Button>
        </div>

        /* Lamp (display only as requested) *
        <div className="mt-3 flex items-center gap-3">
          <div className="font-semibold w-60">Lamp</div>
          <Badge on={!!data.Lamp} />
          <span className="ml-3 text-xs text-blue-600">
            {data.Lamp ? formatDuration(uptimes["Lamp"]) : "0h 0m"}
          </span>
          <Button
            className={`ml-auto px-3 py-1 rounded-full 
            ${
              data.Lamp
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading || role === "Operator"}
            onClick={() => send("Lamp", data.Lamp ? 0 : 1)}
          >
            {data.Lamp ? "Turn OFF" : "Turn ON"}
          </Button>
        </div>
        <div className="grid grid-cols-6 items-center">
          <div className="col-span-4"></div>
          <span className="w-40">Auto Lamp :</span>
          <Button
            onClick={() => toggleAuto("lamp", !autoLamp)}
            className={`ml-auto px-3 py-1 rounded-full
              ${
                autoLamp
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
            disabled={loading || role !== "Manager"}
          >
            {autoLamp ? "Turn OFF" : "Turn ON"}
          </Button>
        </div>
      </Card>
*/
}
