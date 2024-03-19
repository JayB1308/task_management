import { DashboardLayout } from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";
import { StatsCard } from "../components/StatsCard";

export function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const team = useSelector((state) => state.team.data);
  const stats = useSelector((state) => state.project.stats);
  const navigate = useNavigate();

  if (!user.team_id) {
    navigate("/team");
  }

  return (
    <DashboardLayout>
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-3xl">Welcome {user.username}!</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-2 py-1 border-2 border-violet-800 text-violet-800 rounded-md font-semibold"
            onClick={() => navigate("/team")}
          >
            Join Team
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between w-2/12 mt-4 border-2 px-2 py-1 rounded-md border-gray-500">
        <FaUserFriends size={20} />
        <h5 className="font-bold">{team?.name}</h5>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <div className="w-full flex items-center gap-10">
            <StatsCard
              label="Active"
              value={stats.active}
              bgColor="bg-yellow-500"
              textColor="text-yellow-600"
            />
            <StatsCard
              label="Pending"
              value={stats.pending}
              bgColor="bg-slate-500"
              textColor="text-slate-600"
            />
            <StatsCard
              label="Closed"
              value={stats.closed}
              bgColor="bg-green-900"
              textColor="text-green-900"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
