import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { close } from "../store/slices/modalSlice";
import { createTask } from "../store";
import { getPrioirityBG, getPriorityText } from "../utils/priorityColor";
import { getTypeBG, getTypeText } from "../utils/typeColor";
import { Editor } from "./Editor";
import { Dropdown } from "./shared/Dropdown";

export function CreateTask() {
  const [description, setDescription] = useState("");
  const [type, setType] = useState(false);
  const [priority, setPriority] = useState(false);
  const [currentType, setCurrentType] = useState("TASK");
  const [currentPriority, setCurrentPriority] = useState("P0");
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.project.currentProject);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm();

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

  const handleSubmit = () => {
    trigger();
    if (isValid) {
      dispatch(
        createTask({
          title: getValues().title,
          description: description,
          type: currentType,
          priority: currentPriority,
          project_id: currentProject.id,
        })
      );
      navigate(`/project/${currentProject.id}`);
    }
  };

  return (
    <div className="w-full h-full px-10">
      <div className="grid grid-rows-10 grid-cols-5 gap-1">
        <div className="col-span-5 row-span-1 flex items-center w-full justify-between mt-3">
          <h1 className="text-4xl font-light w-1/2">Create A Task.</h1>
          <div className="flex items-center justify-end gap-10 w-1/2">
            <button
              className="px-2 py-1 w-1/4 text-xl text-white bg-indigo-500 rounded-md"
              onClick={handleSubmit}
            >
              Save
            </button>
            <IoClose
              className="cursor-pointer row-span-1 col- text-gray-500"
              size={42}
              onClick={() => dispatch(close({ id: "create-task" }))}
            />
          </div>
        </div>
        <div className="col-span-5 row-span-1 flex items-center justify-between mt-1 px-2">
          <div className="flex flex-col w-1/2 items-start relative">
            <label className="font-semibold text-2xl">title.</label>
            <input
              className="w-full text-xl py-2 px-2 border-b-2 mt-1 focus:border-b-2 focus:border-black focus:outline-none"
              type="text"
              {...register("title", { required: true })}
              placeholder="enter a task title."
            />
            {errors.title && (
              <p className="text-red-500 font-semibold absolute top-20 ">
                Please enter a task title
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-4 w-1/2">
            <div className="relative w-auto flex justify-end items-center">
              <Dropdown
                isOpen={type}
                setIsOpen={setType}
                width="w-36"
                options={types}
                currentSelection={currentType}
                handleChange={(value) => {
                  setCurrentType(value);
                  setType(false);
                }}
                buttonClasses={`${getTypeBG(currentType)} text-white text-md`}
                dropdownClasses={"bg-gray-100 shadow-md"}
                disableCondition={location.pathname.split("/")[1] === "task"}
                disabledOption={types[2].value}
              />
            </div>
            <div className="relative w-auto flex justify-end items-center">
              <Dropdown
                isOpen={priority}
                setIsOpen={setPriority}
                width="w-36"
                options={priorityOption}
                currentSelection={currentPriority}
                handleChange={(value) => {
                  setCurrentPriority(value);
                  setPriority(false);
                }}
                buttonClasses={`${getPrioirityBG(
                  currentPriority
                )} text-white text-md`}
                dropdownClasses={"bg-gray-100 shadow-md"}
              />
            </div>
          </div>
        </div>
        <div className="row-span-3 col-span-5 px-2 h-[350px]">
          <Editor value={description} setValue={setDescription} />
        </div>
      </div>
    </div>
  );
}
