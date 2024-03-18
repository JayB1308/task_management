import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrFormEdit } from "react-icons/gr";

export function EditName({
  title,
  headerClasses,
  submitFn,
  errorMessage,
  inputContainerClasses,
  inputClasses,
}) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(title);

  const {
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = () => {
    trigger();
    if (isValid) {
      submitFn(name);
      setShowInput(false);
    }
  };

  const closeEdit = () => {
    setName(title);
    setShowInput(false);
  };

  return (
    <div className="w-[70%]">
      {showInput ? (
        <div className="w-full flex items-center gap-2">
          <div
            className={`flex flex-col items-start w-full relative ${inputContainerClasses}`}
          >
            <input
              {...register("name", { required: true })}
              value={name}
              className={`border-b-2 mt-1 focus:border-b-2 focus:border-black focus:outline-none ${inputClasses}`}
              onChange={(event) => {
                setName(event.target.value);
                trigger();
              }}
            />
            {errors.name && (
              <p className="absolute text-red-500 text-sm top-9">
                {errorMessage ? errorMessage : "Please enter a nane"}
              </p>
            )}
          </div>
          <button
            className="border-2 px-3 py-1 ml-4 text-md text-green-700 border-green-700 rounded-full"
            onClick={onSubmit}
          >
            Save
          </button>
          <button
            className="border-2 px-3 py-1 text-md text-red-700 border-red-700 rounded-full"
            onClick={closeEdit}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          className="w-full flex items-center gap-3"
          onMouseEnter={() => {
            setShowEditIcon(true);
          }}
          onMouseLeave={() => {
            setShowEditIcon(false);
          }}
        >
          <h1 className={headerClasses}>{name}</h1>
          {showEditIcon && (
            <GrFormEdit
              size={32}
              className="text-slate-800 cursor-pointer mt-1"
              onClick={() => {
                setShowInput(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
