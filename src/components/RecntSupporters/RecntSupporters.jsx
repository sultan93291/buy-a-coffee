import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import women from "../../assets/images/women.png";
import logo from "../../assets/images/logo.svg";
import {
  useGetyourMessageQuery,
  useGetSupporterMessageQuery,
  useSendMsgToFollowersMutation,
} from "@/redux/features/api/apiSlice";

const RecntSupporters = ({ isMe }) => {
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const [msgArr, setmsgArr] = useState([]);

  const { data, isLoading, error } = useGetSupporterMessageQuery();
  const {
    data: yourData,
    isLoading: isYourDataLoading,
    error: yourDataError,
  } = useGetyourMessageQuery();

  const [
    createMsg,
    { data: msgData, error: msgError, isLoading: isMsgLoading },
  ] = useSendMsgToFollowersMutation();

  useEffect(() => {
    if (yourData) {
      const sanitizedData = yourData?.data?.map(item => ({
        msg: item.message,
        avatar: loggedInUser.avatar,
      }));

      setmsgArr(msg => [...msg, ...sanitizedData]); // ✅ Corrected
    }
  }, [yourData]);

  useEffect(() => {
    if (data) {
      const sanitizedData = data?.data?.map(item => ({
        msg: item.message,
        avatar: item?.user?.avatar,
      }));

      setmsgArr(msg => [...msg, ...sanitizedData]); // ✅ Corrected
    }
  }, [data]);

  
  console.log(msgArr, ' this is the all msg');
  


  return (
    <div
      className={`bg-white p-6 rounded-[12px]  flex flex-col gap-y-6 ${
        !isMe && "h-[397px]"
      } `}
    >
      <div className="flex flex-col gap-y-6 ">
        <div className="flex flex-col gap-y-6 ">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-[#222222] text-2xl font-bold leading-[132%] tracking-[-0.24px] ">
              Recent Supporters:
            </h2>
            <div className="flex flex-row items-center gap-x-1 ">
              <img
                src={logo}
                className="h-12 w-12 object-cover"
                alt="not found"
              />
              <span className="text-[#222222CC] opacity-[0.8] text-base leading-[160%] font-normal ">
                {" "}
                bought a coffee.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex bg-yellow_green items-center py-[14px] px-4 border-[1px] border-solid rounded-[8px] border-[#D0FF71CC]  flex-row gap-x-2">
              <div
                className=" w-[44px]  h-[40px]  rounded-full "
                style={{
                  backgroundImage: `url(${women})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
              <h3 className="text-[#222222CC] font-medium leading-[164%] opacity-80 text-[13px] ">
                Love your podcast! Keep up the good work.
              </h3>
            </div>
            {isMe && (
              <div className="flex bg-yellow_green items-center py-[14px] px-4 border-[1px] border-solid rounded-[8px] border-[#D0FF71CC]  flex-row gap-x-2">
                <div
                  className=" w-[44px]  h-[40px]  rounded-full "
                  style={{
                    backgroundImage: `url(${`${imgBaseUrl}/${loggedInUser.avatar}`})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
                <h3 className="text-[#222222CC] font-medium leading-[164%] opacity-80 text-[13px] ">
                  Thanks. Stay connected.
                </h3>
              </div>
            )}
          </div>
        </div>
        {isMe && (
          <div className="flex flex-row gap-x-3">
            <div
              className="w-[44px] h-[40px] rounded-full "
              style={{
                backgroundImage: `url(${`${imgBaseUrl}/${loggedInUser.avatar}`})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <textarea
              className=" h-[144px] px-4 text-sm focus:outline-none placeholder:text-textDark font-semibold text-textDark bg-[rgba(113, 113, 113, 0.24)] w-full py-3 rounded-[8px] border-[1px] border-solid border-[rgba(153, 154, 154, 0.05)]  "
              name=""
              id=""
              placeholder="Write your message"
            ></textarea>
          </div>
        )}
      </div>
      {isMe && (
        <div className="flex items-end justify-end  w-full">
          <button className="w-auto max-w-[119px]  rounded-[32px] h-auto py-3 px-6 bg-primaryColor text-base font-semibold leading-[130%] ">
            Message
          </button>
        </div>
      )}
    </div>
  );
};

export default RecntSupporters;
