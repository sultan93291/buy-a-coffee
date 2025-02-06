import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape";
import Top from "@/components/dashboard/Top";
import { IoHeart } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";

function Dontaions() {
  return (
    <div>
      <div>
        <Top title={"Donation"}></Top>
      </div>
      {/* donation boxs  */}
      <div className="flex flex-wrap mr-[-12px] ml-[-12px]">
        <div className="donation-box-wrap ">
          <CommonBoxhShape>
            <h3 className="text-[28px] lg:text-[40px] font-bold text-[#3D464F] mb-3 md:mb-6 text-left">
              0
            </h3>
            <div className="flex items-center gap-1 text-headingColor font-semibold">
              <p className="text-primaryColor">
                <IoHeart />
              </p>
              Supporter
            </div>
          </CommonBoxhShape>
        </div>
        <div className="donation-box-wrap">
          <CommonBoxhShape>
            <h3 className="text-[28px] lg:text-[40px] font-bold text-[#3D464F] mb-3 md:mb-6 text-left">
              $0
            </h3>
            <div className="flex items-center gap-1 text-headingColor font-semibold">
              <p className="">
                <SlCalender />
              </p>
              Last 30 days
            </div>
          </CommonBoxhShape>
        </div>
        <div className="donation-box-wrap">
          <CommonBoxhShape>
            <h3 className="text-[28px] lg:text-[40px] font-bold text-[#3D464F] mb-3 md:mb-6 text-left">
              $0
            </h3>
            <div className="flex items-center gap-1 text-headingColor font-semibold">
              <p className="">
                <RiMoneyDollarCircleLine />
              </p>
              All time
            </div>
          </CommonBoxhShape>
        </div>
        <div className="donation-box-wrap text-center">
          <CommonBoxhShape>
            <p className="h-12 w-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[rgba(113,113,113,0.10)] text-[30px] mx-auto">
              <IoHeartOutline />
            </p>
            <div className="mt-5 md:mt-[35px]">
              <p className="text-[18px] md:text-[20px] font-semibold mb-2">
                You don't have any supporters yet
              </p>
              <p className="text-paraDark text-sm md:text-base">
                Share your page with your audience to get started.
              </p>
            </div>
          </CommonBoxhShape>
        </div>
      </div>
    </div>
  );
}

export default Dontaions;
