import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthLeft from "../components/auth/AuthLeft";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import SslLogin from "../components/sslcomponent/SslLogin";
import FacebookIcon from "../assets/images/Facebook-ssl.svg";
import GoogleIcon from "../assets/images/google-ssl.svg";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/images/logo.svg";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/api/apiSlice";
import { AuthContext } from "@/provider/AuthContextProvider";
import { BeatLoader } from "react-spinners";
import { setUserName } from "@/redux/features/userDocSlice";
import { useDispatch, useSelector } from "react-redux";

const VerifyOtp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [otp, setOtp] = useState({
    otpOne: "",
    otpTwo: "",
    otpThree: "",
    otpFour: "",
  });

  const [useVerifyOtp, { data, isLoading, error }] = useVerifyOtpMutation();
  const [
    resendOtp,
    { data: resetOtpData, isLoading: isOtpLoading, error: resendOtpError },
  ] = useResendOtpMutation();

  const handleFormData = e => {
    const { name, value } = e.target;

    // Allow only numeric values and restrict to a single digit
    if (/^\d?$/.test(value)) {
      setOtp(prev => ({ ...prev, [name]: value }));
      setValue(name, value); // Update react-hook-form state

      // Move focus based on input
      if (value) {
        const nextInput = document.querySelector(
          `input[name="${getNextInputName(name)}"]`
        );
        if (nextInput) nextInput.focus();
      } else {
        const prevInput = document.querySelector(
          `input[name="${getPrevInputName(name)}"]`
        );
        if (prevInput) prevInput.focus();
      }
    }
  };

  const handlePaste = e => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^\d{4}$/.test(pasteData)) {
      const digits = pasteData.split("");
      const fieldNames = ["otpOne", "otpTwo", "otpThree", "otpFour"];

      let allPreviousFilled = true;
      fieldNames.forEach((field, index) => {
        if (!allPreviousFilled) return; // Stop if any previous field is empty
        setOtp(prev => ({ ...prev, [field]: digits[index] }));
        setValue(field, digits[index]); // Update react-hook-form state

        if (!digits[index]) {
          allPreviousFilled = false;
        }
      });

      document.querySelector(`input[name="otpFour"]`).focus();
    }
  };

  const getNextInputName = currentName => {
    const fields = ["otpOne", "otpTwo", "otpThree", "otpFour"];
    const currentIndex = fields.indexOf(currentName);
    return currentIndex < fields.length - 1 ? fields[currentIndex + 1] : null;
  };

  const getPrevInputName = currentName => {
    const fields = ["otpOne", "otpTwo", "otpThree", "otpFour"];
    const currentIndex = fields.indexOf(currentName);
    return currentIndex > 0 ? fields[currentIndex - 1] : null;
  };

  const onSubmit = async () => {
    const otpCode = otp.otpOne + otp.otpTwo + otp.otpThree + otp.otpFour;
    const email = localStorage.getItem("email");
    const data = {
      email: email,
      otp: Number(otpCode),
    };
    try {
      const response = await useVerifyOtp(data).unwrap();
      if (response?.code == 200) {
        toast.success(response?.message);
        localStorage.setItem("email", data?.email);
        navigate("/change-password");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message.email[0]);
    } finally {
      setOtp({
        otpOne: "",
        otpTwo: "",
        otpThree: "",
        otpFour: "",
      });
    }
    
  };

  const handleResendVerifyOtp = async () => {
    const email = localStorage.getItem("email");
    await resendOtp(email);
  };

  useEffect(() => {
    if (resetOtpData) {
      toast.success(resetOtpData?.message);
    }
  }, [resetOtpData]);

  useEffect(() => {
    if (resendOtpError) {
      toast.error(resendOtpError?.message);
    }
  }, [resendOtpError]);

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
              <h1 className="auth-header"> Verify otp </h1>
              <div>
                <div className="mt-4 flex w-full gap-x-4   justify-center items-center ">
                  {["otpOne", "otpTwo", "otpThree", "otpFour"].map(
                    (field, index) => (
                      <input
                        key={index}
                        {...register(field, { required: "OTP is required" })}
                        type="text"
                        name={field}
                        value={otp[field]}
                        onChange={handleFormData}
                        onPaste={handlePaste} // 🔹 Added paste event handler
                        maxLength="1"
                        className={`auth-input w-12 h-12 p-2 border rounded-md text-center text-lg ${
                          errors[field] ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                    )
                  )}
                </div>
                <div className="w-full mt-2 flex justify-around   ">
                  <Link
                    onClick={() => {
                      handleResendVerifyOtp();
                    }}
                    className="cursor-pointer underline  "
                  >
                    {" "}
                    Resend otp{" "}
                  </Link>
                </div>
              </div>

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
                      "Verify your email address"
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
};

export default VerifyOtp;
