import { useContext, useEffect } from "react";
import AuthLeft from "../components/auth/AuthLeft";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { UsernameContext } from "../context";
import Logo from "../assets/images/logo.svg";
import { useRegisterUserIntentMutation } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";


function SignUpPage() {
  const navigate = useNavigate();
  const [registerUser, { data, isLoading, error }] =
    useRegisterUserIntentMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



  const userName = useSelector(state => state.userDocReducer.userName);

  useEffect(() => {
    if (!userName) {
      navigate("/createaccount");
    }
  }, [userName]);

  const onSubmit = async data => {
    console.log(data);

    const SubmittedData = {
      user_name: userName,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await registerUser(SubmittedData).unwrap();
      console.log(response);

      if (response?.code === 200) {
        toast.success(response?.message);
        navigate("/signupsteps");
        localStorage.setItem("Refreshtoken", response?.data?.token);
      }
    } catch (err) {
      console.error("❌ Error checking username:", err);

      // Log the full error object for debugging
      console.log("Full error object:", err?.data?.message);

      let errorMessage = "Something went wrong!";

      // Check if the error has a response and message
      if (err?.data?.message) {
        errorMessage = err?.data?.message; // Extract the error message
      }
      // If error has a general message property (non-Axios errors)
      else if (err?.message) {
        errorMessage = err.message;
      }
      // Fallback to the full error message if none of the above conditions work
      else {
        errorMessage = "An unexpected error occurred.";
      }

      console.log("Error message:", errorMessage); // Log the final error message

      // Show the error message to the user in a toast
      toast.error(`Error: ${errorMessage}`);
    } finally {
      reset(); // Reset the form after the try-catch block
    }
  };

  const { username } = useContext(UsernameContext);

  return (
    <section>
      <div className="flex items-start">
        <div className="w-[40%] hidden lg:block">
          <AuthLeft />
        </div>
        <div className="auth-right lg:w-[60%] min-h-screen max-h-screen pt-5 lg:pt-[60px] pr-5 lg:pr-[32px] pl-5 lg:pl-[136px] pb-[100px] overflow-y-auto">
          <div className="text-right">
            <div className="flex items-center justify-between lg:justify-end">
              <img className="lg:hidden" src={Logo} alt="" />
              <p className="text-base lg:text-[18px]">
                <span className="hidden lg:inline">
                  Already have account ?{" "}
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
          <div className="auth-box mt-14 relative">
            <h1 className="auth-header">Welcome {userName || "Guest"}</h1>

            <form
              className="mt-10 lg:mt-[56px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* email  */}
              <div className="mt-4">
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={`auth-input ${
                    errors.email ? "border-red-300" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* password  */}
              <div className="mt-4">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={`auth-input ${
                    errors.password ? "border-red-300" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex md:block items-center">
                <input
                  {...register("terms", {
                    required: "You must accept the terms and conditions",
                  })}
                  type="checkbox"
                  id="terms"
                  name="terms"
                />
                <label
                  htmlFor="terms"
                  className="text-sm ml-2 mt-3 inline-block"
                >
                  By continuing, you agree to the terms of service and privacy
                  policy.
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.terms.message}
                </p>
              )}
              {/* submit btn  */}
              <button
                disabled={isLoading}
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
                      "Sign up"
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

export default SignUpPage;
