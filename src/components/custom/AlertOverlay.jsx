"use client";
import { useNotificationStore } from "@/stores/useNotificationStore";

export default function AlertOverlay() {
  const { alerts, acknowledgeAlert } = useNotificationStore();

  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <>
      {activeAlerts.map((a, index) => (
        <div
          key={a.id}
          className={`fixed inset-0 flex items-center justify-center z-40`}
          style={{ transform: `translateX(${index * 20}px)` }}
        >
          <div
            className={`w-[520px] p-6 rounded-2xl shadow-2xl
            ${
              a.level === "critical"
                ? "bg-red-700 text-white"
                : "bg-yellow-400 text-black"
            }`}
          >
            <h1 className="text-3xl font-bold mb-4">{a.title}</h1>

            <p className="text-xl mb-4">{a.message}</p>

            <div className="space-y-2 text-lg">
              <p>
                <b>Why:</b> {a.why}
              </p>
              <p>
                <b>When:</b> {a.when}
              </p>
              <p>
                <b>Where:</b> {a.where}
              </p>
            </div>

            <button
              className="mt-6 px-6 py-3 bg-black text-white rounded-xl"
              onClick={() => acknowledgeAlert(a.id)}
            >
              Acknowledge
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
