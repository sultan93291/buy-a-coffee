import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UsernameContext } from "../context";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Logo from "../assets/images/logo.svg";
import AuthLeft from "../components/auth/AuthLeft";
import { Link } from "react-router-dom";
import { setUserName } from "@/redux/features/userDocSlice";
import toast from "react-hot-toast";
import { useCheckUserNameAvialabilitiesIntentMutation } from "@/redux/features/api/apiSlice";
import { BeatLoader } from "react-spinners";

function CreateAccount() {
  const navigate = useNavigate();
  const { setUsername } = useContext(UsernameContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Get initial username from Redux
  const userNameFromStore = useSelector(state => state.userDocReducer.userName);

  // Local state to manage input value
  const [userName, setUserNameState] = useState(userNameFromStore || "");

  const dispatch = useDispatch();

  const [checkUserName, { data, isLoading, error }] =
    useCheckUserNameAvialabilitiesIntentMutation();

  // Update local state if the Redux state changes
  useEffect(() => {
    setUserNameState(userNameFromStore);
  }, [userNameFromStore]);

  // Handle user input change
  const handleInputChange = e => {
    setUserNameState(e.target.value); // Update local state on user input
  };

  const handleUserNameSubmit = async e => {
    e.preventDefault();
    if (userNameFromStore) {
      setTimeout(() => {
        navigate("/signup");
      }, 500);
    } else {
      if (userName !== "") {
        try {
          const result = await checkUserName({ userName: userName }).unwrap(); // ✅ Unwrap full response
          if (result?.success) {
            dispatch(setUserName(userName));
            setUserName(userName);
            toast.success(result?.message);
            navigate("/signup");
          } else {
            toast.error("Username is already taken! , choose another");
          }
        } catch (err) {
          console.error("❌ Error checking username:", err);
          // Extract error message if available
          const errorMessage = err?.data?.message || "Something went wrong!";
          toast.error(`Error: ${errorMessage}`);
        }
      } else {
        toast.error("User name is required");
      }
    }
  };

  return (
    <section>
      <div className="flex items-start">
        <div className="w-[40%] hidden lg:block">
          <AuthLeft />
        </div>
        <div className="auth-right lg:w-[60%] min-h-screen max-h-screen pt-5 lg:pt-[60px] pr-5 lg:pr-[32px] pl-5 lg:pl-[136px] pb-[100px] overflow-y-auto">
          <div className="text-right">
            <div className="flex items-center justify-between lg:justify-end">
              <img
                onClick={e => {
                  e.preventDefault();
                  dispatch(setUserName(""));
                  navigate("/");
                }}
                className="lg:hidden"
                src={Logo}
                alt=""
              />
              <p className="text-base lg:text-[18px]">
                <span className="hidden lg:inline">
                  Already have a account ?{" "}
                </span>
                <Link
                  to={"/login"}
                  className="duration-200 ease-in-out hover:text-primaryColor underline lg:no-underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          <div className="auth-box">
            <form className="mt-[60px] md:mt-[150px]">
              <h1 className="auth-header text-left mb-0">
                Create your account
              </h1>
              <p className="lg:text-[18px] text-paraDark mt-3">
                Choose a username for your page.
              </p>
              <div className="mt-8 relative">
                <input
                  disabled={userNameFromStore ? true : false}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  value={userName} // Now it's controlled by state
                  onChange={e => {
                    handleInputChange(e);
                  }} // Update state on user input
                  className={`py-3 px-6 pl-[160px] md:pl-[180px] rounded-[8px] bg-authInput border md:text-[18px] font-medium text-headingColor w-full placeholder:text-headingColor focus:outline-none ${
                    errors.username ? "border-red-300" : ""
                  }`}
                />

                <p className="absolute top-1/2 left-6 translate-y-[-50%] font-medium md:text-[18px]">
                  giftacoffee.com/
                </p>
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
              <button
                disabled={isLoading}
                onClick={e => {
                  handleUserNameSubmit(e);
                }}
                type="submit"
                className="text-center w-full mt-8"
              >
                <ButtonPrimary
                  text={
                    isLoading ? (
                      <>
                        <BeatLoader
                          size={10}
                          color={"#000"}
                          speedMultiplier={0.5}
                        />
                      </>
                    ) : (
                      "Next"
                    )
                  }
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;
