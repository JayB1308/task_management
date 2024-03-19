import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTeam, joinTeam } from "../store";
import { useNavigate } from "react-router-dom";

export function Team() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreate = (data) => {
    dispatch(createTeam({ name: data }));
    navigate("/");
  };

  const handleJoin = (data) => {
    dispatch(joinTeam({ name: data }));
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen gap-20">
      <div className="w-1/3 flex flex-col items-center border-2 border-blue-600 rounded-md px-2 py-3">
        <h1 className="font-bold text-4xl text-blue-600">Create Team</h1>
        <p className="mt-2 font-semibold w-full text-wrap text-center">
          Enter a team name to create team. You will automatically exit from the
          current team
        </p>
        <form
          className="flex flex-col items-center mt-2"
          onSubmit={handleSubmit(handleCreate)}
        >
          <input
            type="text"
            className="outline-none border-2 border-gray-600 px-2 py-1"
            {...register("create", { required: true })}
          />
          {errors.create && <p>Please enter a team name</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold mt-2 px-2 py-1 w-1/2 rounded-full text-lg"
          >
            Create
          </button>
        </form>
      </div>
      <div className="w-1/3 flex flex-col items-center border-2 border-violet-600 rounded-md px-2 py-2">
        <h1 className="font-bold text-4xl text-violet-600">Join Team</h1>
        <p className="mt-2 font-semibold">Enter a team name to join team.</p>
        <form
          className="flex flex-col items-center mt-2"
          onSubmit={handleSubmit(handleJoin)}
        >
          <input
            type="text"
            className="outline-none border-2 border-gray-600 px-2 py-1"
            {...register("join", { required: true })}
          />
          {errors.join && <p>Please enter a team name</p>}
          <button
            type="submit"
            className="bg-violet-600 text-white font-semibold mt-2 px-2 py-1 w-1/2 rounded-full text-lg"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}
