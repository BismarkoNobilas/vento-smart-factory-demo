// lib/state.js
// Central state + sampling + CSV writing
import fs from "node:fs";
import path from "node:path";
import { fmt } from "./numFormat";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ---- current state (latest values shown in cards) ----
export const state = {
  // Power Status
  M1: 0,
  M2: 0,
  P1: 0,
  P2: 0,
  Lp: 0,

  // Conveyor metrics (c*)
  V1: 0,
  C1: 0,
  P1: 0,
  E1: 0,
  F1: 0,
  Q1: 0,

  // Pump metrics (p*)
  V2: 0,
  C2: 0,
  P2: 0,
  E2: 0,
  F2: 0,
  Q2: 0,
  Pm1L: 0,
  Pm1M: 0,
  Pm1H: 0,
  Pm2L: 0,
  Pm2M: 0,
  Pp2H: 0,

  // Derived displays for Machine 1 & 2 conveyors
  conv1: 0,
  conv2: 0,
  conv3: 0,
  conv4: 0, // follow Machine1
  ship1: 0,
  ship2: 0, // follow Machine2

  autoPumpControl: false, // 🔹 auto pump logic
  autoLampControl: false,

  Temp: 0,
  VibX: 0,
  VibY: 0,
  VibZ: 0,
};

export const buffers = {
  conveyor: [],
  pump: [],
  tv: [],
};

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

const MAX_POINTS = 144000; // keep ~2h if 1 point = 5s

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
    voltage: Number(state.V1) * 0.1 || 0,
    current: Number(state.C1) * 0.001 || 0,
    power: Number(state.P1) * 0.1 || 0,
    energy: Number(state.E1) || 0,
    frequency: Number(state.F1) * 0.1 || 0,
    pf: Number(state.Q1) * 0.01 || 0,
  };
  pushBuffer("conveyor", cPoint);

  const pPoint = {
    t: now,
    voltage: Number(state.V2) || 0,
    current: Number(state.C2) || 0,
    power: Number(state.P2) || 0,
    energy: Number(state.E2) || 0,
    frequency: Number(state.F2) || 0,
    pf: Number(state.Q2) || 0,
    lvl1: Number(state.Pm1L + state.Pm1M + state.Pm1H) || 0,
    lvl2: Number(state.Pm2L + state.Pm2M + state.Pm2H) || 0,
  };
  pushBuffer("pump", pPoint);

  const tvPoint = {
    t: now,
    temperature: fmt(Number(state.Temp) * 0.01) || 0,
    vibrationX: Number(state.VibX) || 0,
    vibrationY: Number(state.VibY) || 0,
    vibrationZ: Number(state.VibZ) || 0,
  };
  pushBuffer("tv", tvPoint);
}

// Once/min write one row per group (avg of 5s samples)
function avg(arr, key) {
  if (!arr.length) return 0;
  return arr.reduce((s, x) => s + (Number(x[key]) || 0), 0) / arr.length;
}

function flushGroup(group, columns, header) {
  const samples = buffers[group];
  if (!samples.length) return;
  const row = columns.map((k) =>
    k === "time" ? new Date().toISOString() : avg(samples, k)
  );
  const file = csvPath(group);
  ensureHeader(file, header);
  fs.appendFileSync(file, row.join(",") + "\n", "utf8");
  buffers[group] = [];
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
    flushGroup(
      "tv",
      ["time", "temperature", "vibrationX", "vibrationY", "vibrationZ"],
      "time,temperature, vibrationX, vibrationY, vibrationZ"
    );
  }, 60_000);
}

export function setAutoControl(type, enabled) {
  if (type === "pump") state.autoPumpControl = enabled;
  if (type === "lamp") state.autoLampControl = enabled;
}

// lib/state.js

// export const connection = {
//   mqtt: {
//     status: "DISCONNECTED", // CONNECTING | CONNECTED | ERROR | STALE
//     url: null,
//     lastMessageAt: null,
//     lastError: null,
//   },
// };

// // lib/state.js
// const STALE_TIMEOUT = 10_000; // 10 seconds

// if (!globalThis.__mqtt_watchdog__) {
//   globalThis.__mqtt_watchdog__ = setInterval(() => {
//     const last = connection.mqtt.lastMessageAt;
//     if (
//       connection.mqtt.status === "CONNECTED" &&
//       last &&
//       Date.now() - last > STALE_TIMEOUT
//     ) {
//       connection.mqtt.status = "STALE";
//     }
//   }, 2000);
// }
