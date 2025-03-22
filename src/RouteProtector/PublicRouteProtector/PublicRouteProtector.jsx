import { AuthContext } from "@/provider/AuthContextProvider";
import { setIsExploreCreators } from "@/redux/features/userDocSlice";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRouteProtector = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const isExploreCreator = useSelector(
    state => state.userDocReducer.isExploreCreators
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  

  useEffect(() => {
    if (isAuthenticated) {
      if (isExploreCreator) {
        navigate("/explore");
        setTimeout(() => {
          dispatch(setIsExploreCreators(false));
        }, 10000);
      } else {
        navigate("/my-page");
      }
    }
  }, [isAuthenticated, isExploreCreator, navigate, dispatch]);

  return isAuthenticated ? null : children; 
};

export default PublicRouteProtector;
