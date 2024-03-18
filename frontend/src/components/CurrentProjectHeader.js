import "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteForever, MdTimeline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentProject, removeProject, updateProject } from "../store";
import { open } from "../store/slices/modalSlice";
import { getStatusBackground, getStatusText } from "../utils/statusColor";
import { Dropdown } from "./shared/Dropdown";
import { EditName } from "./shared/EditName";
import { DateSetter } from "./shared/DateSetter";

export function CurrentProjectHeader() {
  const navigate = useNavigate();

  const { projectID } = useParams();
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.project.currentProject);

  const [dropdownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {
    dispatch(getCurrentProject(projectID));
  }, [projectID]);

  const onSubmit = (projectName) => {
    dispatch(
      updateProject({ id: currentProject.id, data: { name: projectName } })
    );
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
    dispatch(
      updateProject({
        id: currentProject.id,
        data: {
          project_meta: {
            start_date: dayjs(date).format("YYYY-MM-DD"),
          },
        },
      })
    );
  };

  const handleEndDate = (date) => {
    dispatch(
      updateProject({
        id: currentProject.id,
        data: {
          project_meta: {
            end_date: dayjs(date).format("YYYY-MM-DD"),
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
        <EditName
          title={currentProject?.name}
          headerClasses="text-3xl font-semibold"
          submitFn={onSubmit}
          errorMessage="Please enter a project title"
          inputContainerClasses="w-3/5"
          inputClasses="w-full text-xl font-semibold"
        />
        <div className="flex items-center gap-3">
          <button
            className="border-2 border-red-600 flex items-center px-4 py-1 rounded-md"
            onClick={handleDeleteProject}
          >
            <MdDeleteForever size={24} className="text-red-600" />
            <span className="text-red-600 font-semibold text-lg">Delete</span>
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

          <DateSetter
            containerClasses="w-1/3"
            pickerClasses="w-full px-3 py-1 border rounded-md"
            label="Start Date"
            date={currentProject?.project_meta?.start_date}
            handleDateChange={handleStartDate}
          />

          <DateSetter
            containerClasses="w-1/3"
            pickerClasses="w-full px-3 py-1 border rounded-md"
            label="End Date"
            date={currentProject?.project_meta?.end_date}
            handleDateChange={handleEndDate}
          />
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
