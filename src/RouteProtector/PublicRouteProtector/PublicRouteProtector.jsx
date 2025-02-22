import { AuthContext } from "@/provider/AuthContextProvider";
import { setIsExploreCreators } from "@/redux/features/userDocSlice";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";


const PublicRouteProtector = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const isExploreCreator = useSelector(
    state => state.userDocReducer.isExploreCreators
  );
  const dispatch = useDispatch();


  if (isAuthenticated && isExploreCreator) {
    window.location.href = `/dashboard/explore`;
    // dispatch(setIsExploreCreators(false));
  } else if (isAuthenticated && !isExploreCreator) {
    window.location.href = `/dashboard/my-page`;
  }

  return children
};

export default PublicRouteProtector;
