import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import UsersPage from "./pages/UsersPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ConfigProvider } from "antd";
import TaskCard from "./components/TaskCard";
import { useEffect } from "react";
import { fetchUsers } from "./features/userSlice";
import { useDispatch } from "react-redux";
import AuthCallback from "./pages/AuthCallback";
import { useMsal } from "@azure/msal-react";

function App() {
  const dispatch = useDispatch();
  const { instance, accounts } = useMsal();

  const user = accounts[0];

  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]); // ⭐ VERY IMPORTANT
    }
  }, [accounts]);
  useEffect(() => {
    localStorage.setItem("username", user?.username || "Guest");
  }, [user]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={user?.length > 0 ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="tasklist/:id" element={<TaskCard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
