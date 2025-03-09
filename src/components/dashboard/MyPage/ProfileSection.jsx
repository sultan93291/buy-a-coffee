import { useState } from "react";
import EditProfileForm from "./EditProfile/EditProfileForm";
import { useSelector } from "react-redux";
import SharePopup from "../HomePage/SharePopup";
import cover from "../../../assets/images/default.png";

function ProfileSection({ isCreator, isMe, data }) {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  console.log(loggedInUser, "User logged in");
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const [follow, setFollow] = useState(false);
  const [hovered, setHovered] = useState(false);

  const Searcheduser = data?.data;

  const BtnColor = useSelector(state => state.btnReducer.btnColor);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor; // If BtnColor is undefined, use the default color

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor, // Transparent on hover, btn color otherwise
    border: `2px solid ${hovered ? buttonColor : "transparent"}`, // Border is always there, but only shows color on hover
    color: hovered ? buttonColor : "#000", // Text color on hover and default text color (black)
  };

  const backgroundImage = `${
    !isMe
      ? `${imgBaseUrl}/${Searcheduser?.edit_profile?.cover_photo}`
      : `${imgBaseUrl}/${loggedInUser?.edit_profile?.cover_photo}`
  }`;

  return (
    <div className={`${isMe ? "mt-6 " : " mb-[30px] lg:mb-[130px]"}`}>
      {/* background Cover */}
      <div
        style={{
          backgroundImage: `${
            Searcheduser?.edit_profile?.cover_photo ||
            loggedInUser?.edit_profile?.cover_photo
              ? `url(${backgroundImage})`
              : `url(${cover})`
          }`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className={`relative  flex justify-center px-4 bg-cover bg-center w-full h-[250px] lg:h-[350px]`}
      >
        {/* profile section */}
        <div className="bg-white relative h-fit p-1.5 lg:p-3 w-[96%]  flex justify-center items-center rounded-2xl -bottom-40  lg:-bottom-60">
          <div className="bg-[#FAFAFA] w-full lg:pl-60 py-4 lg:py-12 rounded-2xl px-4  lg:px-7">
            <div className="lg:flex-row flex-col gap-12   lg:gap-0 flex justify-between ">
              <div className="lg:space-y-3 space-y-1 pl-[150px] md:pl-40 lg:pl-0">
                <h3 className="text-textDark font-semibold text-sm lg:text-lg">
                  {!isMe ? Searcheduser?.name : loggedInUser?.name}
                </h3>
                <h4 className="lg:text-base font-medium text-textColor text-xs">
                  {!isMe 
                    ? Searcheduser?.edit_profile?.category
                    :  loggedInUser?.edit_profile?.category}
                </h4>
                <div className="flex items-center gap-2">
                  <h4 className="text-textColor lg:text-sm sm:text-xs text-[10px]  font-medium">
                    {!isMe
                      ? Searcheduser?.followers_count
                      :  loggedInUser?.followers_count}{" "}
                    followers
                  </h4>
                  <li className="lg:text-sm sm:text-xs text-[10px] list-none lg:list-disc  text-textColor font-medium">
                    {!isMe
                      ? Searcheduser?.following_count
                      : loggedInUser?.following_count}{" "}
                    following
                  </li>
                </div>
              </div>
              {isMe && (
                <div className="flex justify-end lg:justify-center items-center gap-6">
                  <SharePopup isProfilePage={true} />
                  {/* dialog */}
                  <div>
                    <EditProfileForm></EditProfileForm>
                  </div>
                </div>
              )}
              {isCreator && (
                <div>
                  <button
                    className="px-6 py-3 rounded-full bg-primaryColor text-textDark font-semibold "
                    onClick={() => setFollow(!follow)}
                  >{`${follow ? "Following" : "Follow"}`}</button>
                </div>
              )}
            </div>
          </div>
          {/* profile image */}
          <div className="bg-white absolute -top-12 left-6 lg:left-8 w-[140px] md:w-[150px] lg:w-[200px] h-[150px] lg:h-[220px] p-1.5 lg:p-2 rounded-2xl ">
            <div className=" w-full h-full bg-[#FAFAFA] ">
              <img
                className="object-cover rounded-2xl w-full h-full "
                src={`${imgBaseUrl}/${
                  !isMe ? Searcheduser?.avatar : loggedInUser?.avatar
                }`}
                alt="not found"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
