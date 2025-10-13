// src/data/demoData.js

import MiniChart from "@/components/custom/MiniChart";

export const chartData = [
  {
    t: "2025-09-10T02:51:34.965Z",
    Current1: 0.0281,
    Current2: 0.0534,
    Voltage1: 228.903,
    Voltage2: 228.172,
    Energy1: 12,
    Energy2: 46,
    Power1: 2.073,
    Power2: 5.413,
    PF1: 0.328,
    PF2: 0.437,
  },
  {
    t: "2025-09-10T03:51:34.965Z",
    Current1: 0.0839,
    Current2: 0.0587,
    Voltage1: 230.306,
    Voltage2: 228.48,
    Energy1: 13,
    Energy2: 48,
    Power1: 3.18,
    Power2: 6.064,
    PF1: 0.334,
    PF2: 0.441,
  },
  {
    t: "2025-09-10T04:51:34.965Z",
    Current1: 0.0785,
    Current2: 0.0722,
    Voltage1: 228.636,
    Voltage2: 228.903,
    Energy1: 15,
    Energy2: 50,
    Power1: 7.956,
    Power2: 7.07,
    PF1: 0.342,
    PF2: 0.388,
  },
  {
    t: "2025-09-10T05:51:34.965Z",
    Current1: 0.0525,
    Current2: 0.078,
    Voltage1: 228.223,
    Voltage2: 229.74,
    Energy1: 16,
    Energy2: 52,
    Power1: 5.343,
    Power2: 7.053,
    PF1: 0.448,
    PF2: 0.393,
  },
  {
    t: "2025-09-10T06:51:34.965Z",
    Current1: 0.0533,
    Current2: 0.0777,
    Voltage1: 228.236,
    Voltage2: 230.056,
    Energy1: 19,
    Energy2: 55,
    Power1: 5.4,
    Power2: 7.226,
    PF1: 0.444,
    PF2: 0.395,
  },
  {
    t: "2025-09-10T07:51:34.965Z",
    Current1: 0.0558,
    Current2: 0.0412,
    Voltage1: 228.25,
    Voltage2: 229.04,
    Energy1: 21,
    Energy2: 57,
    Power1: 5.58,
    Power2: 7.4,
    PF1: 0.44,
    PF2: 0.39,
  },
];
export const logData = [
  { start: "07:00", end: "14:00", status: "RUNNING" },
  { start: "14:00", end: "15:00", status: "STOP" },
  { start: "15:00", end: "20:00", status: "RUNNING" },
  { start: "20:00", end: "21:00", status: "WARNING" },
  { start: "21:00", end: "23:30", status: "RUNNING" },
];

export const logData2 = [
  { start: "07:00", end: "14:00", status: "RUNNING" },
  { start: "14:00", end: "15:00", status: "STOP" },
  { start: "15:00", end: "20:00", status: "RUNNING" },
  { start: "20:00", end: "21:00", status: "STOP" },
  { start: "21:00", end: "23:30", status: "STOP" },
];

export const logData3 = [
  { start: "07:00", end: "14:00", status: "RUNNING" },
  { start: "14:00", end: "15:00", status: "STOP" },
  { start: "15:00", end: "20:00", status: "RUNNING" },
  { start: "20:00", end: "21:00", status: "WARNING" },
  { start: "21:00", end: "23:30", status: "WARNING" },
];

export const machineStatuses = [
  { name: "Package Machine", status: "RUNNING" },
  { name: "Filling Machine", status: "WARNING" },
  { name: "Water Pump", status: "STOP" },
];

export const overlays = [
  {
    type: "card",
    title: "Pack Production",
    value: 162,
    unit: "Unit",
    color: "text-orange-600",
    pos: { top: "70%", left: "18%" }, // was 280px / 178px
    width: 100,
  },
  {
    type: "card",
    title: "Bottle Production",
    value: 1944,
    unit: "Unit",
    color: "text-blue-700",
    pos: { top: "45%", left: "28.5%" }, // was 230px / 335px
    width: 110,
  },
  {
    type: "card",
    title: "Water Tank",
    value: 1,
    unit: "",
    color: "text-blue-500",
    pos: { top: "14.5%", left: "62.5%" }, // was 230px / 335px
    width: 110,
  },
  {
    type: "card",
    title: "Water Tank",
    value: 2,
    unit: "",
    color: "text-blue-500",
    pos: { top: "24%", left: "73.5%" }, // was 230px / 335px
    width: 110,
  },
];

export const productionData = [
  { day: "2025-09-01", count: 164 },
  { day: "2025-09-02", count: 187 },
  { day: "2025-09-03", count: 192 },
  { day: "2025-09-04", count: 178 },
  { day: "2025-09-05", count: 205 },
  { day: "2025-09-06", count: 221 },
  { day: "2025-09-07", count: 198 },
  { day: "2025-09-08", count: 232 },
  { day: "2025-09-09", count: 244 },
  { day: "2025-09-10", count: 211 },
  { day: "2025-09-11", count: 183 },
  { day: "2025-09-12", count: 207 },
  { day: "2025-09-13", count: 196 },
  { day: "2025-09-14", count: 223 },
  { day: "2025-09-15", count: 218 },
  { day: "2025-09-16", count: 202 },
  { day: "2025-09-17", count: 190 },
  { day: "2025-09-18", count: 176 },
  { day: "2025-09-19", count: 210 },
  { day: "2025-09-20", count: 187 },
  { day: "2025-09-21", count: 231 },
  { day: "2025-09-22", count: 249 },
  { day: "2025-09-23", count: 213 },
  { day: "2025-09-24", count: 222 },
  { day: "2025-09-25", count: 188 },
  { day: "2025-09-26", count: 195 },
  { day: "2025-09-27", count: 208 },
  { day: "2025-09-28", count: 174 },
  { day: "2025-09-29", count: 205 },
  { day: "2025-09-30", count: 162 },
];

// lib/demoData.js

// --- Helper: random step within ±percentage ---
function smoothStep(prev, range = 5, min = 0, max = 100) {
  const change = (Math.random() * 2 - 1) * range; // -range to +range
  let next = prev + change;
  if (next < min) next = min + Math.random() * 2;
  if (next > max) next = max - Math.random() * 2;
  return parseFloat(next.toFixed(1));
}

// --- 1. Production Data (60 points) ---
function generateProductionData() {
  const data = [];
  const now = Date.now();
  let prev = 200;

  for (let i = 0; i < 60; i++) {
    prev = smoothStep(prev, 5, 150, 250);
    const time = new Date(now - (60 - i) * 60000);
    data.push({
      t: time.toISOString(),
      count: prev,
    });
  }
  return data;
}

// --- 2. OEE Data (gradual randomization) ---
let prevOEE = {
  Availability: 90,
  Performance: 88,
  Quality: 93,
};

function generateOEEData() {
  prevOEE = {
    Availability: smoothStep(prevOEE.Availability, 3, 60, 100),
    Performance: smoothStep(prevOEE.Performance, 3, 60, 100),
    Quality: smoothStep(prevOEE.Quality, 3, 70, 100),
  };

  const { Availability, Performance, Quality } = prevOEE;
  const Overall = (Availability * Performance * Quality) / 10000;

  return {
    Availability: Availability.toFixed(1),
    Performance: Performance.toFixed(1),
    Quality: Quality.toFixed(1),
    Overall: Overall.toFixed(1),
  };
}

// --- 3. Production Quantity ---
let productionCount = 1;
function getProductionQuantity() {
  productionCount = productionCount >= 500 ? 1 : productionCount + 1;
  return productionCount;
}

// --- 4. Water Level Data (smooth) ---
let prevWater = { tank1: 70, tank2: 55 };

function generateWaterLevel() {
  prevWater = {
    tank1: smoothStep(prevWater.tank1, 2, 30, 100),
    tank2: smoothStep(prevWater.tank2, 2, 20, 90),
  };
  return {
    tank1: parseFloat(prevWater.tank1.toFixed(1)),
    tank2: parseFloat(prevWater.tank2.toFixed(1)),
  };
}

// --- Export all generators ---
export {
  generateProductionData,
  generateOEEData,
  getProductionQuantity,
  generateWaterLevel,
};

// === RUNTIME DATA DEMO ===
export const runtimeData = [
  {
    id: "Machine 1",
    title: "Packaging Machine",
    type: "runtime",
    logs: logData,
    status: "RUNNING",
    statusColor: "bg-green-500",
    warning: "OK",
    warningColor: "bg-green-500",
    bgColor: "bg-white",
  },
  {
    id: "Machine 2",
    title: "Water Filling Machine",
    type: "runtime",
    logs: logData3,
    status: "RUNNING",
    statusColor: "bg-green-500",
    warning: "WARNING",
    warningColor: "bg-orange-500",
  },
  {
    id: "Machine 3",
    title: "Water Tank Pump",
    type: "runtime",
    logs: logData2,
    status: "STOP",
    statusColor: "bg-red-500",
    warning: "OK",
    warningColor: "bg-green-500",
    className: "col-span-2",
  },
];

export const machine1Data = [
  {
    id: "Motor 1",
    cards: [
      {
        type: "runtime",
        logs: logData,
        title: "Motor 1",
        status: "RUNNING",
        statusColor: "bg-green-500",
        warning: "OK",
        warningColor: "bg-green-500",
        className: "col-span-2",
      },
      {
        type: "temperature",
        value: 62,
      },
      {
        type: "gauge",
        title: "Power",
        value: 10,
        unit: "Watt",
        min: 0,
        max: 12,
      },

      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current1",
        unit: "A",
        colSpan: 2,
      },

      {
        type: "metric",
        title: "Voltage",
        value: 220,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage1"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },

      { type: "metric", title: "Vibration", value: 20, unit: "mm/s" },
    ],
  },

  {
    id: "Motor 2",
    cards: [
      {
        type: "runtime",
        logs: logData,
        title: "Motor 2",
        status: "RUNNING",
        statusColor: "bg-green-500",
        warning: "OK",
        warningColor: "bg-green-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 55 },
      {
        type: "gauge",
        title: "Power",
        value: 8,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current1",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 215,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage1"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      {
        type: "metric",
        title: "Vibration",
        value: 14,
        unit: "mm/s",
      },
    ],
  },

  {
    id: "Motor 3",
    cards: [
      {
        type: "runtime",
        logs: logData,
        title: "Motor 3",
        status: "RUNNING",
        statusColor: "bg-green-500",
        warning: "OK",
        warningColor: "bg-green-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 68 },
      {
        type: "gauge",
        title: "Power",
        value: 9,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current1",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 222,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage1"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      {
        type: "metric",
        title: "Vibration",
        value: 13,
        unit: "mm/s",
      },
    ],
  },
  {
    id: "Motor 4",
    cards: [
      {
        type: "runtime",
        logs: logData,
        title: "Motor 4",
        status: "RUNNING",
        statusColor: "bg-green-500",
        warning: "OK",
        warningColor: "bg-green-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 58 },
      {
        type: "gauge",
        title: "Power",
        value: 11,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current1",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 230,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage1"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      {
        type: "metric",
        title: "Vibration",
        value: 16,
        unit: "mm/s",
      },
    ],
  },
];
// === MACHINE 2 (2 Motors) ===
export const machine2Data = [
  {
    id: "Motor 1",
    cards: [
      {
        type: "runtime",
        logs: logData2,
        title: "Motor 1",
        status: "RUNNING",
        statusColor: "bg-green-500",
        warning: "OK",
        warningColor: "bg-green-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 61 },
      {
        type: "gauge",
        title: "Power",
        value: 9.5,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current2",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 218,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage2"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      { type: "metric", title: "Vibration", value: 15, unit: "mm/s" },
    ],
  },
  {
    id: "Motor 2",
    cards: [
      {
        type: "runtime",
        logs: logData2,
        title: "Motor 2",
        status: "STOP",
        statusColor: "bg-red-500",
        warning: "No Signal",
        warningColor: "bg-red-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 49 },
      {
        type: "gauge",
        title: "Power",
        value: 6.5,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current2",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 210,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage2"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      { type: "metric", title: "Vibration", value: 10, unit: "mm/s" },
    ],
  },
];

// === MACHINE 3 (2 Motors) ===
export const machine3Data = [
  {
    id: "Motor 1",
    cards: [
      {
        type: "runtime",
        logs: logData3,
        title: "Motor 1",
        status: "WARNING",
        statusColor: "bg-yellow-400",
        warning: "High Temp",
        warningColor: "bg-yellow-400",
        className: "col-span-2",
      },
      { type: "temperature", value: 70 },
      {
        type: "gauge",
        title: "Power",
        value: 10.2,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current2",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 223,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage2"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      { type: "metric", title: "Vibration", value: 17, unit: "mm/s" },
    ],
  },
  {
    id: "Motor 2",
    cards: [
      {
        type: "runtime",
        logs: logData3,
        title: "Motor 2",
        status: "RUNNING",
        statusColor: "bg-green-500",
        warning: "OK",
        warningColor: "bg-green-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 59 },
      {
        type: "gauge",
        title: "Power",
        value: 8.3,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current2",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 216,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage2"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      { type: "metric", title: "Vibration", value: 12, unit: "mm/s" },
    ],
  },
];

// === MACHINE 4 (3 Motors) ===
export const machine4Data = [
  {
    id: "Motor 1",
    cards: [
      {
        type: "runtime",
        logs: logData2,
        title: "Motor 1",
        status: "RUNNING",
        statusColor: "bg-green-500",
        warning: "OK",
        warningColor: "bg-green-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 60 },
      {
        type: "gauge",
        title: "Power",
        value: 9,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current4",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 219,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage4"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      { type: "metric", title: "Vibration", value: 15, unit: "mm/s" },
    ],
  },
  {
    id: "Motor 2",
    cards: [
      {
        type: "runtime",
        logs: logData3,
        title: "Motor 2",
        status: "RUNNING",
        statusColor: "bg-green-500",
        warning: "OK",
        warningColor: "bg-green-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 65 },
      {
        type: "gauge",
        title: "Power",
        value: 9.8,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current4",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 221,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage4"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      { type: "metric", title: "Vibration", value: 18, unit: "mm/s" },
    ],
  },
  {
    id: "Motor 3",
    cards: [
      {
        type: "runtime",
        logs: logData,
        title: "Motor 3",
        status: "STOP",
        statusColor: "bg-red-500",
        warning: "Disconnected",
        warningColor: "bg-red-500",
        className: "col-span-2",
      },
      { type: "temperature", value: 52 },
      {
        type: "gauge",
        title: "Power",
        value: 7.5,
        unit: "Watt",
        min: 0,
        max: 12,
      },
      {
        type: "chart",
        title: "Current",
        data: chartData,
        dataKey: "Current4",
        unit: "A",
        colSpan: 2,
      },
      {
        type: "metric",
        title: "Voltage",
        value: 210,
        unit: "V",
        chart: (
          <MiniChart
            data={chartData}
            dataKey="Voltage4"
            label="Voltage"
            domainAdd={5}
          />
        ),
      },
      { type: "metric", title: "Vibration", value: 11, unit: "mm/s" },
    ],
  },
];
