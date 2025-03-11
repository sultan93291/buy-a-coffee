import SharePopup from "@/components/dashboard/HomePage/SharePopup";
import Top from "../../../components/dashboard/Top";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useGetTotalEarningFromMemberQuery,
  useGetTotalEarningFromSuporterQuery,
} from "@/redux/features/api/apiSlice";
import { PuffLoader } from "react-spinners";

function HompePage() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const [memberInocme, setmemberInocme] = useState();
  const [supporterIncome, setSupporterIncome] = useState();
  const [selectedRange, setSelectedRange] = useState();
  const [supporterValue, setsupporterValue] = useState();

  const { data, error, isLoading } =
    useGetTotalEarningFromMemberQuery(selectedRange);

  const {
    data: SuppporterData,
    isLoading: isSupporterLoading,
    error: isSupporterError,
  } = useGetTotalEarningFromSuporterQuery(supporterValue);

  const handleValueChange = value => {
    setSelectedRange(value);
  };

  const handleSupporterValueChange = value => {
    setsupporterValue(value);
  };


  useEffect(() => {
    if (SuppporterData) {
      setSupporterIncome(SuppporterData);
    }
  }, [SuppporterData]);

  useEffect(() => {
    if (data) {
      setmemberInocme(data?.data);
    }
  }, [data]);

  if (isLoading || isSupporterLoading)
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <PuffLoader size={100} color="#99FF6D" />
      </div>
    );
  

  

  return (
    <div className="">
      {/* Home Paget Top */}
      <div className="">
        <Top title={"Homepage"}></Top>
      </div>
      <div className="p-6 rounded-xl mt-6 border ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full ">
              <img
                className="w-full h-full rounded-full"
                src={`${imgBaseUrl}/${loggedInUser.avatar}`}
                alt="not found"
              />
            </div>
            <div className="flex flex-col ">
              <h4 className="md:text-lg text-sm   font-semibold text-textColor">
                Welcome back,{" "}
                <span className="text-textDark"> {loggedInUser?.name} </span>
              </h4>
              <p className="text-textColor md:text-base text-xs ">
                giftacoffee.com/{loggedInUser?.user_name}
              </p>
            </div>
          </div>
          {/* shared button */}
          <SharePopup></SharePopup>
        </div>
        <div className="lg:flex-row flex flex-col gap-3 lg:gap-6 pt-8">
          <div className="border flex-1 w-full p-6 flex flex-col gap-1 lg:gap-2 rounded-xl ">
            <div className="flex justify-between gap-6 lg:gap-6">
              <h3 className="lg:text-2xl text-base  text-textColor font-semibold">
                {" "}
                Registered supporters
              </h3>
              <div>
                <Select
                  onValueChange={value => {
                    handleValueChange(value);
                  }}
                  className="rounded-full"
                >
                  <SelectTrigger className="lg:w-[180px] w-[100px] px-4 lg:py-6 py-3 rounded-full text-textDark font-semibold ">
                    <SelectValue className="text-sm" placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <h3 className="lg:text-4xl text-2xl font-bold text-textDark">
              £{memberInocme?.total_earning}
            </h3>
          </div>
          <div className="border flex-1 w-full p-6 flex flex-col gap-1 lg:gap-2 rounded-xl ">
            <div className="flex justify-between lg:gap-6 gap-6">
              <h3 className="lg:text-2xl text-base  text-textColor font-semibold">
                Other supporters
              </h3>
              <div>
                <Select
                  onValueChange={value => {
                    handleSupporterValueChange(value);
                  }}
                  className="rounded-full"
                >
                  <SelectTrigger className="lg:w-[180px] w-[100px] px-4 lg:py-6 py-3 rounded-full text-textDark font-semibold  ">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <h3 className="lg:text-4xl text-2xl  font-bold text-textDark">
              £{supporterIncome?.data?.total_earning}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HompePage;
