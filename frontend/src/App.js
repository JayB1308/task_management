import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeam } from "./store";
import { Sidebar } from "./components/Sidebar";
import Router from "./routes";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (isLoggedIn && user) {
      dispatch(getTeam(user.team_id));
    }
  }, [user, isLoggedIn]);

  return (
    <>
      {isLoggedIn && <Sidebar />}
      <Router />
    </>
  );
}

export default App;
