// src/data/demoData.js

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
  { name: "Filler Machine", status: "WARNING" },
  { name: "Water Pump", status: "STOP" },
];

export const overlays = [
  {
    type: "card",
    title: "Pack Production",
    value: 162,
    unit: "Unit",
    color: "text-orange-600",
    pos: { top: "57%", left: "23%" }, // was 280px / 178px
    width: 100,
  },
  {
    type: "card",
    title: "Bottle Production",
    value: 1944,
    unit: "Unit",
    color: "text-blue-700",
    pos: { top: "45%", left: "37%" }, // was 230px / 335px
    width: 110,
  },
  {
    type: "tank",
    height: "11.9vh",
    width: "0.69vw",
    color: "bg-green-500",
    skew: "-skew-y-22",
    pos: { top: "75.1%", left: "81.57%" },
  },
  {
    type: "tank",
    height: "3.8vh",
    width: "0.69vw",
    color: "bg-red-500",
    skew: "-skew-y-22",
    pos: { top: "77.9%", left: "71.69%" },
  },
];
