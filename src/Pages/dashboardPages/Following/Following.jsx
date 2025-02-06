import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape";
import Top from "@/components/dashboard/Top";
import { IoHeart } from "react-icons/io5";

function Following() {
  return (
    <div>
      <div>
        <Top title="Following" />
      </div>
      <div>
        <CommonBoxhShape>
          <p className="h-12 w-12 rounded-full bg-[#f4f4f4] flex items-center justify-center mx-auto text-2xl mb-6 text-center">
            <IoHeart />
          </p>
          <p className="text-center text-headingColor font-semibold">You don't have any followers yet</p>
        </CommonBoxhShape>
      </div>
    </div>
  );
}

export default Following;
