"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/stores/useNotificationStore";

export default function AlertLogCard({ compact = false }) {
  const alerts = useNotificationStore((s) => s.alerts);
  const acknowledge = useNotificationStore((s) => s.acknowledgeAlert);

  if (!alerts.length) {
    return (
      <Card className="p-4 text-center text-gray-500">No alerts recorded</Card>
    );
  }

  return (
    <Card className="p-4 space-y-3 h-full overflow-auto max-w-md">
      <h3 className="text-lg font-bold">Alert Log</h3>

      {alerts
        .slice()
        .reverse()
        .map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-3 flex flex-col gap-2
              ${
                alert.level === "critical"
                  ? "border-red-500 bg-red-50"
                  : "border-yellow-400 bg-yellow-50"
              }
            `}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                {alert.level === "critical" ? "🚨 CRITICAL" : "⚠️ WARNING"} —{" "}
                {alert.title}
              </span>

              <span className="text-xs text-gray-500">
                {new Date(alert.createdAt).toLocaleString()}
              </span>
            </div>

            {!compact && (
              <>
                <div className="text-sm">
                  <strong>Where:</strong> {alert.where}
                </div>
                <div className="text-sm">
                  <strong>Why:</strong> {alert.why}
                </div>
                <div className="text-sm">
                  <strong>Value:</strong> {alert.value}
                </div>
              </>
            )}

            <div className="flex justify-end gap-2">
              {!alert.acknowledged && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => acknowledge(alert.id)}
                >
                  Acknowledge
                </Button>
              )}
            </div>
          </div>
        ))}
    </Card>
  );
}
