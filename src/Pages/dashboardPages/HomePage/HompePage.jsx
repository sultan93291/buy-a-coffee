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

function HompePage() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  console.log(loggedInUser, "User logged in");
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;

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
                <Select className="rounded-full">
                  <SelectTrigger className="lg:w-[180px] w-[100px] px-4 lg:py-6 py-3 rounded-full text-textDark font-semibold ">
                    <SelectValue className="text-sm" placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Weekly</SelectItem>
                    <SelectItem value="dark">Monthly</SelectItem>
                    <SelectItem value="system">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <h3 className="lg:text-4xl text-2xl font-bold text-textDark">£0</h3>
          </div>
          <div className="border flex-1 w-full p-6 flex flex-col gap-1 lg:gap-2 rounded-xl ">
            <div className="flex justify-between lg:gap-6 gap-6">
              <h3 className="lg:text-2xl text-base  text-textColor font-semibold">
                Other supporters
              </h3>
              <div>
                <Select className="rounded-full">
                  <SelectTrigger className="lg:w-[180px] w-[100px] px-4 lg:py-6 py-3 rounded-full text-textDark font-semibold  ">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Weekly</SelectItem>
                    <SelectItem value="dark">Monthly</SelectItem>
                    <SelectItem value="system">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <h3 className="lg:text-4xl text-2xl  font-bold text-textDark">
              £0
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HompePage;
