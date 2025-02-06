import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

function InforForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: "Saymon",
      email: "example@gmail.com",
      country: "US",
    },
  });

  const onInfoSubmit = (data) => {
    console.log(data);
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
      <div className="mt-4">
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
      <div className="mt-4">
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
        <button type="submit">
          <ButtonPrimary text="Save Changes" type="small" />
        </button>
      </div>
    </form>
  );
}

export default InforForm;
