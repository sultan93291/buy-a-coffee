import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "../../assets/images/logo.svg";
import { useContext, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import CommonLink from "./CommonLink";
import { MainContext } from "@/context";
import { RiHome4Line } from "react-icons/ri";
import { PiLayoutThin } from "react-icons/pi";
import { GoHeart, GoPeople } from "react-icons/go";
import { IoDiamondOutline, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";

function Top({ title }) {

  const [toggleMenu, setToggleMenu] = useState(false)
  const {role} = useContext(MainContext)

  if(toggleMenu) {
    document.body.classList.add('overflow-hidden')
  }else{
    document.body.classList.remove('overflow-hidden')
  }



  return (
    <div className="flex justify-between z-50 relative items-center pb-4 lg:pb-6 border-b">
      <h3 className="text-textColor font-semibold lg:flex hidden text-3xl">
        {title}
      </h3>
      <Link to={'/dashboard/home'} className="lg:hidden flex">
        <img className="w-16 h-16" src={Logo} alt="" />
      </Link>
      <div onClick={() => setToggleMenu(true)} className={`flex lg:hidden ${toggleMenu ? "opacity-0 invisible hidden" : 'opacity-100 visible'}  items-center border rounded-full gap-1 w-fit p-1`}>
        <div className="w-10 h-10 rounded-full overflow-hidden ">
          <img
            className="w-full h-full object-cover"
            src="https://i.ibb.co.com/sq2jwtC/ae4134169130626f5a6ff03cd06719fb.png"
            alt=""
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M3.5 8.16663H24.5"
            stroke="#1F2022"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3.5 14H24.5"
            stroke="#1F2022"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3.5 19.8334H24.5"
            stroke="#1F2022"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div onClick={() => setToggleMenu(false)} className={`${toggleMenu ? "opacity-100 visible rotate-45": 'opacity-0 invisible hidden'}`}>
      <HiOutlinePlus size={30} />
      </div>
      <div className={`w-full ${toggleMenu ? '' : '-translate-x-[150%] transition-all duration-300 -z-10 opacity-0'} absolute transition-all duration-300 px-8 py-4 -z-10 top-[78px] left-0 bg-white rounded-lg`}>
      <div className="w-full h-[86vh] md:w-[500px] p-6">
      <div className="pt-0">
        {/* home */}
        <div className="flex items-center flex-col gap-2 w-full ">
          <CommonLink path={'/dashboard/home'} navName={'Home'} Icon={RiHome4Line}></CommonLink>
          <CommonLink path={'/dashboard/my-page'} navName={'View my page'} Icon={PiLayoutThin}></CommonLink>
        </div>
        {/* community */}
        <div>
          <h4 className="text-xs pl-6 text-textColor py-4 uppercase font-medium">
            Community
          </h4>
          <div className="space-y-3">
         {
          role === 'creator' &&  <CommonLink path={'/dashboard/donations'} navName={'Donations'} Icon={GoHeart}></CommonLink>
         }
          <CommonLink path={'/dashboard/explore'} navName={'Explore'} Icon={IoSearchOutline}></CommonLink>
          <CommonLink path={'/dashboard/following'} navName={'Following'} Icon={IoNotificationsOutline}></CommonLink>
          {
           role === 'creator'  && <CommonLink path={'/dashboard/followers'} navName={'Followers'} Icon={GoPeople}></CommonLink>
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
            role === 'creator' && <CommonLink path={'/dashboard/membership'} navName={'Membership'} Icon={IoDiamondOutline}></CommonLink>
           
          }
          {
            role === 'creator' &&  <CommonLink path={'/dashboard/payouts'} navName={'Payouts'} Icon={AiOutlineThunderbolt}></CommonLink>
          }
          <CommonLink path={'/dashboard/my-account'} navName={'My Account'} Icon={IoNotificationsOutline}></CommonLink>
          <CommonLink path={'/dashboard/support'} navName={'Support'} Icon={MdOutlineContactSupport}></CommonLink>
          </div>
        </div>
      </div>
    </div>

      </div>
      <DropdownMenu className="hidden lg:block">
        <DropdownMenuTrigger className="border-none hidden lg:block outline-none">
          <div className="flex items-center border rounded-full gap-1 w-fit p-1">
            <div className="w-10 h-10 rounded-full overflow-hidden ">
              <img
                className="w-full h-full object-cover"
                src="https://i.ibb.co.com/sq2jwtC/ae4134169130626f5a6ff03cd06719fb.png"
                alt=""
              />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M3.5 8.16663H24.5"
                stroke="#1F2022"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M3.5 14H24.5"
                stroke="#1F2022"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M3.5 19.8334H24.5"
                stroke="#1F2022"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="px-4 py-4 mr-6 lg:mr-10">
          <DropdownMenuItem className="px-4 py-2 font-medium text-textDark text-base">View my page</DropdownMenuItem>
          <DropdownMenuItem className="px-4 py-2 font-medium text-textDark text-base">Dashboard</DropdownMenuItem>
          <DropdownMenuItem className="px-4 py-2 font-medium text-textDark text-base">Creators I follow</DropdownMenuItem>
          <DropdownMenuItem className="px-4 py-2 font-medium text-textDark text-base">My account</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="px-4 py-2 font-medium text-textDark text-base">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Top;
