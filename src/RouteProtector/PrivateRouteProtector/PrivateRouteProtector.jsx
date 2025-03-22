import { AuthContext } from "@/provider/AuthContextProvider";
import { useContext } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

const PrivateRouteProtector = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { creatorId } = useParams();
  const location = useLocation();
  const isAllowedRoute =
    location.pathname === "/explore" ||
    creatorId !== undefined ||
    location.pathname === "/account-connect-successfull" ||
    location.pathname === "/payment-success" ||
    location.pathname === "/payment-error";

  return isAuthenticated || isAllowedRoute ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRouteProtector;
