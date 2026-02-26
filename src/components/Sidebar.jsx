import { Link } from "react-router-dom";
import "../styles/layout.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Task Tracker</h2>

      <div className="sidebar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/users">Users</Link>
      </div>
    </div>
  );
};

export default Sidebar;
