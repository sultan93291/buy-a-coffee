import { useForm } from "react-hook-form";
import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape";
import { MdOutlineAttachMoney } from "react-icons/md";
import Rewards from "@/components/dashboard/Membership/Rewards";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useCreateMemberShipMutation } from "@/redux/features/api/apiSlice";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";
import toast from "react-hot-toast";

function MembershipBox() {
  const [CreatememberShip, { data, isLoading, error }] =
    useCreateMemberShipMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    console.log(data.membershipPrice);
    await CreatememberShip({
      price: data?.membershipPrice,
    }).unwrap();
    reset()
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.data);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success(data?.message);
    }
  }, [data]);

  // console.log(data, isLoading, error);

  return (
    <div className="shadow-[8px_8px_32px_0px_rgba(34,34,34,0.13)] rounded-[12px]">
      <CommonBoxhShape>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* input group  */}
          <div className="mt-8">
            <label htmlFor="membershipPrice" className="input-label">
              Membership type
            </label>
            <div className="relative">
              <input
                placeholder="Add Your Membership type"
                className={`input-control  ${
                  errors.membershipPlan
                    ? "border-red-500"
                    : "border-[rgba(113,113,113,0.12)]"
                }`}
                type="text"
                id="membershipPlan"
                name="membershipPlan"
                {...register("membershipPlan", {
                  required: "Membership price is required",
                })}
              />
            </div>
            {errors.membershipPlan && (
              <p className="text-red-500 text-sm mt-2">
                {errors.membershipPlan.message}
              </p>
            )}
          </div>
          <div className="mt-8">
            <label htmlFor="membershipPrice" className="input-label">
              Price
            </label>
            <div className="relative">
              <input
                placeholder="Add Your Membership price amount.."
                className={`input-control pl-16 ${
                  errors.membershipPrice
                    ? "border-red-500"
                    : "border-[rgba(113,113,113,0.12)]"
                }`}
                type="text"
                id="membershipPrice"
                name="membershipPrice"
                {...register("membershipPrice", {
                  required: "Membership price is required",
                })}
              />
              <div className="absolute top-1/2 translate-y-[-50%] left-4 text-2xl text-paraDark">
                <span>£</span>
              </div>
              {/* divider  */}
              <p className="divider h-full w-[1px] bg-[#e3e3e3] absolute top-0 left-[52px]"></p>
              {/* plan name  */}
              <p className="absolute top-1/2 translate-y-[-50%] right-5 text-[#717171]">
                Monthly
              </p>
            </div>
            {errors.membershipPrice && (
              <p className="text-red-500 text-sm mt-2">
                {errors.membershipPrice.message}
              </p>
            )}
          </div>
          {/* rewards  */}
          <div className="mt-8">
            <p className="font-semibold text-[#414651]">Rewards</p>
            <div>
              <div className="mt-3">
                <Rewards text="Support me on a monthly basis" />
              </div>
              <div className="mt-3">
                <Rewards text="Support will be able gain access with the exclusive contents" />
              </div>
            </div>
          </div>
          {/* submit btn  */}
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="text-center w-full mt-8"
            >
              <ButtonPrimary
                type="small"
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
                    "Create Membership"
                  )
                }
              />
            </button>
          </div>
        </form>
      </CommonBoxhShape>
    </div>
  );
}

export default MembershipBox;
