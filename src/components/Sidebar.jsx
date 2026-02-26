import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {

  const handleLogout = () => {
    // Clear auth data (adjust based on your app)
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.clear();

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
