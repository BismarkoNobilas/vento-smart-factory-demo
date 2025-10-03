// lib/getInitialData.js
import { state, buffers } from "./state";

export async function getInitialData() {
  return {
    live: { ...state }, // snapshot of latest machine state
    conv: [...buffers.conveyor], // recent conveyor samples
    pump: [...buffers.pump], // recent pump samples
  };
}
