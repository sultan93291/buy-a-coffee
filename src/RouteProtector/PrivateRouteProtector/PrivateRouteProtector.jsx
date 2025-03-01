import { AuthContext } from "@/provider/AuthContextProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouteProtector = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
 

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRouteProtector;


