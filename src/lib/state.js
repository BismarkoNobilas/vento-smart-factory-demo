// lib/state.js
// Central state + sampling + CSV writing
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ---- current state (latest values shown in cards) ----
export const state = {
  // Power Status
  Machine1: 0,
  Machine2: 0,
  Pump1: 0,
  Pump2: 0,
  Lamp: 0,

  // Conveyor metrics (c*)
  Voltage1: 0,
  Current1: 0,
  Power1: 0,
  Energy1: 0,
  Freq1: 0,
  PF1: 0,

  // Pump metrics (p*)
  Voltage2: 0,
  Current2: 0,
  Power2: 0,
  Energy2: 0,
  Freq2: 0,
  PF2: 0,
  Pump1_Low: 0,
  Pump1_Mid: 0,
  Pump1_High: 0,
  Pump2_Low: 0,
  Pump2_Mid: 0,
  Pump2_High: 0,

  // Derived displays for Machine 1 & 2 conveyors
  conv1: 0,
  conv2: 0,
  conv3: 0,
  conv4: 0, // follow Machine1
  ship1: 0,
  ship2: 0, // follow Machine2

  autoPumpControl: false, // 🔹 auto pump logic
  autoLampControl: false,
};

// ---- 2h ring-buffers in memory (points every 5s) ----
const TWO_HOURS = 2 * 60 * 60 * 1000;
export const buffers = {
  conveyor: [], // {t, voltage, current, power, energy, frequency, pf}
  pump: [], // {t, voltage, current, power, energy, frequency, pf, lvl1, lvl2}
};

// function pushBuffer(name, point) {
//   const arr = buffers[name];
//   arr.push(point);
//   const cutoff = Date.now() - TWO_HOURS;
//   while (arr.length && arr[0].t < cutoff) arr.shift();
// }

// ---- CSV rotation helpers (one file per day) ----
function dayStamp(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function csvPath(group) {
  return path.join(DATA_DIR, `${group}-${dayStamp()}.csv`);
}
function ensureHeader(file, header) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, header + "\n", "utf8");
  }
}

// // ---- sample accumulation (5s samples → 1m CSV row) ----
// const accum = {
//   conveyor: [], // array of {voltage,...}
//   pump: [],
// };

// export function onIncoming(msg) {
//   // Merge into state
//   Object.assign(state, msg);

//   // Propagate machine → conveyors
//   if ("Machine1" in msg) {
//     const v = Number(msg.Machine1) ? 1 : 0;
//     state.conv1 = state.conv2 = state.conv3 = state.conv4 = v;
//   }
//   if ("Machine2" in msg) {
//     const v = Number(msg.Machine2) ? 1 : 0;
//     state.ship1 = state.ship2 = v;
//   }

//   // Build 5s points and push to buffers + minute accumulators
//   const now = Date.now();

//   const cPoint = {
//     t: now,
//     voltage: Number(state.Voltage1) || 0,
//     current: Number(state.Current1) || 0,
//     power: Number(state.Power1) || 0,
//     energy: Number(state.Energy1) || 0,
//     frequency: Number(state.Freq1) || 0,
//     pf: Number(state.PF1) || 0,
//   };
//   pushBuffer("conveyor", cPoint);
//   accum.conveyor.push(cPoint);

//   const pPoint = {
//     t: now,
//     voltage: Number(state.Voltage2) || 0,
//     current: Number(state.Current2) || 0,
//     power: Number(state.Power2) || 0,
//     energy: Number(state.Energy2) || 0,
//     frequency: Number(state.Freq2) || 0,
//     pf: Number(state.PF2) || 0,
//     lvl1: Number(state.Pump1_Low + state.Pump1_Mid + state.Pump1_High) || 0,
//     lvl2: Number(state.Pump2_Low + state.Pump2_Mid + state.Pump2_High) || 0,
//   };
//   pushBuffer("pump", pPoint);
//   accum.pump.push(pPoint);

//   // client.on("message", (topic, payload) => {
//   //   try {

//   //   } catch (e) {
//   //     console.error("❌ invalid JSON from MQTT2:", e.message);
//   //   }
//   // });
// }
// ---- sample accumulation (5s samples → 1m CSV row) ----
const accum = {
  conveyor: [], // array of {voltage,...}
  pump: [],
};

const MAX_POINTS = 1440; // keep ~2h if 1 point = 5s

function pushBuffer(name, point) {
  const arr = buffers[name];
  arr.push(point);
  if (arr.length > MAX_POINTS) {
    arr.shift(); // remove oldest
  }
}

export function onIncoming(msg) {
  // Merge into state
  Object.assign(state, msg);

  // Propagate machine → conveyors
  if ("Machine1" in msg) {
    const v = Number(msg.Machine1) ? 1 : 0;
    state.conv1 = state.conv2 = state.conv3 = state.conv4 = v;
  }
  if ("Machine2" in msg) {
    const v = Number(msg.Machine2) ? 1 : 0;
    state.ship1 = state.ship2 = v;
  }

  // Build 5s points and push to buffers (rolling window)
  const now = Date.now();

  const cPoint = {
    t: now,
    voltage: Number(state.Voltage1) || 0,
    current: Number(state.Current1) || 0,
    power: Number(state.Power1) || 0,
    energy: Number(state.Energy1) || 0,
    frequency: Number(state.Freq1) || 0,
    pf: Number(state.PF1) || 0,
  };
  pushBuffer("conveyor", cPoint);

  const pPoint = {
    t: now,
    voltage: Number(state.Voltage2) || 0,
    current: Number(state.Current2) || 0,
    power: Number(state.Power2) || 0,
    energy: Number(state.Energy2) || 0,
    frequency: Number(state.Freq2) || 0,
    pf: Number(state.PF2) || 0,
    lvl1: Number(state.Pump1_Low + state.Pump1_Mid + state.Pump1_High) || 0,
    lvl2: Number(state.Pump2_Low + state.Pump2_Mid + state.Pump2_High) || 0,
  };
  pushBuffer("pump", pPoint);
}

// Once/min write one row per group (avg of 5s samples)
function avg(arr, key) {
  if (!arr.length) return 0;
  return arr.reduce((s, x) => s + (Number(x[key]) || 0), 0) / arr.length;
}
function flushGroup(group, columns, header) {
  const samples = accum[group];
  if (!samples.length) return;
  const row = columns.map((k) =>
    k === "time" ? new Date().toISOString() : avg(samples, k)
  );
  const file = csvPath(group);
  ensureHeader(file, header);
  fs.appendFileSync(file, row.join(",") + "\n", "utf8");
  accum[group] = [];
}

// singleton timer (avoid duplicates in dev)
if (!globalThis.__csv_timer__) {
  globalThis.__csv_timer__ = setInterval(() => {
    flushGroup(
      "conveyor",
      ["time", "voltage", "current", "power", "energy", "frequency", "pf"],
      "time,voltage,current,power,energy,frequency,pf"
    );
    flushGroup(
      "pump",
      [
        "time",
        "voltage",
        "current",
        "power",
        "energy",
        "frequency",
        "pf",
        "lvl1",
        "lvl2",
      ],
      "time,voltage,current,power,energy,frequency,pf,lvl1,lvl2"
    );
  }, 60_000);
}

export function setAutoControl(type, enabled) {
  if (type === "pump") state.autoPumpControl = enabled;
  if (type === "lamp") state.autoLampControl = enabled;
}
