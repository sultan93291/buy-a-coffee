import React, { useContext, useState } from "react";
import { StepFormContext } from "../context";
import { useForm } from "react-hook-form";
import AuthLeft from "../components/auth/AuthLeft";
import AuthWarning from "../components/auth/AuthWarning";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import DefaultAvatar from "../assets/images/camera.png";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCompleteProfileIntentMutation } from "@/redux/features/api/apiSlice";

function StepsSignupPage() {
  const { step, nextStep, prevStep, updateFormData, formData } =
    useContext(StepFormContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [useCompleteProfileIntent] = useCompleteProfileIntentMutation();

  const navigate = useNavigate();

  const [avatar, setavatar] = useState();

  const handleUserProfile = e => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setUserAvatar(URL.createObjectURL(file));
      setValue("profilePic", file); // Ensure form state gets updated
      setavatar(file); // Ensure state updates properly
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const onSubmit = async data => {
    const updatedData = {
      ...data,
      profilePic: watch("profilePic"), // Ensure React Hook Form captures file
    };

    const formData = new FormData();

    // Ensure avatar is a valid File object
    if (!avatar) {
      toast.error("Please upload an avatar.");
      return;
    }

    formData.append("avatar", avatar);
    formData.append("name", updatedData?.displayName);
    formData.append("bio", updatedData?.bio);

    // Debugging: Check FormData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const result = await useCompleteProfileIntent(formData).unwrap();
      console.log("Success:", result);
      toast.success(
        "Signup completed successfully. Your profile has been updated."
      );

      setTimeout(() => {
        navigate("/dashboard/home");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const [userAvatar, setUserAvatar] = useState(DefaultAvatar);

  return (
    <div className="flex items-start">
      <div className="w-[40%] hidden lg:block">
        <AuthLeft />
      </div>
      <form
        className="pl-5 lg:pl-[248px] pr-5 pt-[60px] lg:pt-[150px] w-full lg:w-[60%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="auth-box">
          {step === 1 && (
            <div>
              <div className="pb-10 border-b border-[rgba(113,113,113,0.12)]">
                <h2 className="auth-header text-left">Choose your profile</h2>
                <input
                  type="file"
                  id="userAvatar"
                  className="hidden"
                  {...register("profilePic")}
                  accept="image/*"
                  onChange={handleUserProfile}
                />
                <label
                  htmlFor="userAvatar"
                  className="flex items-center justify-center mx-auto mt-10 md:mt-20 cursor-pointer h-[140px] w-[140px] md:h-[200px] md:w-[200px] bg-[#e6e6e6] rounded-full overflow-hidden"
                >
                  <img src={userAvatar} alt="" />
                </label>
              </div>
              <div className="pt-10">
                <AuthWarning text="You can change it anytime" />
              </div>
              <div
                className="w-full text-center mt-7 md:mt-10"
                onClick={nextStep}
              >
                <ButtonPrimary text="Continue" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="pb-6 md:pb-10 border-b border-[rgba(113,113,113,0.12)]">
                <h2 className="auth-header text-left">About you</h2>
                <div>
                  <label
                    className="inline-block text-base font-semibold text-[#414651] mb-3"
                    htmlFor="displayName"
                  >
                    Display Name
                  </label>
                  <input
                    className="auth-input"
                    type="text"
                    id="displayName"
                    placeholder="Display Name here"
                    {...register("displayName", { required: true })}
                  />
                </div>
                <div className="mt-7 md:mt-10">
                  <label
                    className="inline-block text-base font-semibold text-[#414651] mb-3"
                    htmlFor="bio"
                  >
                    Edit Bio
                  </label>
                  <textarea
                    className="auth-input h-[188px] resize-none"
                    placeholder="Write here"
                    {...register("bio")}
                  ></textarea>
                </div>
                {errors.displayName && <span>This field is required</span>}
              </div>
              <button
                type="submit"
                className="w-full text-center mt-7 md:mt-10"
              >
                <ButtonPrimary text="Submit" />
              </button>
            </div>
          )}
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default StepsSignupPage;
