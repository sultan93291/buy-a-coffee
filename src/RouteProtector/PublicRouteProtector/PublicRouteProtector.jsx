import { AuthContext } from "@/provider/AuthContextProvider";
import { setIsExploreCreators } from "@/redux/features/userDocSlice";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const PublicRouteProtector = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const isExploreCreator = useSelector(
    state => state.userDocReducer.isExploreCreators
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();


  if (isAuthenticated && isExploreCreator) {
    navigate("/dashboard/explore");
    setTimeout(() => {
        dispatch(setIsExploreCreators(false));
    }, 10000);
  
  } else if (isAuthenticated && !isExploreCreator) {
    navigate("/dashboard/my-page");;
  }

  return children
};

export default PublicRouteProtector;
