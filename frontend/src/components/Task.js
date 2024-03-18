import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { getStatusBackground } from "../utils/statusColor";
import { getTypeBG } from "../utils/typeColor";
import { getPrioirityBG } from "../utils/priorityColor";
import { privateApiInstance } from "../axios";
import { FaUser } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { setCurrentTask } from "../store/slices/taskSlice";
import dayjs from "dayjs";

export function Task({ task }) {
  const [assignee, setAssignee] = useState();
  const dispatch = useDispatch();

  const getAssignee = async () => {
    if (task.assignee_id) {
      const response = await privateApiInstance.get(
        `/auth/user/${task.assignee_id}`
      );

      if (response.data) {
        setAssignee(response.data.user);
      }
    }
  };

  useEffect(() => {
    getAssignee();
  }, []);

  return (
    <div className="w-full h-10 pr-2 shadow-md flex items-center rounded-sm mt-3">
      <div
        className={`w-1 h-full ${getStatusBackground(task.status)} mr-1`}
      ></div>
      <div className="flex items-center w-[93%] gap-8  pr-2">
        <h3 className="text-lg w-[45%] font-semibold ">{task.title}</h3>
        <div
          className={`w-20 flex justify-center items-center mx-2 text-white font-semibold rounded-full ml-auto ${getTypeBG(
            task.type.split(".")[1]
          )}`}
        >
          <h3 className="text-sm">{task.type.split(".")[1]}</h3>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-bold rounded-full bg-gray-300 px-1">
            Start
          </span>
          {task?.start_date ? (
            <span className="text-xs font-light">
              {dayjs(task?.start_date).format("DD/MM")}
            </span>
          ) : (
            <CiCalendar size={26} className="text-gray-500" />
          )}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-bold rounded-full bg-gray-300 px-1">
            End
          </span>
          {task?.end_date ? (
            <span className="text-xs font-light">
              {dayjs(task?.end_date).format("DD/MM")}
            </span>
          ) : (
            <CiCalendar size={26} className="text-gray-500" />
          )}
        </div>

        <div
          className={`w-12 flex justify-center items-center  text-white font-semibold rounded-full ${getPrioirityBG(
            task.priority.split(".")[1]
          )}`}
        >
          <h3 className="text-sm">{task.priority.split(".")[1]}</h3>
        </div>
        <div className="flex flex-col items-center">
          {task.has_subtask ? <FaTasks size={22} /> : <MdAddTask size={24} />}
        </div>
      </div>
      <Link
        to={`/task/${task.id}`}
        className="text-slate-700 ml-auto 1/12"
        onClick={() => dispatch(setCurrentTask(task))}
      >
        <HiOutlineExternalLink size={22} />
      </Link>
    </div>
  );
}
