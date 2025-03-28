import { useContext, useEffect, useState } from "react";
import Title from "../Title";
import { useSelector } from "react-redux";
import { BuyaCofeeLogo } from "@/components/SvgContianer/SvgContainer";
import { useParams } from "react-router-dom";
import {
  useAddPaymentMutation,
  useGetCreatorsFollowerListQuery,
  useGetMemberShipListQuery,
} from "@/redux/features/api/apiSlice";
import { BeatLoader, PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { AuthContext } from "@/provider/AuthContextProvider";

function BuyCoffee({ isFullwidth, data }) {
  const [hovered, setHovered] = useState(false);
  const [followerDataArr, setfollowerDataArr] = useState([]);
  const BtnColor = useSelector(state => state.btnReducer.btnColor);
  const { creatorId } = useParams();
  const loggedInUserData = useSelector(
    state => state.userDocReducer.loggedInuser
  );
  const { isAuthenticated } = useContext(AuthContext);

  const {
    data: followerData,
    isLoading: isfollowerDataLoading,
    error: followererror,
  } = useGetCreatorsFollowerListQuery(creatorId);
  const [open, setOpen] = useState(false);

  const [message, setmessage] = useState("");
  const [memberListsData, setmemberListsData] = useState();

  const {
    data: MemberShipData,
    isLoading,
    error,
  } = useGetMemberShipListQuery(creatorId);

  const isAuthorized =
    Array.isArray(followerDataArr) &&
    followerDataArr.some(follower => follower === loggedInUserData?.id);

  useEffect(() => {
    if (followerData) {
      setfollowerDataArr(followerData.data);
    }
  }, [followerData]);

  const [
    completePayment,
    { data: payMentData, isLoading: ispayMenLoading, error: PaymentError },
  ] = useAddPaymentMutation();

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor;

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor,
    border: `2px solid ${hovered ? buttonColor : "transparent"}`,
    color: hovered ? buttonColor : "#000",
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [buyType, setBuyType] = useState("one-off");
  const [count, setCount] = useState(1);

  const handleBuyCoffee = (index, value) => {
    setActiveIndex(index);
    setBuyType(value);
  };

  const buyCoffeOptions = ["one-off", "membership"];

  useEffect(() => {
    if (MemberShipData) {
      setmemberListsData(MemberShipData?.data.data);
    }
  }, [MemberShipData]);

  const handleaddPayment = async () => {
    if (buyType === "membership" && !isAuthenticated) {
      return toast.error(
        "To join membership you must create a Gift a coffee account and sign in"
      );
    } else {
      let payLoad = {};

      const baseUrl = window.location.origin;
      const creatorUrl = window.location.href;

      if (buyType === "membership") {
        payLoad.type = "monthly";
        payLoad.message = message;
        payLoad.success_url = `${baseUrl}/payment-success`;
        payLoad.cancel_url = `${baseUrl}/payment-error`;
        payLoad.subscription_success_url = creatorUrl;
      } else if (buyType === "one-off") {
        if (count <= 0) {
          toast.error("Quantity must be greater than 0");
          return;
        }
        payLoad.quantity = count;
        payLoad.unit_price = 3;
        payLoad.type = "buy_a_coffee";
        payLoad.success_url = `${baseUrl}/payment-success`;
        payLoad.cancel_url = `${baseUrl}/payment-error`;
        payLoad.message = message;
      }
      await completePayment({ userId: creatorId, Data: payLoad });
    }
  };

  useEffect(() => {
    setmessage("");
  }, [buyType]);

  useEffect(() => {
    if (payMentData) {
      console.log(payMentData);
      setmessage("");
      setCount(1);
      setOpen(true);
    }
  }, [payMentData]);

  useEffect(() => {
    if (PaymentError) {
      toast.error(PaymentError?.data?.message);
    }
  }, [PaymentError]);

  const handleRedirect = link => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <>
      <div
        className={`lg:p-6 ${
          isFullwidth && "lg:w-[496px]"
        }  p-4 rounded-xl flex h-full flex-col justify-between bg-white border space-y-4`}
      >
        <Title title={`Gift a Coffee for: ${data?.data?.name}`}></Title>

        <div className="flex flex-col gap-y-4 ">
          <div className="flex gap-4 pt-0 items-center">
            {buyCoffeOptions.map((option, index) => (
              <div key={option} className="flex-1">
                <button
                  onClick={() => handleBuyCoffee(index, option)}
                  className={` ${
                    activeIndex === index
                      ? "border-borderColor bg-primaryLight"
                      : ""
                  } capitalize w-full py-3 text-sm font-bold border rounded-full`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>

          {buyType === "one-off" && (
            <>
              <div className=" flex justify-between items-center ">
                <div className="flex  items-center gap-2">
                  <BuyaCofeeLogo />
                  <h4 className="text-textColor">£3 each</h4>
                </div>

                <div className="flex items-center gap-1">
                  {buyType === "one-off" && (
                    <div
                      onClick={() =>
                        setCount(prevState =>
                          count > 1 ? prevState - 1 : prevState
                        )
                      }
                      className={` border cursor-pointer p-2 rounded-full`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15.9199 12.75H7.91992C7.50992 12.75 7.16992 12.41 7.16992 12C7.16992 11.59 7.50992 11.25 7.91992 11.25H15.9199C16.3299 11.25 16.6699 11.59 16.6699 12C16.6699 12.41 16.3399 12.75 15.9199 12.75Z"
                          fill="#292D32"
                        />
                      </svg>
                    </div>
                  )}

                  <h4 className="w-10 h-10 flex justify-center font-medium text-textDark items-center rounded-full border">
                    {buyType === "one-off" && count}
                  </h4>
                  {buyType === "one-off" && (
                    <div
                      onClick={() => setCount(prevState => prevState + 1)}
                      className="border cursor-pointer p-2 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 12H18"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 18V6"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <input
                  type="text"
                  // defaultValue={count}
                  value={`£ ${count * 3}`}
                  readOnly
                  className=" px-4 text-sm focus:outline-none placeholder:text-textDark font-semibold text-textDark bg-gray-50 w-full py-3 rounded-full border "
                  name=""
                  id=""
                />
              </div>
            </>
          )}
          {buyType === "membership" && (
            <div className=" text-black text-sm lg:text-base focus:outline-none font-jakarta font-bold bg-gray-50  py-2 px-4 lg:py-3 flex flex-col gap-3 lg:flex-row justify-between   resize-none border rounded-[12px] lg:rounded-[99px] w-full">
              {MemberShipData?.data[0]?.price
                ? `Membership price  £${MemberShipData?.data[0]?.price}`
                : "Currently this user has no membership plan"}
            </div>
          )}
          <div>
            <textarea
              onChange={e => {
                setmessage(e.target.value);
              }}
              className="text-textColor focus:outline-none bg-gray-50 px-4 py-3 h-[220px] resize-none border rounded-xl w-full #000]  "
              name=""
              disabled={
                isAuthorized && buyType === "membership"
                  ? true
                  : false || (buyType !== "membership" && true)
              }
              placeholder={
                isAuthorized && buyType === "membership"
                  ? `Already a member`
                  : "Your work is amazing!!"
              }
              id=""
              value={message}
            ></textarea>
          </div>
          <div className="">
            <button
              disabled={
                ispayMenLoading || (buyType === "membership" && isAuthorized)
              }
              onClick={() => {
                handleaddPayment();
              }}
              style={buttonStyles}
              className="w-full text-sm md:text-base  rounded-full  font-bold py-3 md:py-4"
            >
              {ispayMenLoading ? (
                <BeatLoader size={10} color={"#000"} speedMultiplier={0.5} />
              ) : buyType === "membership" ? (
                isAuthorized ? (
                  "Already a member"
                ) : (
                  "Get Membership"
                )
              ) : (
                "Support now"
              )}
            </button>
          </div>
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
                      handleRedirect(payMentData?.data?.payment_link);
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

export default BuyCoffee;
