export default function TitleBlock({
  title,
  value,
  unit = "",
  showValue,
  width,
  cosClass,
}) {
  // Decide how to handle width
  const widthClass = typeof width === "string" ? `w-${width}` : ""; // e.g. "w-full", "w-fit"
  const widthStyle = typeof width === "number" ? { width } : {}; // e.g. { width: 200 }

  return (
    <div
      className={`p-2 rounded bg-slate-200 flex ${
        showValue ? "justify-between" : "justify-center"
      } font-semibold text-[11px] h-fit w-full ${cosClass}`}
      style={widthStyle}
    >
      <span>{title}</span>
      {showValue && (
        <span className="font-mono flex justify-between gap-0.5">
          <span>{value}</span>
          <span>{unit}</span>
        </span>
      )}
    </div>
  );
}
