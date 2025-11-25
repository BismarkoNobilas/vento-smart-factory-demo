import TitleBlock from "../custom/TitleBlock";

export default function MachineStatusCard({ machines = [] }) {
  // Map status to Tailwind color
  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "RUNNING":
        return "bg-green-500";
      case "STOP":
        return "bg-red-500";
      case "WARNING":
        return "bg-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="grid bg-zinc-50 shadow-sm rounded w-fit place-content-center p-2 h-auto pb-3">
      <TitleBlock title="Status" showValue={false} />

      {machines.map((machine, index) => (
        <div
          key={index}
          className="grid grid-cols-[auto_fit-content(100%)] gap-2 mt-2 w-full"
        >
          <span className="font-semibold text-[13px] px-2">
            {machine.name}:
          </span>
          <span
            className={`${getStatusColor(
              machine.status
            )} text-white text-[13px] h-fit p-0.5 w-[85px] text-center`}
          >
            {machine.status}
          </span>
        </div>
      ))}
    </div>
  );
}
