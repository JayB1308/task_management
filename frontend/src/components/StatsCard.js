export function StatsCard({ label, value, bgColor, textColor }) {
  return (
    <div className="px-4 ml-1 py-5 w-32 h-24 flex items-end gap-2 shadow-lg rounded-lg">
      <h1 className={`${textColor} font-semibold text-6xl`}>{value}</h1>
      <div className="flex flex-col items-start">
        <span
          className={`${bgColor} rounded-full text-xs px-2 py-0.5 text-white`}
        >
          {label}
        </span>
        <span className="text-sm">Projects</span>
      </div>
    </div>
  );
}
