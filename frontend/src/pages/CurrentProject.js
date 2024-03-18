import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import { FullModalPage } from "../layout/FullModalPage";
import { CurrentProjectHeader } from "../components/CurrentProjectHeader";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../store";
import { CreateTask } from "../components/CreateTask";
import { ProjectTasks } from "../components/ProjectTask";

export function CurrentProject() {
  const dispatch = useDispatch();
  const { projectID } = useParams();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalID = useSelector((state) => state.modal.id);
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(getTasks(projectID));
  }, []);

  return (
    <>
      {isOpen && modalID === "create-task" && (
        <FullModalPage>
          <CreateTask />
        </FullModalPage>
      )}
      <DashboardLayout>
        <CurrentProjectHeader />
        <ProjectTasks tasks={tasks} />
      </DashboardLayout>
    </>
  );
}
