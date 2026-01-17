// lib/state.js
// Central state + sampling + CSV writing
import fs from "node:fs";
import path from "node:path";
import { fmt } from "./numFormat";
import { start } from "node:repl";
import { Scale } from "lucide-react";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ---- current state (latest values shown in cards) ----
export const state = {
  // Power Status
  M1: 0, //Conveyor Machine 1
  conv1: 0,
  conv2: 0,
  U1: 0, //Pump Unit 1
  U2: 0, //Pump Unit 2
  Lp: 0, //Lamp

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

  mqttConnected: false,

  current: {
    start: nowISO(),
    end: nowISO(),
    status: "SYSTEM_OFF", // initial
    reason: "System startup",
    source: "system",
  },

  lastMessageAt: null,
};

const SCALE = {
  V1: 0.1,
  C1: 0.001,
  P1: 0.1,
  E1: 1,
  F1: 0.1,
  Q1: 0.01,

  V2: 0.1,
  C2: 0.001,
  P2: 0.1,
  E2: 1,
  F2: 0.1,
  Q2: 0.01,

  Temp: 0.01,
};

export const buffers = {
  conveyor: [],
  pump: [],
  tv: [],
  runtime: [],
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

const MAX_POINTS = 1440; // keep ~2h if 1 point = 5s

function pushBuffer(name, point) {
  const arr = buffers[name];
  arr.push(point);
  if (arr.length > MAX_POINTS) {
    arr.shift(); // remove oldest
  }
}
function replaceBuffer(name, data) {
  // runtime comes as an ARRAY already
  if (!Array.isArray(data)) {
    buffers[name] = [];
    return;
  }

  // replace ENTIRE buffer
  buffers[name] = data;
}

function normalizeIncoming(msg) {
  const out = {};

  for (const [key, value] of Object.entries(msg)) {
    if (key in SCALE) {
      out[key] = fmt(Number(value) * SCALE[key]);
    } else if (value === "0000") {
      out[key] = 0;
    } else {
      // digital / flags / already OK
      out[key] = fmt(Number(value) || value);
    }
  }

  return out;
}

export function onIncomingRuntime(runtimeArray) {
  const latest = runtimeArray.at(-1);
  if (!latest) return;

  state.current = { ...latest };
  replaceBuffer("runtime", runtimeArray);
}

export function onIncoming(msg) {
  state.lastMessageAt = Date.now();

  // 1️⃣ Normalize & merge
  const data = normalizeIncoming(msg);
  Object.assign(state, data);

  // 2️⃣ Machine → device propagation
  // if ("Machine1" in data) {
  //   const v = Number(data.Machine1) ? 1 : 0;
  //   state.conv1 = state.conv2 = state.conv3 = state.conv4 = v;
  // }

  // if ("Machine2" in data) {
  //   const v = Number(data.Machine2) ? 1 : 0;
  //   state.ship1 = state.ship2 = v;
  // }

  // 3️⃣ STATUS CHANGE DETECTION (runtime history)
  // Machine1 is your MAIN runtime source
  if ("Machine1" in data) {
    const running = Number(data.Machine1) === 1;

    if (running) {
      changeStatus("RUNNING", null, "sensor");
    } else {
      changeStatus("STOP", null, "sensor");
    }
  }

  // Optional warning detection
  if (Number(state.warning) === 1) {
    changeStatus("WARNING", "Sensor warning", "sensor");
  }

  // 4️⃣ Rolling buffers (5s resolution)
  const now = Date.now();

  const cPoint = {
    t: now,
    voltage: Number(state.V1) || 0,
    current: Number(state.C1) || 0,
    power: Number(state.P1) || 0,
    energy: Number(state.E1) || 0,
    frequency: Number(state.F1) || 0,
    pf: Number(state.Q1) || 0,
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
    temperature: Number(state.Temp) || 0,
    vibrationX: Number(state.VibX) || 0,
    vibrationY: Number(state.VibY) || 0,
    vibrationZ: Number(state.VibZ) || 0,
  };
  pushBuffer("tv", tvPoint);
  console.log("DATA:", data);
  console.log("STATE:", state);
  if ("M1" in data) {
    const decoded = decodeMachineBits(data.M1);
    if ((state.conv1 === 1 || state.conv2 === 1) && decoded.conv1 === 0) {
      // Notifikation for reason of the stop
      // off : normal maintance emergency
      useNotificationStore.getState().addAlert({
        id: crypto.randomUUID(),
        type: "AUTO_STOP",
        title: "Machine stopped",
        message: "Machine stopped automatically. Please select a reason.",
        requiresInput: true,
        acknowledged: false,
        createdAt: Date.now(),
      });
    }
    state.Lp = decoded.Lp;
    state.U1 = decoded.U1;
    state.U2 = decoded.U2;
    state.conv1 = decoded.conv1;
    state.conv2 = decoded.conv2;
  }
}

function decodeMachineBits(dec) {
  const v = Number(dec) || 0;

  return {
    conv2: v & 0b00001 ? 1 : 0,
    conv1: v & 0b00010 ? 1 : 0,
    U2: v & 0b00100 ? 1 : 0,
    U1: v & 0b01000 ? 1 : 0,
    Lp: v & 0b10000 ? 1 : 0,
  };
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
    k === "time" ? new Date().toISOString() : avg(samples, k),
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
      "time,voltage,current,power,energy,frequency,pf",
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
      "time,voltage,current,power,energy,frequency,pf,lvl1,lvl2",
    );
    flushGroup(
      "tv",
      ["time", "temperature", "vibrationX", "vibrationY", "vibrationZ"],
      "time,temperature,vibrationX,vibrationY,vibrationZ",
    );
  }, 60_000);
}

export function setAutoControl(type, enabled) {
  if (type === "pump") state.autoPumpControl = enabled;
  if (type === "lamp") state.autoLampControl = enabled;
}

/* ==============================
   CONFIG
================================ */
const HISTORY_DIR = path.join(process.cwd(), "data");
const HISTORY_FILE = historyFilePath();

function historyFilePath(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return path.join(HISTORY_DIR, `runtime_history_${y}-${m}-${d}.csv`);
}

/* ==============================
   HELPERS
================================ */
// function nowISO() {
//   return new Date().toISOString();
// }

function nowISO() {
  const d = new Date();
  const tzOffsetMs = d.getTimezoneOffset() * 60000;
  const localISO = new Date(d - tzOffsetMs).toISOString().slice(0, -1); // remove Z

  return localISO; // "2026-01-15T16:47:00.000"
}

function ensureHistoryFile(filePath) {
  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "start,end,status,reason,source\n", "utf8");
  }
}

function appendHistory(entry) {
  ensureHistoryFile(historyFilePath());

  const line = [
    entry.start,
    entry.end,
    entry.status,
    entry.reason ?? "",
    entry.source ?? "system",
  ]
    .map((v) => `"${String(v).replace(/"/g, '""')}"`)
    .join(",");

  fs.appendFileSync(HISTORY_FILE, line + "\n", "utf8");
}

function replaceLastHistoryRow(filePath, newRow) {
  ensureHistoryFile(filePath);

  const content = fs.readFileSync(filePath, "utf8").trim();
  const lines = content.split("\n");

  if (lines.length <= 1) return; // header only

  const header = lines[0];
  const data = lines.slice(1);

  data[data.length - 1] = [
    newRow.start,
    newRow.end,
    newRow.status,
    newRow.reason ?? "",
    newRow.source ?? "system",
  ].join(",");

  fs.writeFileSync(filePath, [header, ...data].join("\n") + "\n", "utf8");
}

export function updateRuntimeEnd() {
  if (!state.current) return;
  replaceLastHistoryRow(historyFilePath(), {
    ...state.current,
    end: nowISO(),
  });
}

/* ==============================
   CORE: STATUS CHANGE
================================ */
function changeStatus(newStatus, reason = null, source = "system") {
  const now = nowISO();

  if (state.current.status === newStatus) return;

  // close previous state
  appendHistory(historyFilePath(), {
    start: state.current.start,
    end: nowISO(),
    status: state.current.status,
    reason: state.current.reason,
    source: state.current.source,
  });

  // open new state
  state.current = {
    start: now,
    end: now,
    status: newStatus,
    reason,
    source,
  };

  console.log(
    `[STATE] ${state.current.status} @ ${now} (${reason ?? "no reason"})`,
  );
}

/* ==============================
   MQTT HANDLERS
================================ */
export function onMqttConnect() {
  state.mqttConnected = true;

  changeStatus("RUNNING", "MQTT connected", "system");
}

export function onMqttDisconnect() {
  state.mqttConnected = false;

  changeStatus("DISCONNECTED", "MQTT disconnected", "system");
}

/**
 * Incoming MQTT JSON payload handler
 * Called from mqtt/route.js
 */
/* ==============================
   MANUAL ACTIONS (UI)
================================ */
export function manualStop(reason) {
  changeStatus("STOP", reason, "manual");
}

export function manualStart() {
  changeStatus("RUNNING", null, "manual");
}

/* ==============================
   SYSTEM POWER LOSS LOGIC
================================ */
export function systemShutdown() {
  changeStatus("SYSTEM_OFF", "System shutdown / power loss", "system");
}

/* ==============================
   HEALTH CHECK (optional timer)
================================ */
export function checkMqttHeartbeat(timeoutMs = 15000) {
  if (!state.mqttConnected) return;

  if (state.lastMessageAt && Date.now() - state.lastMessageAt > timeoutMs) {
    changeStatus("DISCONNECTED", "No MQTT heartbeat", "system");
  }
}

/* ==============================
   EXPORT
================================ */
export function getCurrentState() {
  return state.current;
}

export function getHistoryFilePath() {
  return HISTORY_FILE;
}
