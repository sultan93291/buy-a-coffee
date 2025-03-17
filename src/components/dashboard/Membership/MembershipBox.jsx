import { useForm } from "react-hook-form";
import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape";
import { MdOutlineAttachMoney } from "react-icons/md";
import Rewards from "@/components/dashboard/Membership/Rewards";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import {
  useCreateMemberShipMutation,
  useGetMemberShipListQuery,
} from "@/redux/features/api/apiSlice";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function MembershipBox() {
  const loggedInUserData = useSelector(
    state => state.userDocReducer.loggedInuser
  );

  const [CreatememberShip, { data, isLoading, error }] =
    useCreateMemberShipMutation();
  const {
    data: membershipData,
    error: membershipError,
    isLoading: ismembershipLoading,
    refetch,
  } = useGetMemberShipListQuery(loggedInUserData?.id);
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
    reset();
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.data);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success(data?.message);
      refetch();
    }
  }, [data]);

  console.log(membershipData?.data[0]?.price);

  return (
    <div className="shadow-[8px_8px_32px_0px_rgba(34,34,34,0.13)] rounded-[12px]">
      <CommonBoxhShape>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* input group  */}
          <div className="mt-8">
            <label htmlFor="membershipPrice" className="input-label">
              Membership Moto
            </label>
            <div className="relative input-control">
              Create your monthly plan and share post .
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="membershipPrice" className="input-label">
              Price
            </label>
            <div className="relative">
              <input
                placeholder={
                  membershipData?.data[0]?.price
                    ? `Current  cost  ${membershipData?.data[0]?.price} £ `
                    : `Membership cost..`
                }
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
                    `${
                      membershipData?.data[0]?.price ? "Update" : "Create"
                    }  Membership`
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
