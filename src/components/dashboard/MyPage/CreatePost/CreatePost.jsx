import { GoPlus } from "react-icons/go";
import Title from "../Title";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { MdOutlineCloudDownload } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreatePostMutation } from "@/redux/features/api/apiSlice";
import { BeatLoader } from "react-spinners";

function CreatePost() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const [tittle, settittle] = useState();
  const [file, setfile] = useState();
  const [createPost, { data, isLoading, error }] = useCreatePostMutation();

  const handleFileUpload = e => {
    console.log(e.target.files[0]);
    setfile(e.target.files[0]);
  };

  const handleCratePost = async () => {
    if (!tittle && !file) {
      toast.error("Upload any or post a status");
      settittle('')
      setfile(null)
      return;
    }

    if (!file) {
      toast.error("Please select a file");
      settittle('')
      setfile(null)
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", tittle);
      formData.append("file_url", file);

      const response = await createPost(formData).unwrap();
      if (response.code === 200) {
        toast.success(response.message);
        settittle("");
        setfile(null);
        // console.log(response);
      }

      console.log(data);
    } catch (err) {
      const errMessage =
        err?.message || err?.data?.message || "An unknown error occurred";

      toast.error(errMessage); // Display the error message in the toast
    } finally {
      settittle("");
      setfile(null)
    }
  };

  return (
    <div className=" rounded-xl lg:min-w-[496px] flex-col flex gap-4 space-y-3 h-full">
      <div className="bg-white lg:p-6 p-4 rounded-xl border space-y-3 h-full">
        <Title title={"Post an update:"}></Title>
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-[60px] h-[54.7px]  relative rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`${imgBaseUrl}/${loggedInUser.avatar}`}
              alt="not found"
            />
          </div>
          <Dialog className="rounded-lg">
            <DialogTrigger asChild className="w-full">
              <div className="w-full">
                <h4 className="text-[#717171] text-left  px-4 py-3 rounded-full bg-gray-50 w-full font-medium">
                  What’s in your mind?
                </h4>
              </div>
            </DialogTrigger>
            <DialogContent className=" rounded-xl ">
              <DialogHeader>
                <DialogTitle className="p-0 border-b pb-4">
                  <div className="relative">
                    <h3 className="text-2xl font-semibold text-textDark text-center ">
                      Create Post
                    </h3>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className="py-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={`${imgBaseUrl}/${loggedInUser?.avatar}`}
                          alt="not found"
                        />
                      </div>
                      <h3 className="text-sm font-medium text-textColor">
                        {loggedInUser?.name}
                      </h3>
                    </div>
                    <div className="pt-4">
                      <div>
                        <textarea
                          className="px-4 resize-none border focus:outline-none placeholder:text-textDark py-3 rounded-xl text-textColor w-full h-[200px]"
                          name=""
                          placeholder="Whats in you mind?"
                          id=""
                          value={tittle}
                          onChange={e => {
                            settittle(e.target.value);
                          }}
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-4 w-full">
                      <input
                        onChange={handleFileUpload}
                        className="hidden"
                        type="file"
                        accept="*/"
                        name="getFeatured"
                        id="getFeatured"
                      />
                      <label
                        className="border cursor-pointer p-4 flex  justify-center items-center rounded-md  bg-backgroundLight w-full h-[200px]"
                        htmlFor="getFeatured"
                      >
                        <div className="w-full flex flex-col justify-center gap-2 items-center">
                          <MdOutlineCloudDownload size={40} />
                          <h4 className="text-textDark font-medium">
                            {file?.name
                              ? `Selected file , ${file?.name}`
                              : "Drop file here or click to upload"}
                          </h4>
                          <h4 className="font-medium text-textDark">Browse</h4>
                        </div>
                      </label>
                    </div>

                    <div className="flex justify-end pt-4">
                      <DialogClose>
                        <button
                          disabled={isLoading}
                          onClick={() => {
                            handleCratePost();
                          }}
                          className="text-sm px-6 py-3 rounded-full bg-primaryColor text-textDark font-semibold "
                        >
                          {isLoading ? (
                            <BeatLoader
                              size={10}
                              color={"#000"}
                              speedMultiplier={0.5}
                            />
                          ) : (
                            "Post"
                          )}
                        </button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Dialog>
          <DialogTrigger asChild className="w-full">
            <div className="flex justify-around lg:justify-between">
              <div className="bg-[#E9E9E9] px-4 cursor-pointer items-center ap-4 flex py-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M28.8334 16C28.8334 23.0876 23.0877 28.8333 16.0001 28.8333C8.91243 28.8333 3.16675 23.0876 3.16675 16C3.16675 8.91231 8.91243 3.16663 16.0001 3.16663C23.0877 3.16663 28.8334 8.91231 28.8334 16Z"
                    fill="#343535"
                    stroke="#343535"
                  />
                  <path
                    d="M19.2964 14.1262L19.2972 14.1266C20.3041 14.7064 20.6966 15.4037 20.6966 16C20.6966 16.5963 20.3041 17.2936 19.2972 17.8733L19.2964 17.8738L17.5897 18.8605L15.8838 19.8467C15.8838 19.8467 15.8837 19.8467 15.8837 19.8468C14.8767 20.4265 14.0756 20.4171 13.5582 20.1186C13.0409 19.8201 12.6333 19.1323 12.6333 17.9733V16V14.0267C12.6333 12.86 13.0415 12.1734 13.5574 11.8768C14.0742 11.5798 14.8753 11.5728 15.8834 12.1531C15.8835 12.1531 15.8837 12.1532 15.8838 12.1533L17.5897 13.1395L19.2964 14.1262Z"
                    fill="white"
                    stroke="white"
                  />
                </svg>
                <h4 className="lg:flex hidden">Video</h4>
              </div>
              <div className="bg-[#E9E9E9] px-4 cursor-pointer items-center gap-4 flex py-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M9.84059 20.4526L3.64164 24.6104C3.33065 23.7397 3.16699 22.7318 3.16699 21.587V10.4137C3.16699 8.08643 3.85875 6.289 5.07388 5.07388C6.289 3.85875 8.08643 3.16699 10.4137 3.16699H21.587C23.9142 3.16699 25.7116 3.85875 26.9268 5.07388C28.1419 6.289 28.8337 8.08643 28.8337 10.4137V17.4451L27.4861 16.2877C26.2588 15.2335 24.3021 15.2334 23.0747 16.2876C23.0747 16.2876 23.0747 16.2876 23.0746 16.2876C23.0746 16.2876 23.0746 16.2877 23.0745 16.2877L17.528 21.0476L17.5279 21.0477C16.6752 21.7801 15.2721 21.7801 14.4195 21.0477L14.4195 21.0476L14.4115 21.041L13.9635 20.6721C12.8403 19.6961 11.0873 19.6114 9.84116 20.4522C9.84097 20.4523 9.84078 20.4524 9.84059 20.4526Z"
                    fill="#343535"
                    stroke="#343535"
                  />
                  <path
                    d="M14.1738 10.6665C14.1738 11.8668 13.2008 12.8398 12.0005 12.8398C10.8002 12.8398 9.82715 11.8668 9.82715 10.6665C9.82715 9.4662 10.8002 8.49316 12.0005 8.49316C13.2008 8.49316 14.1738 9.4662 14.1738 10.6665Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M10.6768 21.6976L10.6768 21.6976L10.6792 21.6959C11.3826 21.2211 12.3884 21.2886 12.982 21.807L12.9929 21.8165L13.004 21.8257L13.45 22.1929C14.8651 23.4008 17.0924 23.3984 18.5043 22.1859C18.5044 22.1858 18.5046 22.1857 18.5047 22.1856L24.051 17.4259L24.0513 17.4256C24.7166 16.8542 25.8429 16.8542 26.5082 17.4256L26.5082 17.4257L28.3331 18.9931V21.5871C28.3331 23.8149 27.6729 25.473 26.5726 26.5733C25.4724 27.6735 23.8142 28.3337 21.5864 28.3337H10.4131C7.69312 28.3337 5.78833 27.3527 4.72078 25.6924L10.6768 21.6976Z"
                    fill="white"
                    stroke="#343535"
                    strokeWidth="2"
                  />
                </svg>
                <h4 className="lg:flex hidden">Photos</h4>
              </div>
              <div className="bg-[#E9E9E9] px-4 cursor-pointer items-center gap-4 flex py-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M29.3334 20V12C29.3334 5.33329 26.6667 2.66663 20.0001 2.66663H12.0001C5.33341 2.66663 2.66675 5.33329 2.66675 12V20C2.66675 26.6666 5.33341 29.3333 12.0001 29.3333H20.0001C26.6667 29.3333 29.3334 26.6666 29.3334 20Z"
                    fill="#343535"
                    stroke="#343535"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.8267 23.0667C14.3878 23.0667 15.6533 21.8011 15.6533 20.24C15.6533 18.6789 14.3878 17.4133 12.8267 17.4133C11.2655 17.4133 10 18.6789 10 20.24C10 21.8011 11.2655 23.0667 12.8267 23.0667Z"
                    fill="#343535"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.6533 20.2399V10.36"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5067 9.02667L20.6266 10.0666C21.3866 10.32 22 11.1733 22 11.9733V12.7999C22 13.8799 21.16 14.4799 20.1466 14.1333L17.0267 13.0933C16.2667 12.84 15.6533 11.9867 15.6533 11.1867V10.36C15.6533 9.29334 16.48 8.68001 17.5067 9.02667Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h4 className="lg:flex hidden">Audio</h4>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="hidden">
            <DialogHeader>
              <DialogTitle className="p-0 border-b pb-4">
                <div className="relative">
                  <h3 className="text-2xl font-semibold text-textDark text-center ">
                    Create Post
                  </h3>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="py-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                    <h3 className="text-sm font-medium text-textColor">
                      {loggedInUser.name}
                    </h3>
                  </div>
                  <div className="pt-4">
                    <div>
                      <textarea
                        onChange={e => {
                          settittle(e.target.value);
                        }}
                        className="px-4 resize-none border focus:outline-none placeholder:text-textDark py-3 rounded-xl text-textColor w-full h-[200px]"
                        name=""
                        placeholder="Whats in you mind?"
                        id=""
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-4 w-full">
                    <input
                      className="hidden"
                      type="file"
                      accept="*/"
                      name="getFeatured"
                      id="getFeatured"
                    />
                    <label
                      className="border cursor-pointer p-4 flex  justify-center items-center rounded-md  bg-backgroundLight w-full h-[200px]"
                      htmlFor="getFeatured"
                    >
                      <div className="w-full flex flex-col justify-center gap-2 items-center">
                        <MdOutlineCloudDownload size={40} />
                        <h4 className="text-textDark font-medium">
                          {file?.name
                            ? `Selected file , ${file?.name}`
                            : "Drop file here or click to upload"}
                        </h4>
                        <h4 className="font-medium text-textDark">Browse</h4>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      disabled={isLoading}
                      onClick={() => {
                        handleCratePost();
                      }}
                      className="text-sm px-6 py-3 rounded-full bg-primaryColor text-textDark font-semibold "
                    >
                      <BeatLoader
                        size={10}
                        color={"#000"}
                        speedMultiplier={0.5}
                      />
                    </button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {/* <div className="border rounded-xl bg-white lg:p-6 p-4">
        <Title title={"Recent Supporters:"}></Title>
        <div>
          <div className="flex items-center pb-2  gap-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <mask
                id="mask0_9623_14877"
                maskUnits="userSpaceOnUse"
                x="7"
                y="6"
                width="34"
                height="36"
              >
                <path
                  d="M7.95703 6.1582H40.0404V41.8749H7.95703V6.1582Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_9623_14877)">
                <mask
                  id="mask1_9623_14877"
                  maskUnits="userSpaceOnUse"
                  x="7"
                  y="6"
                  width="34"
                  height="36"
                >
                  <path
                    d="M10.357 6.1582H37.6404C38.9654 6.1582 40.0404 7.2332 40.0404 8.5582V39.4415C40.0404 40.7665 38.9654 41.8415 37.6404 41.8415H10.357C9.03203 41.8415 7.95703 40.7665 7.95703 39.4415V8.5582C7.95703 7.2332 9.03203 6.1582 10.357 6.1582Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask1_9623_14877)">
                  <path
                    d="M7.95703 6.1582H40.0404V41.8749H7.95703V6.1582Z"
                    fill="#99FF6D"
                  />
                </g>
              </g>
              <mask
                id="mask2_9623_14877"
                maskUnits="userSpaceOnUse"
                x="10"
                y="10"
                width="28"
                height="29"
              >
                <path
                  d="M10.7461 10.0625H37.1461V38.0625H10.7461V10.0625Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask2_9623_14877)">
                <path
                  d="M31.4396 24.5419C31.4563 25.8336 31.3979 27.4336 31.2229 28.9586C31.4688 28.7377 31.7146 28.5377 31.9563 28.3461C33.1521 27.3877 34.2188 26.5336 33.9146 25.1211C33.8313 24.6877 33.5979 24.3544 33.2979 24.1502C33.1521 24.0502 32.9938 23.9752 32.8354 23.9461C32.6771 23.9169 32.5063 23.9169 32.3313 23.9461C32.0313 24.0211 31.7146 24.2086 31.4396 24.5419ZM24.7188 18.2836C24.6729 18.6752 24.3146 18.9502 23.9104 18.9086C23.5229 18.8502 23.2479 18.4877 23.3063 18.0961C23.3063 18.0961 23.3646 17.6294 23.3229 17.6169C23.1896 17.5877 22.7146 17.5711 22.1271 17.5586C21.4354 17.5586 20.6021 17.5419 19.8229 17.4711C18.6563 17.3544 17.8938 16.9336 17.4771 16.3961C17.2146 16.0627 17.0854 15.6669 17.0854 15.2752C17.0729 14.9002 17.1729 14.5211 17.3771 14.1711C17.7479 13.5211 18.4813 12.9836 19.4604 12.7794C20.4979 12.5752 23.1479 12.6627 25.2229 12.7336C26.0563 12.7627 26.7896 12.7919 27.2521 12.7919H27.2938C27.9438 12.8377 28.3896 12.7211 28.6604 12.5169C28.7771 12.4294 28.8646 12.3419 28.9229 12.2419C28.9771 12.1252 29.0063 12.0086 29.0063 11.9086C29.0229 11.6877 28.9646 11.4877 28.8479 11.3252C28.6313 10.9919 28.7062 10.5419 29.0229 10.3086C29.3521 10.0794 29.7979 10.1669 30.0313 10.4836C30.3313 10.9211 30.4771 11.4586 30.4479 11.9961C30.4313 12.3127 30.3479 12.6336 30.1896 12.9252C30.0312 13.2127 29.7979 13.4752 29.4979 13.6961C28.9646 14.0711 28.2146 14.3044 27.2063 14.2294C26.7021 14.2294 25.9854 14.2044 25.1771 14.1877C23.1896 14.1169 20.6271 14.0294 19.7521 14.2044C19.1896 14.3169 18.8021 14.5961 18.6146 14.9002C18.5396 15.0169 18.5104 15.1336 18.5104 15.2461C18.5104 15.3336 18.5563 15.4211 18.6146 15.5086C18.8021 15.7544 19.2313 15.9586 19.9521 16.0336C20.6854 16.0919 21.4771 16.1044 22.1396 16.1211C22.8313 16.1336 23.3938 16.1336 23.6646 16.2044C24.9479 16.5252 24.7313 18.2836 24.7188 18.2836ZM16.6688 26.7794C16.6396 26.3711 16.9438 26.0377 17.3479 26.0086C17.7354 25.9794 18.0813 26.2836 18.1104 26.6919C18.1687 27.6211 18.2979 28.9586 18.5396 30.2336C18.7854 31.4419 19.1312 32.5752 19.6229 33.1669C19.6646 33.2127 19.7229 33.2544 19.7812 33.3002C20.5271 33.8961 22.2979 34.2002 24.0979 34.1711C25.8979 34.1419 27.6979 33.8086 28.5021 33.1127C28.5896 33.0544 28.6479 32.9794 28.6896 32.9211C28.9062 32.6461 29.0938 32.2377 29.2521 31.7586C28.9229 31.7294 28.5771 31.7044 28.2438 31.6877C26.0854 31.5419 23.8688 31.5711 22.2688 31.6419C21.8813 31.6586 21.5521 31.3544 21.5229 30.9627C21.5062 30.5544 21.8229 30.2211 22.2104 30.2044C23.8521 30.1336 26.1271 30.0919 28.3313 30.2336C28.7479 30.2627 29.1813 30.2919 29.5979 30.3377C29.9438 28.4627 30.0438 26.0961 30.0146 24.3544C30.0021 24.3377 30.0021 24.3086 30.0021 24.2794C30.0021 24.1377 30.0021 24.0044 30.0021 23.8752L29.9854 23.6836C29.2938 24.1377 28.3021 24.4711 27.1479 24.6752C26.0979 24.8627 24.8896 24.9502 23.6813 24.9627C22.4854 24.9794 21.2771 24.9044 20.2271 24.7294C18.1104 24.3961 16.5396 23.6419 16.4813 22.4086C16.4688 22.2752 16.4813 22.1627 16.4979 22.0461C16.6687 21.1461 17.5771 20.5211 18.8854 20.1294C19.9938 19.7919 21.4187 19.5919 22.8896 19.5169C24.6146 19.4169 26.4021 19.5044 27.7271 19.7502C28.1146 19.8211 28.3604 20.2002 28.2896 20.5919C28.2146 20.9836 27.8396 21.2461 27.4521 21.1711C26.2438 20.9544 24.5896 20.8669 22.9604 20.9544C21.6062 21.0294 20.2979 21.2169 19.3021 21.5211C18.4979 21.7544 17.9646 22.0294 17.9063 22.3044V22.3336C17.9354 22.7419 19.0021 23.0752 20.4563 23.3086C21.4187 23.4544 22.5438 23.5252 23.6646 23.5252C24.7896 23.5127 25.9104 23.4086 26.9062 23.2336C28.3896 22.9752 29.4979 22.5961 29.5563 22.1336C29.5563 22.0586 29.5688 22.0002 29.5854 21.9294C29.6396 21.7377 29.7146 21.5961 29.7979 21.4627C29.8438 21.4211 29.8854 21.3627 29.9438 21.3169C30.6646 20.7377 31.1229 21.1169 31.2979 22.2336C31.3271 22.3794 31.3396 22.5669 31.3688 22.7711C31.5854 22.6711 31.8021 22.5836 32.0313 22.5377C32.3896 22.4502 32.7646 22.4502 33.1271 22.5252C33.4688 22.5961 33.8146 22.7419 34.1021 22.9461C34.6938 23.3502 35.1563 23.9919 35.3271 24.8169C35.8188 27.1002 34.4063 28.2294 32.8521 29.4794C32.4188 29.8294 31.9563 30.2044 31.5563 30.5961C32.0146 30.6836 32.4771 30.7877 32.8938 30.9044C33.8896 31.1669 34.9813 31.5877 35.7729 32.1086C36.2479 32.4294 36.6229 32.7919 36.8396 33.2127C37.1146 33.7211 37.1396 34.2711 36.8396 34.8377C36.6813 35.1461 36.4229 35.4336 36.0479 35.7252C35.1563 36.4377 33.6271 36.9586 31.7438 37.3377C29.7563 37.7294 27.3229 37.9461 24.8479 37.9919C22.0688 38.0502 19.2188 37.8752 16.8563 37.5127C14.6271 37.1627 12.8104 36.6127 11.8188 35.8544C11.4146 35.5502 11.1271 35.2002 10.9688 34.8377C10.7396 34.3169 10.7396 33.7627 10.9688 33.2544C11.1563 32.8044 11.5021 32.3711 11.9896 32.0086C12.6979 31.5002 13.7062 31.0752 14.9438 30.8752C15.3313 30.8002 15.7062 31.0752 15.7646 31.4711C15.8354 31.8627 15.5604 32.2377 15.1729 32.2961C14.1646 32.4711 13.3729 32.7919 12.8396 33.1836C12.5646 33.3877 12.3646 33.6044 12.2771 33.8086C12.2229 33.9544 12.2229 34.1127 12.2771 34.2419C12.3521 34.3877 12.4813 34.5502 12.6813 34.6919C13.4729 35.3044 15.0729 35.7544 17.0729 36.0752C19.3479 36.4377 22.1104 36.5961 24.8188 36.5377C27.2063 36.4961 29.5563 36.2919 31.4688 35.9127C33.1396 35.5794 34.4646 35.1461 35.1688 34.5919C35.3688 34.4336 35.5021 34.2877 35.5729 34.1544C35.6146 34.0544 35.6146 33.9669 35.5729 33.8794C35.4854 33.6919 35.2688 33.5044 34.9813 33.3127C34.3354 32.8794 33.3979 32.5294 32.5354 32.2961C31.9563 32.1502 31.3396 32.0211 30.6646 31.9336C30.4479 32.7044 30.1729 33.3586 29.8271 33.8086C29.7146 33.9544 29.5854 34.1002 29.4271 34.2294C28.3438 35.1294 26.2146 35.5961 24.1146 35.6252C22.0271 35.6502 19.9104 35.2461 18.9021 34.4461C18.7563 34.3461 18.6271 34.2127 18.5271 34.1002C17.8521 33.2836 17.4188 31.9211 17.1313 30.5127C16.8729 29.1752 16.7396 27.7669 16.6688 26.7794Z"
                  fill="#050505"
                />
              </g>
            </svg>
            <h4>Buy a coffee</h4>
          </div>
        </div>

        <div className="w-full space-y-3 h-[250px] lg:h-[200px] overflow-y-scroll scrollbar-hide p-2 rounded-lg">
          <SupporterMessage></SupporterMessage>
          <CreatorMessage></CreatorMessage>
          <SupporterMessage></SupporterMessage>
          <CreatorMessage></CreatorMessage>
          <SupporterMessage></SupporterMessage>
          <CreatorMessage></CreatorMessage>
        </div>
        <form className="pt-4" action="">
          <textarea
            placeholder="Write your message"
            className="w-full text-sm px-4 py-3 focus:outline-none h-[100px] rounded-lg border"
            name=""
            id=""
          ></textarea>
          <div className="flex justify-end pt-4">
            <button className="px-6 py-3 rounded-full bg-primaryColor font-semibold text-textDark text-sm ">
              Message
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
}

export default CreatePost;
