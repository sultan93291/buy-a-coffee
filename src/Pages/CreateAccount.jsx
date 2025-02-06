import { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UsernameContext } from "../context";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Logo from "../assets/images/logo.svg";
import AuthLeft from "../components/auth/AuthLeft";
import { Link } from "react-router-dom";

function CreateAccount() {
  const { setUsername } = useContext(UsernameContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Get initial username from Redux
  const userNameFromStore = useSelector(state => state.userDocReducer.userName);

  // Local state to manage input value
  const [userName, setUserName] = useState(userNameFromStore || "");

  // Update local state if the Redux state changes
  useEffect(() => {
    setUserName(userNameFromStore);
  }, [userNameFromStore]);

  const onSubmit = data => {
    console.log(data);
    reset();
    setUsername(data.username);
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  };

  // Handle user input change
  const handleInputChange = e => {
    setUserName(e.target.value);
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
              <img className="lg:hidden" src={Logo} alt="Logo" />
              <p className="text-base lg:text-[18px]">
                <span className="hidden lg:inline">Don't have an account?</span>
                <Link
                  to={"/signup"}
                  className="duration-200 ease-in-out hover:text-primaryColor underline lg:no-underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          <div className="auth-box">
            <form
              className="mt-[60px] md:mt-[150px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="auth-header text-left mb-0">
                Create your account
              </h1>
              <p className="lg:text-[18px] text-paraDark mt-3">
                Choose a username for your page.
              </p>
              <div className="mt-8 relative">
                <input
                  {...register("username", {
                    required: "Username is required.",
                  })}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  value={userName} // Now it's controlled by state
                  onChange={handleInputChange} // Update state on user input
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
              <button type="submit" className="text-center w-full mt-8">
                <ButtonPrimary text="Next" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;
