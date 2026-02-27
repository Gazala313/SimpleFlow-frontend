import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import { useMsal } from "@azure/msal-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();

  const handleLogout = () => {
    // Clear auth data (adjust based on your app)
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.clear();
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });

    // Redirect to login page
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <h2>Task Tracker</h2>

      <div className="sidebar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/users">Users</Link>
      </div>
      <div className="sidebar-logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
