export const getStatusText = (status) => {
  if (status) {
    const statusType = status.split(".")[1];

    if (statusType === "ACTIVE") {
      return "text-yellow-600";
    } else if (statusType === "PENDING") {
      return "text-slate-800";
    } else if (statusType === "CLOSED") {
      return "text-green-800";
    }
  }
};

export const getStatusBackground = (status) => {
  if (status) {
    const statusType = status.split(".")[1];

    if (statusType === "ACTIVE") {
      return "bg-yellow-600";
    } else if (statusType === "PENDING") {
      return "bg-slate-800";
    } else if (statusType === "CLOSED") {
      return "bg-green-800";
    }
  }
};
