import { StatsCard } from "../components/StatsCard";
import { DashboardLayout } from "../layout/DashboardLayout";
import { IoIosAddCircleOutline } from "react-icons/io";

export function Project() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold w-full text-blue-700">
          All Projects
        </h1>
        <p className="text-lg font-medium w-full">
          See all your projects here.
        </p>
        <div className="flex justify-between items-center w-full">
          <div className="w-full flex items-center gap-10">
            <StatsCard label="Active" value="32" color="yellow-500" />
            <StatsCard />
            <StatsCard />
          </div>
          <button className="w-1/5 h-12 bg-blue-800 text-white rounded-full flex items-center justify-between px-4">
            <IoIosAddCircleOutline size={28} />{" "}
            <span className="font-semibold text-lg">Create Project</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
