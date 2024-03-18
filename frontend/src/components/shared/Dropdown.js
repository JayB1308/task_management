import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export function Dropdown({
  isOpen,
  setIsOpen,
  options,
  buttonClasses,
  iconClasses,
  width,
  dropdownClasses,
  handleChange,
  currentSelection,
  disableCondition,
  disabledOption,
}) {
  return (
    <div className={`relative ${width}`}>
      <button
        disabled={disableCondition}
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClasses} ${
          disableCondition && "cursor-not-allowed"
        } w-full px-2 py-1 flex items-center justify-between gap-2  ${
          isOpen ? "rounded-t-md" : "rounded-md"
        }`}
      >
        {disableCondition ? disabledOption : currentSelection}
        {isOpen ? (
          <FaChevronUp
            onClick={() => {
              setIsOpen(false);
            }}
            size={18}
            className={`${iconClasses} `}
          />
        ) : (
          <FaChevronDown
            onClick={() => {
              setIsOpen(true);
            }}
            size={18}
            className={`${iconClasses} `}
          />
        )}
      </button>
      {isOpen && (
        <ul
          className={`absolute flex flex-col ${dropdownClasses} w-full px-2 items-start top-8`}
        >
          {options.map((option) => {
            return (
              <li
                key={option.label}
                className={`${option.class} cursor-pointer`}
                onClick={() => handleChange(option.value)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
