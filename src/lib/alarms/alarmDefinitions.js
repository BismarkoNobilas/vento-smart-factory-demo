export const ALARMS = [
  // ======================
  // MECHANICAL
  // ======================

  {
    id: "VIBRATION_OVERALL",
    title: "Getaran Tinggi Overall",
    type: "Trip",
    source: "Motor 1",

    check: (d) => Math.max(d.vibrationX, d.vibrationY, d.vibrationZ),

    warning: null,
    critical: 2800,

    parameter: "VibX/VibY/VibZ",
    why: "Unbalance, misalignment, mounting buruk, keausan bearing, grease rusak",
    prevention:
      "Balancing, alignment, perkuat fondasi, pelumasan tepat, penggantian bearing, kencangkan baut",
  },

  {
    id: "BEARING_TEMP_HIGH",
    title: "Temperatur Bearing Tinggi",
    type: "Warning",
    source: "Motor 1",

    check: (d) => d.temperature,

    warning: 40,
    critical: null,

    parameter: "Temperature",
    why: "Gesekan tinggi, grease kurang, overload, pendinginan buruk",
    prevention: "Relubrikasi",
  },

  // ======================
  // ELECTRICAL – VOLTAGE
  // ======================

  {
    id: "OVER_VOLTAGE",
    title: "Over Voltage",
    type: "Trip",
    source: "Panel",

    check: (d) => d.V1 > 300,

    warning: null,
    critical: true,

    parameter: "V1",
    why: "Gangguan suplai listrik",
    prevention: "Stabilizer, setting panel",
  },

  {
    id: "UNDER_VOLTAGE",
    title: "Under Voltage",
    type: "Trip",
    source: "Panel",

    check: (d) => d.V1 < 260,

    warning: null,
    critical: true,

    parameter: "V1",
    why: "Listrik lemah",
    prevention: "Perbaiki suplai listrik",
  },

  // ======================
  // ELECTRICAL – CURRENT
  // ======================

  {
    id: "OVER_CURRENT",
    title: "Over Current",
    type: "Trip",
    source: "Motor 1",

    check: (d) => d.C1 > 0.75,

    warning: null,
    critical: true,

    parameter: "A1",
    why: "Beban berlebih, bearing macet",
    prevention: "Sesuaikan kapasitas motor, cek bearing",
  },
  //cubix
  //shape
  {
    id: "UNDER_CURRENT",
    title: "Under Current",
    type: "Trip",
    source: "Motor 1",

    check: (d) => d.C1 < 0.05,

    warning: null,
    critical: true,

    parameter: "A1",
    why: "Kehilangan beban, slip",
    prevention: "Cek mekanik beban",
  },

  {
    id: "LOCKED_ROTOR",
    title: "Locked Rotor / Stalling",
    type: "Trip",
    source: "Motor 1",

    check: (d) => d.C1,

    warning: null,
    critical: 20,

    parameter: "A1",
    why: "Poros macet",
    prevention: "Inspeksi mekanik",
  },

  // ======================
  // POWER QUALITY
  // ======================

  {
    id: "LOW_POWER_FACTOR",
    title: "Power Factor Rendah",
    type: "Warning",
    source: "Panel",

    check: (d) => d.Q1,

    warning: 0.7,
    critical: null,

    parameter: "Q1",
    why: "Beban reaktif tinggi",
    prevention: "Pasang kapasitor",
  },

  // ======================
  // COMBINATION ALARMS
  // ======================

  {
    id: "ELECTRICAL_FAULT_EARLY",
    title: "Electrical Fault Early",
    type: "Warning",
    source: "Motor 1",

    check: (d) =>
      d.C1 > 0.7 && Math.max(d.vibrationX, d.vibrationY, d.vibrationZ) > 3000,

    warning: true,
    critical: null,

    parameter: "A1 + Vib",
    why: "Masalah rotor/stator awal",
    prevention: "Inspeksi listrik dan mekanik",
  },

  {
    id: "OVERLOAD_THERMAL",
    title: "Overload Thermal",
    type: "Trip",
    source: "Motor 1",

    check: (d) => d.C1 > 0.5 && d.temperature > 90,

    warning: null,
    critical: true,

    parameter: "A1 + Temp",
    why: "Beban berlebih terus-menerus",
    prevention: "Proteksi overload",
  },

  {
    id: "BEARING_SEIZURE",
    title: "Bearing Seizure",
    type: "Trip",
    source: "Motor 1",

    check: (d) =>
      d.C1 > 0.5 &&
      d.temperature > 95 &&
      Math.max(d.vibrationX, d.vibrationY, d.vibrationZ) > 4000,

    warning: null,
    critical: true,

    parameter: "A1 + Vib + Temp",
    why: "Bearing hampir macet",
    prevention: "Shutdown terkontrol",
  },

  {
    id: "PHASE_LOSS",
    title: "Phase Loss",
    type: "Trip",
    source: "Panel",

    check: (d) => d.C1 === 0,

    warning: null,
    critical: true,

    parameter: "A1",
    why: "Sekring putus, kabel lepas",
    prevention: "Proteksi phase loss",
  },
];
