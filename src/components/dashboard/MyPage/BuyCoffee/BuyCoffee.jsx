import { useEffect, useState } from "react";
import Title from "../Title";
import { useSelector } from "react-redux";
import { BuyaCofeeLogo } from "@/components/SvgContianer/SvgContainer";
import { useParams } from "react-router-dom";
import { useGetMemberShipListQuery } from "@/redux/features/api/apiSlice";
import { PuffLoader } from "react-spinners";

function BuyCoffee({ isFullwidth, data }) {
  const [hovered, setHovered] = useState(false);
  const BtnColor = useSelector(state => state.btnReducer.btnColor);
  const { creatorId } = useParams();
  console.log(creatorId);
  const [memberListsData, setmemberListsData] = useState();
  const {
    data: MemberShipData,
    isLoading,
    error,
  } = useGetMemberShipListQuery(creatorId);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor;

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor,
    border: `2px solid ${hovered ? buttonColor : "transparent"}`,
    color: hovered ? buttonColor : "#000",
  };

  const [activeIndex, setActiveIndex] = useState(1);
  const [buyType, setBuyType] = useState("membership");
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

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <PuffLoader size={100} color="#99FF6D" />
      </div>
    );
  
  console.log(MemberShipData?.data[0]?.price);
  
  
  return (
    <div
      className={`lg:p-6 ${
        isFullwidth && "lg:w-[496px]"
      }  p-4 rounded-xl flex h-full flex-col justify-between bg-white border space-y-4`}
    >
      <Title title={`Gift a Coffee for : ${data?.data?.name}`}></Title>
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
          <span> Monthly Membership Plan Price</span>
          <span>£{MemberShipData?.data[0]?.price}</span>
        </div>
      )}
      <div>
        <textarea
          className="text-textColor focus:outline-none bg-gray-50 px-4 py-3 h-[220px] resize-none border rounded-xl w-full"
          name=""
          placeholder="Your work is amazing!!"
          id=""
        ></textarea>
      </div>
      <div className="">
        <button
          style={buttonStyles}
          className="w-full text-sm md:text-base  rounded-full  font-bold py-3 md:py-4"
        >
          Support Now
        </button>
      </div>
    </div>
  );
}

export default BuyCoffee;
