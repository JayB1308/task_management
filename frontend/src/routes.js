import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Project } from "./pages/Project";
import { CurrentProject } from "./pages/CurrentProject";
import { CurrentTask } from "./components/CurrentTask";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => {
    return state.user.isLoggedIn;
  });

  return isLoggedIn ? children : <Navigate to="/auth" />;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project"
        element={
          <ProtectedRoute>
            <Project />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:projectID"
        element={
          <ProtectedRoute>
            <CurrentProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/task/:taskID"
        element={
          <ProtectedRoute>
            <CurrentTask />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
