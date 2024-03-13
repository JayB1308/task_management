import "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import {
  FaCalendar,
  FaChevronDown,
  FaChevronUp,
  FaHourglassHalf,
} from "react-icons/fa";
import { GrFormEdit } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteForever, MdTimeline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import { getCurrentProject, removeProject, updateProject } from "../store";
import { getStatusBgColor } from "../utils/statusColor";

function CurrentProjectHeader() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { projectID } = useParams();
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.project.currentProject);

  const [showIcon, setShowIcon] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [editName, setEditName] = useState("");

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [startDate, setStartDate] = useState(
    currentProject?.project_meta?.start_date
      ? currentProject?.project_meta?.start_date
      : Date.now()
  );
  const [endDate, setEndDate] = useState(new Date());

  const calcDuration = () => {
    let parsed_start_date = dayjs(currentProject?.project_meta?.start_date);
    let parsed_end_date = dayjs(currentProject?.project_meta?.end_date);

    return parsed_start_date.diff(parsed_end_date, "day");
  };

  useEffect(() => {
    dispatch(getCurrentProject(projectID));

    if (currentProject) {
      setEditName(currentProject.name);
    }
  }, [projectID]);

  const handleNameChange = (event) => {
    setEditName(event.target.value);
  };

  const onSubmit = (data) => {
    dispatch(updateProject({ id: currentProject.id, data: { ...data } }));
    setShowEditName(false);
  };

  const options = [
    {
      label: "ACTIVE",
      class: getStatusBgColor("Status.ACTIVE", true),
      bg: getStatusBgColor("Status.ACTIVE", false),
    },
    {
      label: "PENDING",
      class: getStatusBgColor("Status.PENDING", true),
      bg: getStatusBgColor("Status.PENDING", false),
    },
    {
      label: "CLOSED",
      class: getStatusBgColor("Status.CLOSED", true),
      bg: getStatusBgColor("Status.PENDING", false),
    },
  ];

  const handleStartDate = (date) => {
    setShowStartDate(false);
    dispatch(
      updateProject({
        id: currentProject.id,
        data: {
          project_meta: {
            start_date:
              date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
          },
        },
      })
    );
  };

  const handleEndDate = (date) => {
    setShowEndDate(false);
    dispatch(
      updateProject({
        id: currentProject.id,
        data: {
          project_meta: {
            end_date:
              date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
          },
        },
      })
    );
  };

  const handleStateChange = (status) => {
    setDropDownOpen(false);
    dispatch(
      updateProject({
        id: currentProject.id,
        data: {
          status: status,
        },
      })
    );
  };

  const handleDeleteProject = () => {
    dispatch(removeProject({ project_id: currentProject.id }));
    navigate("/project");
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-1/2 items-center ">
          {showEditName ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center h-4 w-full gap-4"
            >
              <div className="flex flex-col w-full">
                <input
                  {...register("name", { required: true })}
                  className="border-2 border-gray-500 w-full px-2 py-1 text-2xl rounded-md"
                  value={editName}
                  placeholder="enter project name."
                  onChange={handleNameChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    please enter a project name
                  </p>
                )}
              </div>
              <button
                className="border-2 px-3 py-1 text-md text-green-700 border-green-700 rounded-full"
                type="submit"
              >
                Save
              </button>
              <button
                size={24}
                className="border-2 px-3 py-1 text-md text-red-700 border-red-700 rounded-full"
                onClick={() => {
                  setShowEditName(false);
                  setEditName(currentProject.name);
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div
              className="flex h-4 items-center w-full gap-4"
              onMouseEnter={() => setShowIcon(true)}
              onMouseLeave={() => setShowIcon(false)}
              onClick={() => setShowEditName(true)}
            >
              <h1 className="text-3xl font-semibold">{currentProject?.name}</h1>
              {showIcon && (
                <GrFormEdit size={32} className="text-slate-800 mt-2" />
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            className="border-2 border-red-600 flex items-center px-4 py-1 rounded-md"
            onClick={handleDeleteProject}
          >
            <MdDeleteForever size={24} className="text-red-600" />
            <span className="text-red-600 font-semibold text-lg">Delete</span>
          </button>
          <button className="px-4 py-1 bg-purple-800 rounded-md">
            <MdTimeline size={30} className="text-white" />
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-between mt-6">
        <div className="flex items-center w-1/2 gap-3">
          <div className="relative w-auto px-2 flex flex-col">
            <button
              className={`${getStatusBgColor(
                currentProject?.status,
                false
              )} text-white font-semibold px-2 py-1 w-24 flex items-center gap-2 text-sm ${
                dropdownOpen ? "rounded-t-md" : "rounded-md"
              }`}
            >
              {currentProject?.status.split(".")[1]}
              {dropdownOpen ? (
                <FaChevronUp
                  onClick={() => {
                    setDropDownOpen(false);
                  }}
                  size={18}
                  className={`${getStatusBgColor(
                    currentProject?.status,
                    false
                  )} `}
                />
              ) : (
                <FaChevronDown
                  onClick={() => {
                    setDropDownOpen(true);
                  }}
                  size={18}
                  className={`${getStatusBgColor(
                    currentProject?.status,
                    false
                  )} `}
                />
              )}
            </button>
            {dropdownOpen && (
              <ul className="absolute flex flex-col w-24 px-2 items-start top-8 bg-gray-100">
                {options.map((option) => {
                  return (
                    <li
                      key={option.label}
                      className={`${option.class}`}
                      onClick={() => handleStateChange(option.label)}
                    >
                      {option.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {showStartDate ? (
            <div className="w-1/3">
              <DatePicker
                selected={startDate}
                onSelect={handleStartDate}
                className="w-full px-3 py-1 border rounded-md"
              />
            </div>
          ) : (
            <div className="flex w-1/3 items-center justify-between border-2 border-slate-600 px-3 py-1 rounded-md">
              <p className="text-xs font-semibold">Start date</p>
              {currentProject?.project_meta?.start_date ? (
                <span className="text-md font-semibold">
                  {dayjs(currentProject?.project_meta?.start_date).format(
                    "DD/MM"
                  )}
                </span>
              ) : (
                <FaCalendar
                  size={18}
                  className="text-gray-500"
                  onClick={() => {
                    setShowStartDate(true);
                  }}
                />
              )}
            </div>
          )}

          {showEndDate ? (
            <div className="w-1/3">
              <DatePicker
                selected={endDate}
                onSelect={handleEndDate}
                className="w-full px-3 py-1 border rounded-md"
              />
            </div>
          ) : (
            <div className="flex w-1/3 items-center justify-between border-2 border-slate-600 px-3 py-1 rounded-md">
              <p className="text-xs font-semibold">End date</p>

              {currentProject?.project_meta?.end_date ? (
                <span className="text-md font-semibold">
                  {dayjs(currentProject?.project_meta?.end_date).format(
                    "DD/MM"
                  )}
                </span>
              ) : (
                <FaCalendar
                  size={18}
                  className="text-gray-500"
                  onClick={() => {
                    setShowEndDate(true);
                  }}
                />
              )}
            </div>
          )}
          <div className="flex w-1/3 items-center justify-between border-2 border-slate-600 px-3 py-1 rounded-md">
            <p className="text-xs">Duration</p>
            {currentProject?.project_meta ? (
              <span className="text-md font-semibold">
                {calcDuration()} day
              </span>
            ) : (
              <FaHourglassHalf size={20} className="text-gray-500 mt-1" />
            )}
          </div>
        </div>
        <button className="bg-indigo-800 px-4 py-2 text-white text-lg font-semibold rounded-md flex items-center justify-between w-1/6">
          <IoIosAddCircleOutline size={28} />
          CREATE TASK
        </button>
      </div>
    </div>
  );
}

export function CurrentProject() {
  return (
    <DashboardLayout>
      <CurrentProjectHeader />
    </DashboardLayout>
  );
}
