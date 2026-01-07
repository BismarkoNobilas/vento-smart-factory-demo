import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
  toasts: [],
  alerts: [],

  // ---------- TOAST ----------
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, toast],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  // ---------- ALERT ----------
  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),

  acknowledgeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, acknowledged: true } : a
      ),
    })),

  clearAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),

  clearAll: () => set({ alerts: [] }),
}));
