import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../store";
import { Task } from "./Task";

export function ProjectTasks() {
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.project.currentProject);
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(getTasks(currentProject.id));
  }, [currentProject]);

  return (
    <div className="w-full px-4 mt-3">
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}
