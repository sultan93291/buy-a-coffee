import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useUpdatePasswordIntentMutation } from "@/redux/features/api/apiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

function ChangesPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [updatePassword, { data, error, isLoading, isSuccess }] =
    useUpdatePasswordIntentMutation();

  const newPassword = watch("newPassword");
  const onSubmit = async data => {
    const updatedPasswordData = {
      previous_password: data.prevPass,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    };

    try {
      const response = await updatePassword(updatedPasswordData).unwrap();

      if (response?.code === 200) {
        toast.success(response?.message || "Password updated successfully!");
        console.log("Password updated successfully:", response);
      }
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error(error?.data?.message || "Failed to update password");
    } finally {
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* input group  */}
      <div className="mt-4">
        <label htmlFor="prevPass" className="input-label">
          Prvious password
        </label>
        <input
          className={`input-control ${
            errors.prevPass
              ? "border-red-500"
              : "border-[rgba(113,113,113,0.12)]"
          }`}
          type="text"
          id="prevPass"
          name="prevPass"
          {...register("prevPass")}
        />
      </div>
      {/* input group  */}
      <div className="mt-4">
        <label htmlFor="newPassword" className="input-label">
          New Password
        </label>
        <input
          className={`input-control ${
            errors.newPassword
              ? "border-red-500"
              : "border-[rgba(113,113,113,0.12)]"
          }`}
          type="password"
          id="newPassword"
          name="newPassword"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "New password must be at least 8 characters",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-2">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      {/* input group  */}
      <div className="mt-4">
        <label htmlFor="confirmPassword" className="input-label">
          Confirm Password
        </label>
        <input
          className={`input-control ${
            errors.confirmPassword
              ? "border-red-500"
              : "border-[rgba(113,113,113,0.12)]"
          }`}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: value =>
              value === newPassword || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-2">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="text-right mt-[30px]">
        <button button={isLoading} type="submit">
          <ButtonPrimary
            text={
              isLoading ? (
                <>
                  <BeatLoader size={10} color={"#000"} speedMultiplier={0.5} />
                </>
              ) : (
                "Save Changes"
              )
            }
            type="small"
          />
        </button>
      </div>
    </form>
  );
}

export default ChangesPasswordForm;
