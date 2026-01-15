"use client";
import React from "react";

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function calcDuration(start, end) {
  const ms = new Date(end) - new Date(start);
  const min = Math.floor(ms / 60000);
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

const statusColor = {
  RUNNING: "bg-green-500",
  WARNING: "bg-yellow-400",
  STOP: "bg-red-500",
  DISCONNECTED: "bg-gray-500",
};

export default function RuntimeHistoryTable({ data = [] }) {
  //   console.log("🟢 RuntimeHistoryTable data:", data);
  return (
    <div className="overflow-x-auto border rounded bg-white">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-zinc-100">
          <tr>
            <th className="border px-3 py-2 text-left">Start</th>
            <th className="border px-3 py-2 text-left">End</th>
            <th className="border px-3 py-2 text-left">Duration</th>
            <th className="border px-3 py-2 text-left">Status</th>
            <th className="border px-3 py-2 text-left">Reason</th>
            <th className="border px-3 py-2 text-left">Source</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-zinc-50">
              <td className="border px-3 py-2">{formatTime(row.start)}</td>
              <td className="border px-3 py-2">{formatTime(row.end)}</td>
              <td className="border px-3 py-2 font-semibold">
                {calcDuration(row.start, row.end)}
              </td>
              <td className="border px-3 py-2">
                <span
                  className={`px-2 py-1 text-white text-xs rounded ${
                    statusColor[row.status] ?? "bg-gray-400"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="border px-3 py-2">{row.reason || "-"}</td>
              <td className="border px-3 py-2 font-mono text-xs">
                {row.source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
