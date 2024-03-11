import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../store/slices/modalSlice";
import { StatsCard } from "../components/StatsCard";
import { DashboardLayout } from "../layout/DashboardLayout";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ModalPage } from "../layout/Modal";
import { CreateProject } from "../components/CreateProject";
import { getProjects, getProjectStats } from "../store/index";

function ProjectCard({ name, status }) {
  return (
    <div className="w-full h-12 px-4 py-2 bg-white rounded-md flex items-center justify-between">
      <h3 className="text-lg h-full">{name}</h3>
      <div className="flex h-full items-center">
        <span className="text-xs">{status.split(".")[1]}</span>
      </div>
    </div>
  );
}

export function Project() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const team_id = useSelector((state) => state.user.user.team_id);
  const projects = useSelector((state) => state.project.projects);
  const stats = useSelector((state) => state.project.stats);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjects({ team_id: team_id }));
      dispatch(getProjectStats({ team_id: team_id }));
    }
  }, [projects]);

  return (
    <DashboardLayout>
      {isOpen && (
        <ModalPage>
          <CreateProject />
        </ModalPage>
      )}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold w-full text-blue-700">
          All Projects
        </h1>
        <p className="text-lg font-medium w-full">
          See all your projects here.
        </p>
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
          <button
            className="w-1/5 h-12 bg-blue-800 text-white rounded-full flex items-center justify-between px-4"
            onClick={() => dispatch(open())}
          >
            <IoIosAddCircleOutline size={28} />
            <span className="font-semibold text-lg">Create Project</span>
          </button>
        </div>
        <div className="flex flex-col w-full h-auto items-start justify-center gap-4 mt-4 bg-blue-100 px-4 py-6">
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                name={project.name}
                status={project.status}
              />
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
