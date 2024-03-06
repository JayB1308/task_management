import { useEffect } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { useSelector, useDispatch } from "react-redux";
import { changeTab } from "../store/slices/tabSlices";

export function Auth() {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => {
    return state.tab.currentTab;
  });

  const changeCurrentTab = (tab) => {
    dispatch(changeTab(tab));
  };

  const getActiveClassname = (tab) => {
    let classes = "";
    if (tab === currentTab) {
      classes = "bg-white rounded-full shadow text-indigo-400";
    }
    return classes;
  };

  useEffect(() => {
    dispatch(changeTab("login"));
  }, []);

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-1/2 min-h-[250px] shadow-lg p-10">
        <ul className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-full p-1">
          <li
            onClick={() => {
              changeCurrentTab("login");
            }}
            className={`flex justify-center py-4 text-xl ${getActiveClassname(
              "login"
            )}`}
          >
            Login
          </li>
          <li
            onClick={() => {
              changeCurrentTab("register");
            }}
            className={`flex justify-center py-4 text-xl ${getActiveClassname(
              "register"
            )}`}
          >
            Register
          </li>
        </ul>
        {currentTab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}
