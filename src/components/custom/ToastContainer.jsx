"use client";
import { useNotificationStore } from "@/stores/useNotificationStore";

export default function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <div className="fixed bottom-4 left-4 space-y-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`w-72 p-4 rounded-xl shadow-lg text-white
          ${t.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">{t.message}</span>
            <button onClick={() => removeToast(t.id)}>✕</button>
          </div>

          {/* progress bar */}
          <div className="h-1 bg-white/30 mt-2 overflow-hidden rounded">
            <div
              className="h-full bg-white animate-toast-timer"
              style={{ animationDuration: `${t.duration}ms` }}
              onAnimationEnd={() => removeToast(t.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
