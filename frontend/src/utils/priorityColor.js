export const getPriorityText = (type) => {
  if (type === "P0") {
    return "text-red-700";
  } else if (type === "P1") {
    return "text-yellow-600";
  } else {
    return "text-green-600";
  }
};

export const getPrioirityBG = (type) => {
  if (type === "P0") {
    return "bg-red-700";
  } else if (type === "P1") {
    return "bg-yellow-600";
  } else {
    return "bg-green-600";
  }
};
