import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (inProgress !== "none") {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || accounts.length === 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
