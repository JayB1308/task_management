import { useSelector } from "react-redux";
import { Sidebar } from "./components/Sidebar";
import Router from "./routes";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {isLoggedIn && <Sidebar />}
      <Router />
    </>
  );
}

export default App;
