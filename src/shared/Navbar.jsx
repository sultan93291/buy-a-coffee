import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import MenuBar from "../assets/images/menu-bar.png";
import { useState } from "react";
import { setIsExploreCreators } from "@/redux/features/userDocSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/createaccount" ||
    location.pathname === "/signupsteps" ||
    location.pathname === "/forgot-pass" ||
    location.pathname === "/verify-otp" ||
    location.pathname === "/change-password"
  ) {
    return null;
  }
  return (
    <header className="lg:mt-8 fixed w-full z-20">
      <div className="container py-3 px-4 lg:py-2 lg:px-4 md:rounded-[200px] bg-white">
        <div className="flex items-center justify-between">
          <div data-aos="zoom-in">
            <Link to={"/"}>
              <img
                className="w-10 h-10 lg:w-[72px] lg:h-[72px]"
                src={Logo}
                alt=""
              />
            </Link>
          </div>
          <div className="relative">
            {/* menu  */}
            <ul
              className={`bg-white shadow-lg lg:shadow-none lg:bg-transparent lg:flex lg:items-center absolute lg:relative lg:top-0 right-0 p-5 lg:p-0 rounded-[12px] lg:rounded-0 w-[190px] lg:w-auto ${
                isMenuOpen
                  ? "opacity-100 visible top-6 duration-200 ease-in"
                  : "opacity-0 invisible top-8 lg:opacity-100 lg:visible duration-200 ease-out"
              }`}
            >
              <li
                onClick={() => {
                  dispatch(setIsExploreCreators(true));
                }}
                className="lg:mr-12 font-semibold duration-200 ease-in-out hover:text-primaryColor"
                data-aos="fade-In"
                data-aos-delay="100"
              >
                <NavLink to={"/explore"}>Explore Creators</NavLink>
              </li>
              <li
                className="lg:mr-10 mt-3 lg:mt-0 font-semibold duration-200 ease-in-out hover:text-primaryColor"
                data-aos="fade-In"
                data-aos-delay="200"
              >
                <NavLink to={"/login"}>Log In</NavLink>
              </li>
              <li
                className="signup mt-5 lg:mt-0"
                data-aos="fade-In"
                data-aos-delay="300"
              >
                <Link to={"/createaccount"} className="inline-block">
                  <ButtonPrimary text="Sign up" />
                </Link>
              </li>
            </ul>
            {/* menu toggler  */}
            <div
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img src={MenuBar} alt="" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
