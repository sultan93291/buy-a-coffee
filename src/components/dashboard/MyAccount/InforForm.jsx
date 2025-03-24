import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useSelector } from "react-redux";
import { useUpdateProfileIntentMutation } from "@/redux/features/api/apiSlice";
import { AuthContext } from "@/provider/AuthContextProvider";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

function InforForm() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const [updateProfile, { data, error, isLoading, isSuccess }] =
    useUpdateProfileIntentMutation();
  const { fetchData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: loggedInUser?.name,
      email: loggedInUser?.email,
      pagelink: loggedInUser.page_link,
      country: loggedInUser.country,
    },
  });

  useEffect(() => {
    if (loggedInUser) {
      reset({
        fname: loggedInUser.name || "",
        email: loggedInUser.email || "",
        pagelink: loggedInUser.page_link || "",
        country: loggedInUser.country || "",
      });
    }
  }, [loggedInUser, reset]);

  const onInfoSubmit = async data => {
    const updateData = {
      name: data.fname || loggedInUser?.name,
      email: data.email || loggedInUser?.email,
      page_link:
        data.pagelink || loggedInUser?.page_link
          ? loggedInUser.page_link
          : "https://demo.page.link",
      country:
        data.country || loggedInUser?.country ? loggedInUser?.country : "UK",
    };

    console.log("Updating Profile with Data:", updateData);

    try {
      const response = await updateProfile({
        id: loggedInUser.id,
        updatedData: updateData,
      }).unwrap(); // Unwrap the response to directly access the result

      if (response?.code === 200) {
        fetchData();
        toast.success(response?.message);
        console.log("Profile updated successfully:", response);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onInfoSubmit)}>
      {/* input group  */}
      <div>
        <label htmlFor="f-name" className="input-label">
          Full Name
        </label>
        <input
          className={`input-control ${
            errors.fname ? "border-red-500" : "border-[rgba(113,113,113,0.12)]"
          }`}
          type="text"
          id="f-name"
          name="fname"
          {...register("fname")}
        />
      </div>
      {/* input group  */}
      <div className="mt-4 hidden">
        <label htmlFor="pagelink" className="input-label">
          My page link
        </label>
        <input
          className={`input-control ${
            errors.pagelink
              ? "border-red-500"
              : "border-[rgba(113,113,113,0.12)]"
          }`}
          type="text"
          id="pagelink"
          name="pagelink"
          placeholder="Enter your page link"
          {...register("pagelink")}
        />
      </div>
      {/* input group  */}
      <div className="mt-4">
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <input
          className={`input-control ${
            errors.email ? "border-red-500" : "border-[rgba(113,113,113,0.12)]"
          }`}
          type="text"
          id="email"
          name="email"
          {...register("email")}
        />
      </div>
      {/* input group  */}
      <div className="mt-4 hidden ">
        <label htmlFor="f-name" className="input-label">
          Country
        </label>
        <div className="w-full">
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full common-select">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="CA">CA</SelectItem>
                </SelectContent>
              </Select>
            )}
          ></Controller>
        </div>
      </div>
      <div className="text-right mt-[30px]">
        <button disabled={isLoading} type="submit">
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

export default InforForm;
