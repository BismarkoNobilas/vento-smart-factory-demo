import { ALARMS } from "@/lib/alarms/alarmDefinitions";
import { useNotificationStore } from "@/stores/useNotificationStore";

export function evaluateAlarms(latestData, lastLevelsRef) {
  const store = useNotificationStore.getState();

  ALARMS.forEach((alarm) => {
    const value = alarm.check(latestData);
    if (value == null) return;

    let level = "NONE";
    if (alarm.critical != null && value > alarm.critical) level = "critical";
    else if (alarm.warning != null && value > alarm.warning) level = "warning";

    const lastLevel = lastLevelsRef.current[alarm.id] || "NONE";

    // edge-trigger
    if (level !== "NONE" && level !== lastLevel) {
      store.addAlert({
        id: crypto.randomUUID(),
        level,
        title: alarm.title,
        message: `${alarm.parameter} = ${value}`,

        why: alarm.why,
        when: new Date().toLocaleString(),
        where: alarm.source,

        source: alarm.source,
        dataKey: alarm.parameter,
        value,

        createdAt: Date.now(),
        acknowledged: false,
      });
    }

    lastLevelsRef.current[alarm.id] = level;
  });
}
