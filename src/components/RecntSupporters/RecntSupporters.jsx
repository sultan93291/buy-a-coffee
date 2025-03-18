import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import women from "../../assets/images/women.png";
import logo from "../../assets/images/logo.svg";
import {
  useGetyourMessageQuery,
  useGetSupporterMessageQuery,
  useSendMsgToFollowersMutation,
  useGetCreatorsMessageQuery,
} from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const RecntSupporters = ({ isMe }) => {
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const [msgArr1, setMsgArr1] = useState([]);
  const [msgArr2, setMsgArr2] = useState([]);
  const [creatorsMsg, setcreatorsMsg] = useState([]);
  const [myMsg, setmyMsg] = useState();
  const { creatorId } = useParams();

  const { data, isLoading, error } = useGetSupporterMessageQuery();
  const {
    data: CreatorsData,
    isLoading: isCreatordataLoading,
    error: creatorError,
  } = useGetCreatorsMessageQuery(creatorId);
  const {
    data: yourData,
    isLoading: isYourDataLoading,
    error: yourDataError,
    refetch,
  } = useGetyourMessageQuery();

  const [
    createMsg,
    { data: msgData, error: msgError, isLoading: isMsgLoading },
  ] = useSendMsgToFollowersMutation();

  useEffect(() => {
    if (yourData) {
      const sanitizedData = yourData?.data?.map(item => ({
        id: item.id, // Ensure uniqueness
        msg: item.message,
        avatar: `${imgBaseUrl}/${loggedInUser?.avatar}`,
      }));

      setMsgArr1(prevMsgs => {
        // Remove duplicates based on ID
        const existingIds = new Set(prevMsgs.map(msg => msg.id));
        const uniqueMsgs = sanitizedData.filter(
          msg => !existingIds.has(msg.id)
        );
        return [...prevMsgs, ...uniqueMsgs];
      });
    }
  }, [yourData]);

  useEffect(() => {
    if (data) {
      const sanitizedData = data?.data?.map(item => ({
        id: item.id, // Ensure uniqueness
        msg: item.message,
        avatar: `${imgBaseUrl}/${item?.user?.avatar}`,
      }));

      setMsgArr2(prevMsgs => {
        // Remove duplicates based on ID
        const existingIds = new Set(prevMsgs.map(msg => msg.id));
        const uniqueMsgs = sanitizedData.filter(
          msg => !existingIds.has(msg.id)
        );
        return [...prevMsgs, ...uniqueMsgs];
      });
    }
  }, [data]);

  const handleFollowerReply = async () => {
    if (!myMsg || myMsg.length < 1) {
      toast.error(`Please leave a message for your supporter`);
      return;
    }
    try {
      const response = await createMsg({ message: myMsg }).unwrap();
      if (response?.code === 200) {
        toast.success(response?.message);
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error?.data?.message);
    } finally {
      setmyMsg("");
    }
  };

  const combinedArr = [...msgArr2, ...msgArr1];

  useEffect(() => {
    if (CreatorsData) {
      console.log(CreatorsData.data);

      setcreatorsMsg(CreatorsData?.data);
    }
  }, [CreatorsData]);

  console.log(creatorsMsg, " this th");

  return (
    <div
      className={`bg-white p-6 rounded-[12px]  flex flex-col gap-y-6 ${
        !isMe && "max-h-[397px]"
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
          <div className="flex flex-col max-h-[160px] overflow-y-auto  gap-y-4">
            {isMe ? (
              combinedArr.length > 0 ? (
                combinedArr?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex bg-yellow_green items-center py-[14px] px-4 border-[1px] border-solid rounded-[8px] border-[#D0FF71CC]  flex-row gap-x-2"
                    >
                      <div
                        className=" w-[44px]  h-[40px]  rounded-full "
                        style={{
                          backgroundImage: `url(${item?.avatar})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <h3 className="text-[#222222CC] font-medium leading-[164%] opacity-80 text-[13px] ">
                        {item?.msg}
                      </h3>
                    </div>
                  );
                })
              ) : (
                <span className="text-[#222222CC] opacity-[0.8] text-base leading-[160%] font-normal">
                  No message yet
                </span>
              )
            ) : creatorsMsg.length > 0 ? (
              <div  className="max-h-[250px] flex flex-col gap-y-3" >
                {creatorsMsg?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex bg-yellow_green items-center py-[14px] px-4 border-[1px] border-solid rounded-[8px] border-[#D0FF71CC]  flex-row gap-x-2"
                    >
                      <div
                        className=" w-[44px]  h-[40px]  rounded-full "
                        style={{
                          backgroundImage: `url(${imgBaseUrl}/${item?.user?.avatar})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <h3 className="text-[#222222CC] font-medium leading-[164%] opacity-80 text-[13px] ">
                        {item?.message}
                      </h3>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="text-[#222222CC] opacity-[0.8] text-base leading-[160%] font-normal">
                No message yet
              </span>
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
              name="msg"
              id=""
              onChange={e => {
                setmyMsg(e.target.value);
              }}
              value={myMsg}
              placeholder="Write your message"
            ></textarea>
          </div>
        )}
      </div>
      {isMe && (
        <div className="flex items-end justify-end  w-full">
          <button
            disabled={isMsgLoading}
            onClick={() => {
              handleFollowerReply();
            }}
            className="w-auto max-w-[119px]  rounded-[32px] h-auto py-3 px-6 bg-primaryColor text-base font-semibold leading-[130%] "
          >
            {isMsgLoading ? (
              <BeatLoader size={10} color={"#000"} speedMultiplier={0.5} />
            ) : (
              "Message"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecntSupporters;
