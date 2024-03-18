import { Task } from "./Task";

export function ProjectTasks({ tasks }) {
  return (
    <div className="w-full px-4 mt-3">
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}
