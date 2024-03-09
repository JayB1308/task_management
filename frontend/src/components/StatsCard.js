export function StatsCard({ label, value, color }) {
  return (
    <div className="px-4 ml-1 py-5 w-48 h-32 flex flex-col  shadow-lg rounded-lg">
      <span
        className={`bg-${color} text-white text-sm rounded-full px-5 py-1 w-1/2`}
      >
        {label}
      </span>
      <h1 className={`text-${color} font-semibold ml-2 text-5xl`}>{value}</h1>
      <p className="ml-3 mt-1 font-light">Projects</p>
    </div>
  );
}
