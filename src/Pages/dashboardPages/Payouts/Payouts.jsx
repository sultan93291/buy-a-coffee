import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape";
import Top from "@/components/dashboard/Top";
import thunderImg from "../../../assets/images/thunder.svg";
import cardIcon from "../../../assets/images/card.svg";
import { Link } from "react-router-dom";
import { useConnectStripeAccountMutation } from "@/redux/features/api/apiSlice";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthContextProvider";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


function Payouts() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const [hovered, setHovered] = useState(false);

  const BtnColor = useSelector(state => state.btnReducer.btnColor);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor; // If BtnColor is undefined, use the default color

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor, // Transparent on hover, btn color otherwise
    border: `2px solid ${hovered ? buttonColor : "transparent"}`, // Border is always there, but only shows color on hover
    color: hovered ? buttonColor : "#000", // Text color on hover and default text color (black)
  };

  const [connectStripe, { data, isLoading, error }] =
    useConnectStripeAccountMutation();
  const { fetchData } = useContext(AuthContext);

  const handleStripeConnect = async () => {
    console.log(loggedInUser?.email);

    if (!loggedInUser?.email) {
      toast.error("User email is missing!");
      return;
    }

    try {
      const response = await connectStripe({
        email: loggedInUser.email,
      }).unwrap();

      console.log(response);

      if (response?.status === "success") {
        console.log("Stripe Connection Response:", response);
        toast.success(
          response?.message || "Stripe account connected successfully!",
          "please checkout the page and fill up all information"
        );
        if (response?.connected_account_url) {
          window.open(response.connected_account_url);
        }
        fetchData();
      }
    } catch (error) {
      console.error("Stripe Connection Error:", error);
      toast.error(
        error?.data?.message || "Failed to connect to Stripe. Please try again."
      );
    }
  };

  return (
    <div>
      <div>
        <Top title="Payouts" />
      </div>
      <div>
        <CommonBoxhShape>
          <p className="text-headingColor font-semibold mb-6">Total payouts</p>
          <h3 className="text-[40px] font-bold text-[#3D464F]">£0</h3>
        </CommonBoxhShape>
      </div>
      <div>
        <CommonBoxhShape>
          <p className="h-14 w-14 mx-auto mb-9 rounded-full flex items-center justify-center bg-[rgba(113,113,113,0.10)]">
            <img src={thunderImg} alt="thunderImg" />
          </p>
          <div className="text-center">
            <p className="text-[20px] font-semibold text-headingColor mb-2">
              Get Paid with Stripe
            </p>
            <p className="text-base text-paraDark">Instant payout via stripe</p>
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
              <img src={cardIcon} alt="cardIcon" />
              <p>Connect Stripe</p>
            </Link>
          </div>
        </CommonBoxhShape>
      </div>
    </div>
  );
}

export default Payouts;
