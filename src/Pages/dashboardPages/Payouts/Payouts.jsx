import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape";
import Top from "@/components/dashboard/Top";
import cardIcon from "../../../assets/images/card.svg";
import stripe from "../../../assets/images/stripeLogo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  useConnectStripeAccountMutation,
  useGetTotalPayoutQuery,
} from "@/redux/features/api/apiSlice";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthContextProvider";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BeatLoader, PuffLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

function Payouts() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const [open, setOpen] = useState(false);

  const [hovered, setHovered] = useState(false);
  const [payoutAmount, setpayoutAmount] = useState();
  const [Stripeurl, setStripeurl] = useState();

  const BtnColor = useSelector(state => state.btnReducer.btnColor);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor; // If BtnColor is undefined, use the default color

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor,
    border: `2px solid ${hovered ? buttonColor : "transparent"}`,
    color: hovered ? buttonColor : "#000",
  };

  const {
    data: payoutData,
    isLoading: isPayoutLoading,
    error: ispayoutError,
  } = useGetTotalPayoutQuery();

  console.log(payoutData?.data);

  const [connectStripe, { data, isLoading, error }] =
    useConnectStripeAccountMutation();
  const { fetchData } = useContext(AuthContext);

  const handleStripeConnect = async () => {
    try {
      const response = await connectStripe({
        email: loggedInUser.email,
      }).unwrap();

      if (response?.status === "success") {
        toast.success(
          response?.message ||
            "Stripe account connected successfully! Please check out the page and fill up all information."
        );

        if (response?.connected_account_url) {
          setStripeurl(response.connected_account_url);
          setOpen(true);
        }
      }
    } catch (error) {
      console.error("Stripe Connection Error:", error);
      toast.error(
        error?.message ||
          error.data.message ||
          error.response ||
          error.response.message
      );
    }
  };

  const handleRedirect = link => {
    if (link) {
      window.location.href = link;
    }
  };

  useEffect(() => {
    if (payoutData) {
      setpayoutAmount(payoutData?.data);
    }
  }, [payoutData]);

  if (isPayoutLoading)
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <PuffLoader size={100} color="#99FF6D" />
      </div>
    );

  return (
    <>
      <div>
        <div>
          <Top title="Payouts" />
        </div>
        <div>
          <CommonBoxhShape>
            <p className="text-headingColor font-semibold mb-6">
              Total payouts
            </p>
            <h3 className=" text-[20px] xl:text-[40px] font-bold text-[#3D464F]">
              £{payoutAmount}
            </h3>
          </CommonBoxhShape>
        </div>
        <div>
          {loggedInUser.onboard_complete === 0 ? (
            <CommonBoxhShape>
              <div className="text-center">
                <p className="text-[20px] font-semibold text-headingColor mb-2">
                  Get Paid with Stripe
                </p>
                <p className="h-[80px] w-[100px] mx-auto mb-2 rounded-full flex items-center justify-center object-cover ">
                  <img src={stripe} alt="thunderImg" />
                </p>
              </div>
              <div className="w-full flex items-center justify-center ">
                <p className="text-base text-paraDark">
                  Instant payout via stripe
                </p>
              </div>
              <div
                onClick={() => {
                  handleStripeConnect();
                }}
              >
                <Link
                  style={buttonStyles}
                  to={""}
                  className="flex items-center gap-[10px] py-4 px-8 rounded-[60px]  text-headingColor w-fit mx-auto font-bold mt-9"
                >
                  {isLoading ? (
                    <BeatLoader
                      size={10}
                      color={"#000"}
                      speedMultiplier={0.5}
                    />
                  ) : (
                    <>
                      <img src={cardIcon} alt="cardIcon" />
                      <p>Connect Stripe</p>
                    </>
                  )}
                </Link>
              </div>
            </CommonBoxhShape>
          ) : (
            <h2 className="my-5 text-[20px] font-semibold text-headingColor  ">
              Account Already connected
            </h2>
          )}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClick={e => e.stopPropagation()}>
          <DialogHeader>
            <DialogDescription onClick={e => e.stopPropagation()}>
              <div className=" flex flex-col gap-y-5 h-auto w-auto z-[999] bg-white  rounded-[12px]">
                <span className=" text-base xl:text-xl text-black ">
                  Are you sure you want to proceed?
                </span>
                <div className="flex flex-row gap-x-4">
                  <button
                    onClick={() => {
                      handleRedirect(Stripeurl);
                    }}
                    className=" py-4 px-8 bg-primaryColor text-black rounded-[20px] "
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="bg-red-500  py-4 px-8 text-black rounded-[20px] "
                  >
                    No
                  </button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Payouts;
