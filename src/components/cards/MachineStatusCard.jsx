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
    <div className="grid bg-zinc-50 shadow-sm rounded w-fit place-content-center p-2 h-fit pb-3">
      <TitleBlock title="Status" showValue={false} />

      {machines.map((machine, index) => (
        <div key={index} className="flex gap-4 mt-2 px-3">
          <span className="font-semibold text-[12px]">{machine.name}:</span>
          <span
            className={`${getStatusColor(
              machine.status
            )} text-white text-[12px] h-fit w-[80px] text-center`}
          >
            {machine.status}
          </span>
        </div>
      ))}
    </div>
  );
}
