import { useSelector } from "react-redux";
import { DashboardLayout } from "../layout/DashboardLayout";
import { FullModalPage } from "../layout/FullModalPage";
import { CreateTask } from "./CreateTask";
import { CurrentTaskHeader } from "./CurrentTaskHeader";
import { CurrentTaskBody } from "./CurrentTaskBody";

export function CurrentTask() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalID = useSelector((state) => state.modal.id);

  return (
    <>
      {isOpen && modalID === "create-task" && (
        <FullModalPage>
          <CreateTask />
        </FullModalPage>
      )}
      <DashboardLayout>
        <CurrentTaskHeader />
        <CurrentTaskBody />
      </DashboardLayout>
    </>
  );
}
