const statusColors = {
  RUNNING: "bg-green-500",
  STOP: "bg-red-500",
  WARNING: "bg-yellow-400",
};

export default function MachineTimeline({ logs }) {
  // total duration (in minutes)
  const totalMinutes = 24 * 60;

  function getMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  return (
    <div className="w-full border border-black flex h-4">
      {logs.map((log, i) => {
        const start = getMinutes(log.start);
        const end = getMinutes(log.end);
        const widthPercent = ((end - start) / totalMinutes) * 100;

        return (
          <div
            key={i}
            className={`${statusColors[log.status]} h-full`}
            style={{ width: `${widthPercent}%` }}
          ></div>
        );
      })}
    </div>
  );
}
