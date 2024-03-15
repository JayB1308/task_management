import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { close } from "../store/slices/modalSlice";
import { createProject } from "../store";

export function CreateProject() {
  const dispatch = useDispatch();
  const team_id = useSelector((state) => state.user.user.team_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createProject({ name: data.name, team_id: team_id }));
    dispatch(close({ id: "project" }));
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className="bg-white min-h-48 w-1/2 shadow-lg rounded-md px-12 py-2"
    >
      <div className="w-full flex flex-col justify-between items-center ">
        <h1 className="text-2xl font-semibold">Create a project</h1>
        <div className="flex flex-col items-start w-full">
          <label className="text-lg ml-1">name</label>
          <input
            {...register("name", { required: true })}
            className="mt-2 pl-1 pr-5 py-2 w-full border-2 border-gray-400 rounded-md"
            placeholder="enter project name."
          />
          {errors.name && (
            <p className="text-sm text-red-700 font-semibold">
              Please enter a name
            </p>
          )}
        </div>
        <div className="flex w-full justify-end gap-6 mt-4">
          <button
            onClick={handleSubmit(onSubmit)}
            className="text-blue-500 py-1 px-8 bg-white border-2 border-blue-500 font-semibold text-lg"
          >
            Save
          </button>
          <button
            onClick={() => dispatch(close({ id: "project" }))}
            className="text-red-500 py-1 px-8 bg-white border-2 border-red-500 font-semibold text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
