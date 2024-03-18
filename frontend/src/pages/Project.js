import "dayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CreateProject } from "../components/CreateProject";
import { DashboardLayout } from "../layout/DashboardLayout";
import { ModalPage } from "../layout/Modal";
import { getProjectStats, getProjects } from "../store/index";
import { open } from "../store/slices/modalSlice";

function ProjectCard(props) {
  let bgClass = "bg-yellow-500";

  if (props.status.split(".")[1] === "PENDING") {
    bgClass = "bg-slate-700";
  } else if (props.status.split(".")[1] !== "ACTIVE") {
    bgClass = "bg-green-800";
  }

  return (
    <div className="w-full h-12 px-4 py-2 bg-white rounded-md flex items-center justify-between shadow-md">
      <div className="flex items-center gap-8">
        <Link to={`/project/${props.id}`}>
          <HiOutlineExternalLink size={22} className="text-slate-700" />
        </Link>
        <h3 className="text-lg font-semibold h-full">{props.name}</h3>
      </div>
      <div className="flex w-1/4 h-full items-center justify-evenly gap-4">
        {props.project_meta?.start_date ? (
          <span className="text-xs font-semibold">
            {dayjs(props?.project_meta?.start_date).format("DD/MM")}
          </span>
        ) : (
          <CiCalendar size={26} className="text-gray-500" />
        )}

        {props.project_meta?.end_date ? (
          <span className="text-xs font-semibold">
            {dayjs(props?.project_meta?.end_date).format("DD/MM")}
          </span>
        ) : (
          <FaRegCalendarCheck size={20} className="text-gray-500" />
        )}
        <span
          className={`${bgClass} text-white text-xs font-semibold h-4 w-16 rounded-full text-center`}
        >
          {props.status.split(".")[1]}
        </span>
      </div>
    </div>
  );
}

export function Project() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalID = useSelector((state) => state.modal.id);
  const team_id = useSelector((state) => state.user.user.team_id);
  const projects = useSelector((state) => state.project.projects);

  useEffect(() => {
    dispatch(getProjects({ team_id: team_id }));
    dispatch(getProjectStats({ team_id: team_id }));
  }, [location.key]);

  return (
    <DashboardLayout>
      {isOpen && modalID === "project" && (
        <ModalPage>
          <CreateProject />
        </ModalPage>
      )}
      <div className="flex flex-col items-center">
        <div className="w-full flex items-center justify-between">
          <div className="w-1/2 flex flex-col items-start">
            <h1 className="text-4xl font-semibold w-full text-blue-700">
              All Projects
            </h1>
            <p className="text-lg font-medium w-full">
              See all your projects here.
            </p>
          </div>
          <div className="w-full flex justify-end items-center px-4">
            <button
              className="w-1/3 h-12 bg-blue-800 text-white rounded-full flex items-center justify-between px-4"
              onClick={() => dispatch(open({ id: "project" }))}
            >
              <IoIosAddCircleOutline size={28} />
              <span className="font-semibold text-lg">Create Project</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full h-auto items-start justify-center gap-4 mt-4 px-4 py-6">
          {projects.map((project) => {
            return <ProjectCard key={project.id} {...project} />;
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
