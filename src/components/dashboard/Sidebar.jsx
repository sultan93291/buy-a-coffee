import { PiLayoutThin } from "react-icons/pi";
import { RiHome4Line } from "react-icons/ri";
import { IoDiamondOutline, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { GoHeart, GoPeople } from "react-icons/go";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import CommonLink from "./CommonLink";
import { useContext } from "react";
import { MainContext } from "@/context";
import Logo from '../../assets/images/logo.svg'
import { Link } from "react-router-dom";

function Sidebar() {


const {role} = useContext(MainContext)

  return (
    <div className="w-full  p-6 overflow-y-scroll h-[100vh] ">
      {/* logoss */}
      
      <Link to={'/home'} >
       <img src={Logo} alt="" />
       </Link>
      <div className="pt-6">
        {/* home */}
        <div className="flex items-center flex-col gap-2 w-full ">
          <CommonLink path={'/home'} navName={'Home'} Icon={RiHome4Line}></CommonLink>
          <CommonLink path={'/my-page'} navName={'View my page'} Icon={PiLayoutThin}></CommonLink>
        </div>
        {/* community */}
        <div>
          <h4 className="text-xs pl-6 text-textColor py-4 uppercase font-medium">
            Community
          </h4>
          <div className="space-y-3">
         {
          role === 'creator' &&  <CommonLink path={'/donations'} navName={'Donations'} Icon={GoHeart}></CommonLink>
         }
          <CommonLink path={'/explore'} navName={'Explore'} Icon={IoSearchOutline}></CommonLink>
          <CommonLink path={'/following'} navName={'Following'} Icon={IoNotificationsOutline}></CommonLink>
          {
           role === 'creator'  && <CommonLink path={'/followers'} navName={'Followers'} Icon={GoPeople}></CommonLink>
          }
          </div>
        </div>
       {/* settings */}
        <div>
          <h4 className="text-xs pl-6 text-textColor py-4 uppercase font-medium">
            Settings{" "}
          </h4>
          <div className="space-y-3">
          {
            role === 'creator' && <CommonLink path={'/membership'} navName={'Membership'} Icon={IoDiamondOutline}></CommonLink>
           
          }
          {
            role === 'creator' &&  <CommonLink path={'/payouts'} navName={'Payouts'} Icon={AiOutlineThunderbolt}></CommonLink>
          }
          <CommonLink path={'/my-account'} navName={'My Account'} Icon={IoNotificationsOutline}></CommonLink>
          </div>
        </div>
        
       
      </div>
    </div>
  );
}

export default Sidebar;
