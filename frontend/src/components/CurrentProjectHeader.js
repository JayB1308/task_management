import "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { FaCalendar, FaHourglassHalf } from "react-icons/fa";
import { GrFormEdit } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteForever, MdTimeline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { open } from "../store/slices/modalSlice";
import { getCurrentProject, removeProject, updateProject } from "../store";
import { calcDuration } from "../utils/calcDate";
import { getStatusText, getStatusBackground } from "../utils/statusColor";
import { Dropdown } from "./shared/Dropdown";

export function CurrentProjectHeader() {
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
  const [duration, setDuration] = useState();

  const [startDate, setStartDate] = useState(
    currentProject?.project_meta?.start_date
      ? currentProject?.project_meta?.start_date
      : Date.now()
  );
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    dispatch(getCurrentProject(projectID));

    if (currentProject) {
      setEditName(currentProject.name);
      setDuration(calcDuration(currentProject));
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
      value: "ACTIVE",
      class: `${getStatusText("Status.ACTIVE")} bg-white`,
    },
    {
      label: "PENDING",
      value: "PENDING",
      class: `${getStatusText("Status.PENDING")} bg-white`,
    },
    {
      label: "CLOSED",
      value: "CLOSED",
      class: `${getStatusText("Status.CLOSED")} bg-white`,
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
            <Dropdown
              isOpen={dropdownOpen}
              setIsOpen={setDropDownOpen}
              options={options}
              currentSelection={currentProject?.status.split(".")[1]}
              width="w-24"
              handleChange={handleStateChange}
              buttonClasses={`${getStatusBackground(
                currentProject?.status
              )} text-white text-sm`}
              dropdownClasses={"bg-gray-100"}
              iconClasses={"justify-self-end"}
            />
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
              <span className="text-md font-semibold">{duration} day</span>
            ) : (
              <FaHourglassHalf size={20} className="text-gray-500 mt-1" />
            )}
          </div>
        </div>
        <button
          className="bg-indigo-800 px-4 py-2 text-white text-lg font-semibold rounded-md flex items-center justify-between w-1/6"
          onClick={() => {
            dispatch(open({ id: "create-task" }));
          }}
        >
          <IoIosAddCircleOutline size={28} />
          CREATE TASK
        </button>
      </div>
    </div>
  );
}
