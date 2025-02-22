import { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setLoggedInUserData,
  setUserName,
} from "@/redux/features/userDocSlice";

export const AuthContext = createContext(null);
const SiteURl = import.meta.env.VITE_SERVER_BASE_URL;

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. User not logged in.");
      setIsAuthenticated(false);
      return;
    }

    try {
      const res = await axios.get(`${SiteURl}/my-account`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.data; // Extract only the `data` object
      console.log("Fetched User Data:", userData);

      dispatch(setLoggedInUserData(userData)); // ✅ Store only `data`
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, window.location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    dispatch(setUserName(""));
    dispatch(setLoggedInUserData(null));
    window.location.href = "/";
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const token = localStorage.getItem("Refreshtoken"); // Always get the latest token

    if (!token && currentPath === "/signupsteps") {
      window.location.href = "/";
    } else if (token && currentPath !== "/signupsteps") {
      window.location.href = "/signupsteps";
    }
  }, []); // No dependencies (runs only once)

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogout, fetchData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
