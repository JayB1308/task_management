import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";
import "dayjs";
import dayjs from "dayjs";

export function DateSetter({
  date,
  label,
  pickerClasses,
  containerClasses,
  handleDateChange,
}) {
  const [show, setShow] = useState(false);
  const [newDate, setNewDate] = useState(date);

  const handleChange = (date) => {
    setNewDate(date);
    setShow(false);
    handleDateChange(date);
  };

  return (
    <div
      className={containerClasses}
      onClick={() => {
        setShow(true);
      }}
    >
      {show ? (
        <div className="w-full">
          <DatePicker
            selected={newDate}
            onChange={handleChange}
            className={pickerClasses}
            onClickOutside={() => setShow(false)}
            onCalendarClose={() => setShow(false)}
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-between border-2 border-slate-600 px-3 py-1 rounded-md">
          <p className="text-xs font-semibold">{label}</p>
          {date ? (
            <span className="text-md font-semibold">
              {dayjs(date).format("DD/MM")}
            </span>
          ) : (
            <FaCalendar
              size={18}
              className="text-gray-500"
              onClick={() => {
                setShow(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
