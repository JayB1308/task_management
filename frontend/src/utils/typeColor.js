export const getTypeText = (type) => {
  if (type === "TASK") {
    return "text-teal-800";
  } else if (type === "SUBTASK") {
    return "text-cyan-800";
  } else {
    return "text-purple-900";
  }
};

export const getTypeBG = (type) => {
  if (type === "TASK") {
    return "bg-teal-800";
  } else if (type === "SUBTASK") {
    return "bg-cyan-800";
  } else {
    return "bg-purple-900";
  }
};
