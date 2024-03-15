import "dayjs";
import dayjs from "dayjs";

export const calcDuration = (project) => {
  let parsed_start_date = dayjs(project?.project_meta?.start_date);
  let parsed_end_date = dayjs(project?.project_meta?.end_date);

  return parsed_start_date.diff(parsed_end_date, "day");
};
