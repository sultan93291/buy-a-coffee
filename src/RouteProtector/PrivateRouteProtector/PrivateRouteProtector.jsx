import { AuthContext } from "@/provider/AuthContextProvider";
import { useContext } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";


const PrivateRouteProtector = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { creatorId } = useParams();
  const location = useLocation();
  const isAllowedRoute =
    location.pathname === "/explore" || creatorId !== undefined;

  return isAuthenticated || isAllowedRoute ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRouteProtector;
