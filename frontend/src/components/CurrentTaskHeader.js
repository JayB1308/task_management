import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, getCurrentTask, updateTask } from "../store";
import { open } from "../store/slices/modalSlice";
import { getPrioirityBG, getPriorityText } from "../utils/priorityColor";
import { getStatusBackground, getStatusText } from "../utils/statusColor";
import { AiOutlinePushpin } from "react-icons/ai";
import { AiFillPushpin } from "react-icons/ai";
import { getTypeBG, getTypeText } from "../utils/typeColor";
import { DateSetter } from "./shared/DateSetter";
import { Dropdown } from "./shared/Dropdown";
import { EditName } from "./shared/EditName";

const getEnumValue = (originalValue) => {
  return originalValue.split(".")[1];
};

export function CurrentTaskHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTask = useSelector((state) => state.task.currentTask);
  const currentProject = useSelector((state) => state.project.currentProject);
  const user = useSelector((state) => state.user.user);

  const [type, setType] = useState(false);
  const [priority, setPriority] = useState(false);
  const [status, setStatus] = useState(false);

  const { taskID } = useParams();

  const handleDelete = () => {
    dispatch(deleteTask(currentTask.id));
    navigate(`/project/${currentProject.id}`);
  };

  useEffect(() => {
    getCurrentTask(taskID);
  }, [taskID]);

  const types = [
    { label: "BUG", value: "BUG", class: `${getTypeText("BUG")} text-md` },
    {
      label: "TASK",
      value: "TASK",
      class: `${getTypeText("TASK")}  text-md`,
    },
    {
      label: "SUBTASK",
      value: "SUBTASK",
      class: `${getTypeText("SUBTASK")} text-md`,
    },
  ];

  const priorityOption = [
    { label: "P0", value: "P0", class: `${getPriorityText("P0")} text-md` },
    {
      label: "P1",
      value: "P1",
      class: `${getPriorityText("P1")}  text-md`,
    },
    {
      label: "P2",
      value: "P2",
      class: `${getPriorityText("P2")} text-md`,
    },
  ];

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
      updateTask({
        id: currentTask.id,
        data: {
          start_date: dayjs(date).format("YYYY-MM-DD"),
        },
      })
    );
  };

  const handleEndDate = (date) => {
    dispatch(
      updateTask({
        id: currentTask.id,
        data: {
          end_date: dayjs(date).format("YYYY-MM-DD"),
        },
      })
    );
  };

  const handleStatusChange = (status) => {
    setStatus(false);
    dispatch(
      updateTask({
        id: currentTask.id,
        data: {
          status: status,
        },
      })
    );
  };

  const handlePriorityChange = (priority) => {
    setPriority(false);
    dispatch(
      updateTask({
        id: currentTask.id,
        data: {
          priority: priority,
        },
      })
    );
  };

  const handleTypeChange = (type) => {
    setType(false);
    dispatch(
      updateTask({
        id: currentTask.id,
        data: {
          type: type,
        },
      })
    );
  };

  const handlePinnedChange = (mode = "pin") => {
    dispatch(
      updateTask({
        id: currentTask.id,
        data: {
          assignee_id: mode === "pin" ? user.id : null,
        },
      })
    );
  };

  return (
    <div className="w-full">
      <div className="w-full h-10 flex items-center gap-2 px-2">
        <Link to={`/project/${currentProject.id}`}>
          <IoChevronBackOutline size={42} className="text-gray-700" />
        </Link>
        <EditName
          title={currentTask.title}
          headerClasses="text-2xl font-light"
          errorMessage="Please enter a task title"
          inputContainerClasses="w-2/5"
          inputClasses="w-full text-xl font-semibold"
        />

        <div className="ml-auto mr-5">
          {currentTask.assignee_id ? (
            <AiFillPushpin
              size={22}
              className="cursor-pointer text-pink-600"
              onClick={() => handlePinnedChange("unpin")}
            />
          ) : (
            <AiOutlinePushpin
              size={22}
              className="cursor-pointer text-pink-600"
              onClick={() => handlePinnedChange("pin")}
            />
          )}
        </div>
        <button
          className="border-2 border-red-600 flex items-center px-4 py-1 rounded-md"
          onClick={handleDelete}
        >
          <MdDeleteForever size={24} className="text-red-600" />
          <span className="text-red-600 font-semibold text-lg">Delete</span>
        </button>
      </div>

      <div className="w-full flex gap-3 px-2 items-center justify-end mt-5">
        <Dropdown
          isOpen={status}
          setIsOpen={setStatus}
          width="w-1/5"
          options={options}
          currentSelection={getEnumValue(currentTask.status)}
          handleChange={handleStatusChange}
          buttonClasses={`${getStatusBackground(
            currentTask.status
          )} text-white text-md`}
          dropdownClasses={"bg-gray-100 shadow-md"}
        />
        <Dropdown
          isOpen={type}
          setIsOpen={setType}
          width="w-1/5"
          options={types}
          currentSelection={getEnumValue(currentTask.type)}
          handleChange={handleTypeChange}
          buttonClasses={`${getTypeBG(
            getEnumValue(currentTask.type)
          )} text-white text-md`}
          dropdownClasses={"bg-gray-100 shadow-md"}
        />
        <Dropdown
          isOpen={priority}
          setIsOpen={setPriority}
          width="w-1/5"
          options={priorityOption}
          currentSelection={getEnumValue(currentTask.priority)}
          handleChange={handlePriorityChange}
          buttonClasses={`${getPrioirityBG(
            getEnumValue(currentTask.priority)
          )} text-white text-md`}
          dropdownClasses={"bg-gray-100 shadow-md"}
        />
        <DateSetter
          containerClasses="w-1/5"
          pickerClasses="w-full px-3 py-1 border rounded-md"
          label="Start Date"
          date={currentTask.start_date}
          handleDateChange={handleStartDate}
        />

        <DateSetter
          containerClasses="w-1/5"
          pickerClasses="w-full px-3 py-1 border rounded-md"
          label="End Date"
          date={currentTask.end_date}
          handleDateChange={handleEndDate}
        />
      </div>
      <div className="w-full flex items-center px-3 mt-4 justify-end">
        {currentTask.task_id ? (
          <h3 className="w-1/3 border-2 px-4 py-1 border-gray-700 rounded-md font-semibold text-lg">
            You cannot add further subtasks
          </h3>
        ) : (
          <button
            className="bg-teal-800 border-2 border-teal-800 px-4 py-1 text-white text-md font-semibold rounded-md flex items-center justify-between w-1/6"
            onClick={() => {
              dispatch(open({ id: "create-task" }));
            }}
          >
            <IoIosAddCircleOutline size={28} />
            CREATE TASK
          </button>
        )}
      </div>
    </div>
  );
}
