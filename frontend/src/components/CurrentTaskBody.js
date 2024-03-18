import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentTask } from "../store/slices/taskSlice";
import { MdEdit } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import parse from "html-react-parser";
import { Editor } from "./Editor";
import { privateApiInstance } from "../axios";

export function CurrentTaskBody() {
  const currentTask = useSelector((state) => state.task.currentTask);
  const currentProject = useSelector((state) => state.project.currentProject);
  const [description, setDescription] = useState(currentTask.description);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const dispatch = useDispatch();

  const getContainerWidth = () => {
    return currentTask.type.split(".")[1] === "SUBTASK" ? "w-full" : "w-1/2";
  };

  const getSubtasks = async () => {
    const params = new URLSearchParams();

    params.append("project_id", currentProject.id);
    params.append("task_id", currentTask.id);

    const response = await privateApiInstance.get(
      `/task/?${params.toString()}`
    );

    if (response.status === 200) {
      setSubtasks(response.data.tasks);
    }
  };

  useEffect(() => {
    getSubtasks();
  }, []);

  return (
    <div className="w-full flex items-start gap-2 px-4 mt-4">
      <div className={`${getContainerWidth()}`}>
        <div
          className="flex items-center gap-3"
          onMouseEnter={() => setShowEditIcon(true)}
          onMouseLeave={() => setShowEditIcon(false)}
        >
          <h1 className="font-light text-2xl">Description</h1>
          {showEditIcon && !editMode && (
            <MdEdit size={28} onClick={() => setEditMode(true)} />
          )}
          {editMode && (
            <div className="flex items-center">
              <button className="text-white bg-cyan-600 border-2 border-cyan-800 font-semibold px-2 py-1 ml-3 rounded-md">
                Save
              </button>
              <button
                className="rounded-md text-red-600 border-2 border-red-600 font-semibold px-2 py-1 ml-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {editMode ? (
          <div className="w-full py-2">
            <Editor
              value={description}
              setValue={setDescription}
              showHeader={false}
            />
          </div>
        ) : (
          <div className="w-full mt-2 text-2xl max-h-[300px]">
            {parse(currentTask.description)}
          </div>
        )}
      </div>

      {currentTask.has_subtask && (
        <div
          className={`${getContainerWidth()} border-2 border-slate-500 rounded-md shadow-sm px-4 py-2`}
        >
          <div className="w-full flex flex-col max-h-[200px] ">
            <h1 className="text-2xl font-light text-center">Subtasks</h1>
            {subtasks.map((task) => {
              return (
                <div
                  className="flex items-center w-full shadow-md mt-2 px-2 py-1"
                  key={task.id}
                >
                  <h2 className="font-semibold text-lg"> {task.title}</h2>
                  <Link
                    to={`/task/${task.id}`}
                    className="text-slate-700 ml-auto 1/12"
                    onClick={() => dispatch(setCurrentTask(task))}
                  >
                    <HiOutlineExternalLink size={22} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
