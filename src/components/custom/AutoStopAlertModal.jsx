"use client";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useState } from "react";

export default function AutoStopAlertModal() {
  const alerts = useNotificationStore((s) => s.alerts);
  const clearAlert = useNotificationStore((s) => s.clearAlert);

  const alert = alerts.find((a) => a.type === "AUTO_STOP" && !a.acknowledged);

  if (!alert) return null;
  // const clearAlert = useNotificationStore((s) => s.clearAlert);
  const [category, setCategory] = useState("");
  const [reason, setReason] = useState("");

  async function submitReason() {
    if (!category) return;

    const finalReason = category === "maintenance" ? reason : "Normal stop";

    await fetch("/api/runtime/reason", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reason: finalReason,
        source: "auto",
      }),
    });

    clearAlert(alert.id);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[380px] p-4 space-y-3">
        <h3 className="font-bold">{alert.title}</h3>
        <p className="text-sm text-gray-600">{alert.message}</p>

        {/* Category */}
        <select
          className="border rounded px-2 py-1 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="normal">Normal</option>
          <option value="maintenance">Maintenance</option>
        </select>

        {/* Maintenance reasons */}
        {category === "maintenance" && (
          <>
            <select
              className="border rounded px-2 py-1 w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select reason</option>
              {MAINTENANCE_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {reason === "Other" && (
              <input
                className="border rounded px-2 py-1 w-full"
                placeholder="Enter custom reason"
                onChange={(e) => setReason(e.target.value)}
              />
            )}
          </>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => clearAlert(alert.id)}
          >
            Skip
          </button>

          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={submitReason}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
