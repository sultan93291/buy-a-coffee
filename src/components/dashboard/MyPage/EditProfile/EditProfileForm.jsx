import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";
import { useEditUserProfileInfoMutation } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { AuthContext } from "@/provider/AuthContextProvider";
import { BeatLoader } from "react-spinners";
import { SetThemeColor } from "@/redux/features/BtnColorSlice";

function EditProfileForm() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);

  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const [editProfileInfo, { data, isLoading, error }] =
    useEditUserProfileInfoMutation();

  const { fetchData } = useContext(AuthContext);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: loggedInUser?.name,
      creating: loggedInUser?.edit_profile?.what_are_you_creating,
    },
  });

  const [profileUrl, setProfileUrl] = useState(
    `${imgBaseUrl}/${loggedInUser?.avatar}`
  );
  const [coverUrl, setCoverUrl] = useState(
    `${imgBaseUrl}/${loggedInUser?.edit_profile?.cover_photo}`
  );
  const [permission, setPermission] = useState(false);
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("");
  const [profileFile, setprofileFile] = useState();
  const [CoverFile, setCoverFile] = useState();
  const selectedTheme = watch("themeColor");
  const [hovered, setHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(
    loggedInUser?.edit_profile?.supporter_visibility == 1 ? true : false
  );

  const categories = [
    "Artist",
    "Athlete",
    "Blogger",
    "Causes",
    "Charity",
    "Cosplayer",
    "Community",
    "Content creator",
    "Developer",
    "Influencer",
    "Musician",
    "Online personality",
    "Podcaster",
    "Streamer",
    "Writer",
    "None",
  ];

  const onSubmit = async data => {
    const allRequiredData = {
      ...data,
      profileFile,
      CoverFile,
      permission,
      category,
      currency,
    };
    const formData = new FormData();
    formData.append(
      "name",
      allRequiredData?.fullName ? allRequiredData.fullName : loggedInUser.name
    );
    formData.append(
      "category",
      allRequiredData?.category
        ? allRequiredData?.category
        : loggedInUser?.edit_profile?.category
    );
    formData.append(
      "what_are_you_creating",
      allRequiredData?.creating
        ? allRequiredData.creating
        : loggedInUser?.edit_profile?.what_are_you_creating == "null"
        ? "None"
        : loggedInUser?.edit_profile?.what_are_you_creating
    );
    formData.append(
      "currency",
      allRequiredData?.currency
        ? allRequiredData.currency
        : loggedInUser?.edit_profile?.currency === "null"
        ? "GBP"
        : loggedInUser?.edit_profile?.currency
    );
    formData.append(
      "supporter_visibility",
      allRequiredData.permission ? 1 : loggedInUser.supporter_visibility ?? 0
    );

    if (profileFile) formData.append("avatar", profileFile);
    if (CoverFile) formData.append("cover_photo", CoverFile);

    console.log(...formData, "this is the payload data");

    try {
      const response = await editProfileInfo(formData).unwrap(); // ✅ Call the mutation properly

      console.log("Profile Updated Successfully:", response);

      if (response?.code === 200) {
        toast.success(response?.message || "Profile updated successfully!");
        fetchData();
      } else {
        toast.error(response?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error(
        error?.data?.message || "Failed to update profile. Please try again."
      );
    }
  };

  //currency
  const handleCurrencyValue = value => {
    setCurrency(value);
  };

  //category
  const handleCategoryValue = value => {
    setCategory(value);
  };

  const handleCover = e => {
    if (!e.target.files.length) return;

    const selectedFile = e.target.files[0];

    // Reset the file input value to allow selecting the same file again
    e.target.value = "";

    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File must be less than 2MB.");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("File format type is not allowed.");
      return; // Do not reset the existing preview
    }

    // If all checks pass, update the preview
    const url = URL.createObjectURL(selectedFile);
    setCoverUrl(url);
    setCoverFile(selectedFile);
  };

  //profile
  const handleProfile = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File must be less than 2MB.");
      return; // Do not reset the existing preview
    }
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("File format type  is not allowed");
      return;
    }
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setProfileUrl(url);
      setprofileFile(selectedFile);
    }
  };

  //permission
  const handleCheckedChange = checked => {
    setIsChecked(checked);
    setPermission(checked);
  };

  const themeColors = {
    orange: "#FF813F",
    blue: "#5F7FFF",
    purple: "#BD5FFF",
    red: "#FF5F5F",
    teal: "#26B0A1",
    pink: "#F78EFF",
    yellow: "#FFDD00",
    green: "#99FF6D",
  };

  useEffect(() => {
    // Log the selected theme color
    console.log(themeColors[selectedTheme]);

    // Check if the selected theme color is not an empty string and is not undefined
    if (
      themeColors[selectedTheme] !== "" &&
      themeColors[selectedTheme] !== undefined
    ) {
      dispatch(SetThemeColor(themeColors[selectedTheme]));
    }
  }, [selectedTheme, dispatch]);

  useEffect(() => {
    if (loggedInUser) {
      reset({
        fullName: loggedInUser.name || "",
        creating: loggedInUser?.edit_profile?.what_are_you_creating,
      });

      setProfileUrl(`${imgBaseUrl}/${loggedInUser?.avatar}`);
      setIsChecked(
        loggedInUser?.edit_profile?.supporter_visibility == 1 ? true : false
      );
      setPermission(
        loggedInUser?.edit_profile?.supporter_visibility == 1
          ? handleCheckedChange(true)
          : handleCheckedChange(false)
      );
      const newCoverFile = `${imgBaseUrl}/${loggedInUser?.edit_profile?.cover_photo}`;
      setCoverUrl(newCoverFile);
    }
  }, [loggedInUser, reset, imgBaseUrl]);

  const BtnColor = useSelector(state => state.btnReducer.btnColor);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor; // If BtnColor is undefined, use the default color

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor, // Transparent on hover, btn color otherwise
    border: `2px solid ${hovered ? buttonColor : "transparent"}`, // Border is always there, but only shows color on hover
    color: hovered ? buttonColor : "#000", // Text color on hover and default text color (black)
  };

  return (
    <Dialog className="">
      <DialogTrigger asChild className="w-full">
        <button
          style={buttonStyles}
          className="lg:px-12 px-[30px] py-3 text-ellipsis rounded-full font-bold text-[12px] lg:text-sm"
        >
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-5xl max-w-lg h-full p-2 scrollbar-hide overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="p-0 ">
            <div className="relative pt-4">
              <h3 className="text-2xl  font-semibold text-textDark text-center ">
                Edit Profile
              </h3>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="py-4 ">
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className="relative">
              {/* cover photo */}
              <div>
                <input
                  className="hidden"
                  type="file"
                  name="coverPhoto"
                  id="coverPhoto"
                  onChange={handleCover}
                />
                <label className="w-full " htmlFor="coverPhoto">
                  <div className="w-full relative h-[200px] lg:h-[300px]">
                    <img
                      className="w-full  h-full object-cover"
                      src={coverUrl}
                      alt="not found"
                    />
                    <div className="absolute cursor-pointer px-3 py-1 rounded-full bg-white flex items-center gap-2 font-medium text-textDark bottom-5 right-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          opacity="0.8"
                          d="M13.5025 6.59524L13.5024 6.59709L13.1558 12.1036C13.1558 12.1037 13.1557 12.1037 13.1557 12.1038C13.1217 12.6436 12.967 13.0176 12.7511 13.2484C12.5544 13.4586 12.1987 13.6666 11.4938 13.6666H4.5071C3.80179 13.6666 3.44416 13.4583 3.24664 13.2476C3.03073 13.0173 2.87665 12.6448 2.84541 12.1084L2.84542 12.1084L2.84513 12.1038L2.49846 6.59709L2.49834 6.59524C2.44255 5.73443 3.12883 4.99992 4.00044 4.99992C4.79074 4.99992 5.501 4.54935 5.85486 3.8669L5.85888 3.85915L5.86276 3.85133L6.3407 2.88881C6.39379 2.78533 6.52362 2.63574 6.72793 2.50916C6.93369 2.38169 7.125 2.33325 7.24044 2.33325H8.7671C8.87761 2.33325 9.06685 2.38063 9.2728 2.50856C9.47691 2.63533 9.60699 2.78514 9.66016 2.88879L10.1381 3.85133L10.142 3.85915L10.146 3.8669C10.4999 4.54935 11.2101 4.99992 12.0004 4.99992C12.872 4.99992 13.5583 5.73443 13.5025 6.59524Z"
                          fill="#1F2022"
                          stroke="#1F2022"
                          strokeWidth="2"
                        />
                        <mask id="path-2-inside-1_9649_9881" fill="white">
                          <path d="M9 5.83325H7C6.72667 5.83325 6.5 5.60659 6.5 5.33325C6.5 5.05992 6.72667 4.83325 7 4.83325H9C9.27333 4.83325 9.5 5.05992 9.5 5.33325C9.5 5.60659 9.27333 5.83325 9 5.83325Z" />
                        </mask>
                        <path
                          d="M9 5.83325H7C6.72667 5.83325 6.5 5.60659 6.5 5.33325C6.5 5.05992 6.72667 4.83325 7 4.83325H9C9.27333 4.83325 9.5 5.05992 9.5 5.33325C9.5 5.60659 9.27333 5.83325 9 5.83325Z"
                          fill="white"
                        />
                        <path
                          d="M9 3.83325H7V7.83325H9V3.83325ZM7 3.83325C7.83124 3.83325 8.5 4.50202 8.5 5.33325H4.5C4.5 6.71115 5.6221 7.83325 7 7.83325V3.83325ZM8.5 5.33325C8.5 6.16449 7.83124 6.83325 7 6.83325V2.83325C5.6221 2.83325 4.5 3.95535 4.5 5.33325H8.5ZM7 6.83325H9V2.83325H7V6.83325ZM9 6.83325C8.16876 6.83325 7.5 6.16449 7.5 5.33325H11.5C11.5 3.95535 10.3779 2.83325 9 2.83325V6.83325ZM7.5 5.33325C7.5 4.50202 8.16876 3.83325 9 3.83325V7.83325C10.3779 7.83325 11.5 6.71115 11.5 5.33325H7.5Z"
                          fill="white"
                          mask="url(#path-2-inside-1_9649_9881)"
                        />
                        <path
                          d="M8.0004 12.0867C9.24489 12.0867 10.2537 11.0779 10.2537 9.83341C10.2537 8.58893 9.24489 7.58008 8.0004 7.58008C6.75592 7.58008 5.74707 8.58893 5.74707 9.83341C5.74707 11.0779 6.75592 12.0867 8.0004 12.0867Z"
                          fill="white"
                        />
                      </svg>
                      <h4 className="lg:text-sm text-xs font-medium ">
                        Edit Cover Photo
                      </h4>
                    </div>
                  </div>
                </label>
              </div>
              {/* profile photo */}
              <div className="absolute -bottom-8 left-1/2  -translate-x-1/2">
                <input
                  className="hidden"
                  type="file"
                  name="profilePhoto"
                  id="profilePhoto"
                  onChange={handleProfile}
                />
                <label htmlFor="profilePhoto">
                  <div className=" rounded-full cursor-pointer group relative overflow-hidden size-20 lg:size-28">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={profileUrl}
                      alt="not found"
                    />
                    <div className="absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          opacity="0.8"
                          d="M28.002 13.2554L28.0019 13.2573L27.3085 24.2704C27.3085 24.2705 27.3085 24.2705 27.3085 24.2706C27.2311 25.4971 26.8714 26.4961 26.2314 27.1802C25.6105 27.8438 24.6115 28.3334 22.9866 28.3334H9.01323C7.38791 28.3334 6.38528 27.8435 5.76277 27.1795C5.12185 26.4958 4.76278 25.4982 4.69155 24.2753L4.69126 24.2706L3.99792 13.2573L3.9978 13.2554C3.84868 10.9546 5.68162 9.00008 7.9999 9.00008C9.19687 9.00008 10.2805 8.31618 10.821 7.27373L10.825 7.26598L10.8289 7.25816L11.7872 5.32832C11.9933 4.9223 12.3995 4.49604 12.9282 4.16849C13.4581 3.84018 14.0211 3.66675 14.4799 3.66675H17.5332C17.9837 3.66675 18.543 3.83913 19.0723 4.16789C19.6 4.4957 20.0065 4.92227 20.2127 5.32852C20.2132 5.32941 20.2137 5.33031 20.2141 5.33121L21.1709 7.25816L21.1748 7.26598L21.1788 7.27373C21.7193 8.31618 22.8029 9.00008 23.9999 9.00008C26.3182 9.00008 28.1511 10.9546 28.002 13.2554Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <mask id="path-2-inside-1_9649_9847" fill="white">
                          <path d="M18 11.6667H14C13.4533 11.6667 13 11.2134 13 10.6667C13 10.1201 13.4533 9.66675 14 9.66675H18C18.5467 9.66675 19 10.1201 19 10.6667C19 11.2134 18.5467 11.6667 18 11.6667Z" />
                        </mask>
                        <path
                          d="M18 11.6667H14C13.4533 11.6667 13 11.2134 13 10.6667C13 10.1201 13.4533 9.66675 14 9.66675H18C18.5467 9.66675 19 10.1201 19 10.6667C19 11.2134 18.5467 11.6667 18 11.6667Z"
                          fill="white"
                        />
                        <path
                          d="M18 9.66675H14V13.6667H18V9.66675ZM14 9.66675C14.5579 9.66675 15 10.1088 15 10.6667H11C11 12.318 12.3488 13.6667 14 13.6667V9.66675ZM15 10.6667C15 11.2247 14.5579 11.6667 14 11.6667V7.66675C12.3488 7.66675 11 9.01551 11 10.6667H15ZM14 11.6667H18V7.66675H14V11.6667ZM18 11.6667C17.4421 11.6667 17 11.2247 17 10.6667H21C21 9.01551 19.6512 7.66675 18 7.66675V11.6667ZM17 10.6667C17 10.1088 17.4421 9.66675 18 9.66675V13.6667C19.6512 13.6667 21 12.318 21 10.6667H17Z"
                          fill="white"
                          mask="url(#path-2-inside-1_9649_9847)"
                        />
                        <path
                          d="M15.9998 24.1732C18.4888 24.1732 20.5065 22.1555 20.5065 19.6666C20.5065 17.1776 18.4888 15.1599 15.9998 15.1599C13.5109 15.1599 11.4932 17.1776 11.4932 19.6666C11.4932 22.1555 13.5109 24.1732 15.9998 24.1732Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="space-y-3 px-8 lg:px-60 pt-8">
              {/* full name */}
              <div className="flex flex-col gap-2.5">
                <label
                  className="text-textColor font-semibold "
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="px-5 py-3.5 w-full focus:outline-none rounded-lg text-textColor text-sm border bg-gray-50"
                  type="text"
                  name="fullName"
                  id="fullName"
                  {...register("fullName", { required: true })}
                />
              </div>
              {/* category */}
              <div className="flex flex-col gap-2.5">
                <label
                  className="text-textColor font-semibold "
                  htmlFor="creating"
                >
                  Category
                </label>
                <Select
                  defaultValue={
                    loggedInUser?.edit_profile?.category
                      ? loggedInUser?.edit_profile?.category
                      : "None"
                  }
                  onValueChange={handleCategoryValue}
                >
                  <SelectTrigger className="w-full py-6 bg-gray-50 px-5">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent >
                    {categories.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-2.5">
                <label
                  className="text-textColor font-semibold "
                  htmlFor="creating"
                >
                  Currency
                </label>
                <Select
                  defaultValue={
                    loggedInUser?.edit_profile?.currency
                      ? loggedInUser?.edit_profile?.currency
                      : "GBP"
                  } // Set a default value
                  onValueChange={handleCurrencyValue}
                >
                  <SelectTrigger className="w-full py-6 bg-gray-50 px-5">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="EURO">Euro</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* toggle */}
              <div className="flex flex-col items-start md:items-center md:flex-row  pt-2 gap-3">
                <Switch
                  checked={isChecked}
                  onCheckedChange={handleCheckedChange}
                />
                <label className="flex flex-col gap-2" htmlFor="">
                  <h4 className="text-textDark font-medium">
                    Display supporter count
                  </h4>
                  <p className="text-xs  text-textColor">
                    Publicizing supporter count shows credibility and inspires
                    more support from your audience.
                  </p>
                </label>
              </div>
            </div>
            <div className="flex justify-end pt-4 px-8">
              <DialogClose>
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`text-sm px-6 py-3 rounded-full duration-300  ease-in-out  font-semibold `}
                  style={buttonStyles}
                >
                  {isLoading ? (
                    <BeatLoader
                      size={10}
                      color={"#000"}
                      speedMultiplier={0.5}
                    />
                  ) : (
                    "Save changes"
                  )}
                </button>
              </DialogClose>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileForm;
