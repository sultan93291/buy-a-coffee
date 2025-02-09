import React, { useContext } from "react";
import AuthLeft from "../components/auth/AuthLeft";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import SslLogin from "../components/sslcomponent/SslLogin";
import FacebookIcon from "../assets/images/Facebook-ssl.svg";
import GoogleIcon from "../assets/images/google-ssl.svg";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/images/logo.svg";
import { useLoginUserIntentMutation } from "@/redux/features/api/apiSlice";
import { AuthContext } from "@/provider/AuthContextProvider";
import { BeatLoader } from "react-spinners";
import { setUserName } from "@/redux/features/userDocSlice";
import { useDispatch } from "react-redux";

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [useLoginUserIntent, { data, isLoading, error }] =
    useLoginUserIntentMutation();
  const { fetchData } = useContext(AuthContext);

  const onSubmit = async data => {
    console.log(data.email, data.password);

    try {
      const response = await useLoginUserIntent({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response?.code === 200) {
        toast.success(response?.message);
        localStorage.setItem("token", response?.data?.token);
        fetchData();
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error?.data?.message);
    } finally {
      reset();
    }
  };

  return (
    <section>
      <div className="flex items-start">
        <div className="w-[40%] hidden lg:block">
          <AuthLeft />
        </div>
        <div className="auth-right w-full lg:w-[60%] min-h-screen max-h-screen pt-5 lg:pt-[60px] pr-5 lg:pr-[32px] pl-5 lg:pl-[136px] pb-[100px] overflow-y-auto">
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
                  Don't have an account ?{" "}
                </span>
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
              className="mt-10 lg:mt-[56px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="auth-header">Welcome back</h1>
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
                      message: "Password must be at least 8 characters",
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
                      "Log in"
                    )
                  }
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}

export default LoginPage;
