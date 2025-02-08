import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape";
import Top from "@/components/dashboard/Top";
import ProfilePhoto from "../../../assets/images/profile-photo.png";
import DeleteAccount from "@/components/dashboard/MyAccount/DeleteAccount";
import ChangesPasswordForm from "@/components/dashboard/MyAccount/ChangesPasswordForm";
import InforForm from "@/components/dashboard/MyAccount/InforForm";
import { useSelector } from "react-redux";

function MyAccount() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;

  return (
    <div>
      <div>
        <Top title="My Account" />
      </div>
      <div className="lg:w-[1016px] mx-auto">
        <CommonBoxhShape>
          <div>
            <h3 className="text-center text-[18px] font-semibold mb-4 text-headingColor">
              Personal Info
            </h3>
            {/* profile img  */}
            <div>
              <img
                className="w-[120px] h-[120px] rounded-full object-cover mx-auto"
                src={`${imgBaseUrl}/${loggedInUser.avatar}`}
                alt="not found"
              />
            </div>

            <InforForm />
            <ChangesPasswordForm />
            <div className="mt-[30px]">
              <DeleteAccount />
            </div>
          </div>
        </CommonBoxhShape>
      </div>
    </div>
  );
}

export default MyAccount;
