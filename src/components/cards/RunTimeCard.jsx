import MachineTimeline from "../custom/MachineTimeline";

function RunTimeCard({
  title = "Packaging Machine",
  status = "RUNNING",
  statusColor = "bg-green-500",
  warning = "OKE",
  warningColor = "bg-green-500",
  logs = [],
  timelineLabels = ["07:00", "15:00", "23:00", "07:00"],
  bgColor = "bg-zinc-50",
}) {
  return (
    <div className={`grid ${bgColor} shadow-sm rounded w-full h-full`}>
      <div className="p-3 grid">
        {/* Title */}
        <h2 className="font-bold">{title}</h2>

        {/* Status */}
        <div className="flex gap-4 mt-1">
          <span className="font-semibold text-[13px]">Status:</span>
          <span className={`${statusColor} text-white px-2 h-fit text-[13px]`}>
            {status}
          </span>
        </div>

        {/* Warning */}
        <div className="flex gap-4 mt-1">
          <span className="font-semibold text-[13px]">Caution:</span>
          <span className={`${warningColor} text-white px-2 h-fit text-[13px]`}>
            {warning}
          </span>
        </div>

        {/* Timeline */}
        <div className="mt-1">
          <MachineTimeline logs={logs} />
          <div className="flex justify-between text-[13px]">
            {timelineLabels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-2 mt-1 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500"></span> RUNNING
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-yellow-400"></span> WARNING
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500"></span> STOP
          </span>
        </div>
      </div>
    </div>
  );
}

export default RunTimeCard;
