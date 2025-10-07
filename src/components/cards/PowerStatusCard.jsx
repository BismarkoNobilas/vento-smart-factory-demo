"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WaterTankImage from "../custom/WaterTankImage";
import MachineControlCard from "./MachineControlCard";
import PumpCard from "./PumpCard";

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
          <MachineControlCard
            id="Machine1"
            title="Machine 1 (Conveyor Packing)"
            data={data}
            uptimes={uptimes}
            loading={loading}
            role={role}
            send={send}
            conveyors={4}
          />

          <MachineControlCard
            id="Machine2"
            title="Machine 2 (Conveyor Shipping)"
            data={data}
            uptimes={uptimes}
            loading={loading}
            role={role}
            send={send}
            conveyors={2}
          />
        </TabsContent>
        <TabsContent value="pumps" className="gap-2 grid w-full h-fit">
          <PumpCard
            id="Pump1"
            label="Pump 1"
            data={data}
            uptimes={uptimes}
            loading={loading}
            role={role}
            send={send}
            level={70}
          />

          <PumpCard
            id="Pump2"
            label="Pump 2"
            data={data}
            uptimes={uptimes}
            loading={loading}
            role={role}
            send={send}
            level={80}
          />
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
