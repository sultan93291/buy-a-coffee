import Top from "@/components/dashboard/Top";
import warningBlackImg from "../../../assets/images/warning-black.png";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import MembershipBox from "@/components/dashboard/Membership/MembershipBox";
import BuyCoffee from "@/components/dashboard/MyPage/BuyCoffee/BuyCoffee";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Membership() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Top title="Membership" />
      </div>
      <div>
        <div className="lg:flex items-start gap-6">
          {/* membership box  */}
          <div className="w-full lg:w-[70%]">
            {/* stripe setup warning  */}
            {loggedInUser?.onboard_complete === 0 ? (
              <div className="flex flex-col md:flex-row justify-center items-center md:justify-between bg-[#EFFFE5] p-3 md:p-6 rounded-[12px] border border-primaryColor mt-8">
                <p className="flex items-center text-sm mb:text-base gap-2">
                  <img src={warningBlackImg} alt="warningBlackImg" />
                  Your memberships are currently unpublished. Connect your
                  payout method now.
                </p>
                <div
                  onClick={() => {
                    navigate("/payouts");
                  }}
                  className="mt-6 md:mt-0"
                >
                  <ButtonPrimary type="small" text="Set Up" />
                </div>
              </div>
            ) : null}
            <MembershipBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
