
import { useState } from "react";
import EditProfileForm from "./EditProfile/EditProfileForm";


function ProfileSection({isCreator, isMe}) {


  const [follow, setFollow] = useState(false)


  return (
    <div className=" mt-6 ">
      {/* background Cover */}
      <div className="relative  flex justify-center px-4 bg-cover bg-[url('https://i.ibb.co.com/16YfRQv/img.jpg')] bg-center w-full h-[250px] lg:h-[350px]">

        {/* profile section */}
        <div className="bg-white relative h-fit p-1.5 lg:p-3 w-[96%]  flex justify-center items-center rounded-2xl -bottom-40  lg:-bottom-60">
          <div className="bg-[#FAFAFA] w-full lg:pl-60 py-4 lg:py-12 rounded-2xl px-4  lg:px-7">
            <div className="lg:flex-row flex-col gap-8 lg:gap-0 flex justify-between ">
              <div className="lg:space-y-3 space-y-1 pl-40 lg:pl-0">
                <h3 className="text-textDark font-semibold text-sm lg:text-lg">
                  Lee guitarist
                </h3>
                <h4 className="lg:text-base font-medium text-textColor text-xs">Artist</h4>
                <div className="flex items-center gap-2">
                  <h4 className="text-textColor lg:text-sm text-xs  font-medium">
                    29.6K Followers
                  </h4>
                  <li className="lg:text-sm list-none lg:list-disc text-xs text-textColor font-medium">
                    0 following
                  </li>
                </div>
              </div>
             {
              isMe && <div className="flex justify-center items-center gap-6">
              <div className="bg-white border rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M2 21.75C1.94281 21.75 1.88506 21.7435 1.82787 21.7303C1.66346 21.6913 1.51699 21.598 1.41214 21.4655C1.30728 21.333 1.25016 21.169 1.25 21C1.25 14.1848 2.11212 8.51666 12.5 8.25885V3.00003C12.5 2.85422 12.5425 2.71157 12.6224 2.58954C12.7022 2.46752 12.8159 2.37141 12.9495 2.31297C13.0831 2.25454 13.2308 2.23632 13.3746 2.26054C13.5184 2.28476 13.652 2.35037 13.7591 2.44935L23.5091 11.4493C23.6628 11.5905 23.75 11.7906 23.75 12C23.75 12.2095 23.6628 12.4095 23.5091 12.5509L13.7591 21.5509C13.6521 21.6503 13.5184 21.7161 13.3745 21.7404C13.2305 21.7646 13.0826 21.7461 12.9491 21.6872C12.8155 21.6287 12.702 21.5325 12.6222 21.4105C12.5425 21.2884 12.5 21.1458 12.5 21V15.7588C5.37425 15.9295 4.0595 18.5582 2.67088 21.3355C2.60861 21.4601 2.51286 21.5649 2.39436 21.6381C2.27586 21.7113 2.1393 21.7501 2 21.75ZM13.25 14.25C13.6646 14.25 14 14.5855 14 15V19.2868L21.8941 12L14 4.71322V9.00003C14 9.4146 13.6646 9.75003 13.25 9.75003C4.96475 9.75003 3.18069 12.9544 2.82987 18.0726C4.38331 15.9859 7.031 14.25 13.25 14.25Z"
                    fill="#1F2022"
                  />
                </svg>
              </div>
              {/* dialog */}
              <div>
                <EditProfileForm></EditProfileForm>
              </div>
            </div>
             }
             {
              isCreator && <div><button className="px-6 py-3 rounded-full bg-primaryColor text-textDark font-semibold " onClick={() => setFollow(!follow)}>{`${follow ? 'Following' : 'Follow'}`}</button></div>
             }
            </div>
          </div>
          {/* profile image */}
          <div className="bg-white absolute -top-12 left-6 lg:left-8 w-[150px] lg:w-[200px] h-[150px] lg:h-[220px] p-1.5 lg:p-2 rounded-2xl ">
            <div className=" w-full h-full bg-[#FAFAFA] ">
              <img
                className="object-cover rounded-2xl w-full h-full "
                src="https://i.ibb.co.com/QXzN6dz/e8c29aa38af9e2661ffb508d79f12a7d.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
