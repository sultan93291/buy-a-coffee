import { AuthContext } from "@/provider/AuthContextProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PublicRouteProtector = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect authenticated users to the dashboard
  return isAuthenticated ? <Navigate to="/dashboard/home" replace /> : children;
};

export default PublicRouteProtector;
