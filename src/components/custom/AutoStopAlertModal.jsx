"use client";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useState } from "react";

export default function AutoStopAlertModal() {
  const alerts = useNotificationStore((s) => s.alerts);
  const clearAlert = useNotificationStore((s) => s.clearAlert);

  const alert = alerts.find((a) => a.type === "AUTO_STOP" && !a.acknowledged);

  if (!alert) return null;

  // modal JSX here (same as before)
}
