export const getStatusBgColor = (status, text) => {
  if (status) {
    const statusType = status.split(".")[1];

    if (statusType === "ACTIVE") {
      return text ? "text-yellow-600" : "bg-yellow-600";
    } else if (statusType === "PENDING") {
      return text ? "text-slate-800" : "bg-slate-800";
    } else if (statusType === "CLOSED") {
      return text ? "text-green-800" : "bg-green-800";
    }
  }
};
