import { MdOutlineCloudDownload } from "react-icons/md";
import Title from "./Title";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useEditFeatureImgAndBioMutation } from "@/redux/features/api/apiSlice";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { AuthContext } from "@/provider/AuthContextProvider";

function Intro({ isMe, IntroData }) {
  const Searcheduser = IntroData?.data;
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const [Bio, setBio] = useState(loggedInUser?.bio);
  const [file, setfile] = useState();
  const [feateureImage, setfeateureImage] = useState(
    isMe
      ? `${imgBaseUrl}/${loggedInUser?.featurd_images?.image}`
      : `${imgBaseUrl}/${Searcheduser?.featurd_images?.image}`
  );


  const [useEditeFeatureAndBio, { data, isLoading, error }] =
    useEditFeatureImgAndBioMutation();

  const { fetchData } = useContext(AuthContext);

  useEffect(() => {
    if (loggedInUser) {
      setBio(loggedInUser?.bio);
      setfeateureImage(
        isMe
          ? `${imgBaseUrl}/${loggedInUser?.featurd_images?.image}`
          : `${imgBaseUrl}/${Searcheduser?.featurd_images?.image}`
      );
    }
  }, [loggedInUser]);

  useEffect(() => {
    setfeateureImage(
      isMe
        ? `${imgBaseUrl}/${loggedInUser?.featurd_images?.image}`
        : `${imgBaseUrl}/${Searcheduser?.featurd_images?.image}`
    );
  }, [Searcheduser]);

const handleFileUpload = e => {
  const selectedFile = e.target.files[0];
   if (selectedFile.size > 2 * 1024 * 1024) {
     toast.error("File must be less than 2MB.");
     return; // Do not reset the existing preview
   }

  if (selectedFile) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("File format type  is not allowed")
      return;
    }

    setfile(selectedFile);
  }
};


  const handleFeatureBioUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", Bio);
      if (file) formData.append("image", file);

      console.log(...formData);
      const response = await useEditeFeatureAndBio(formData).unwrap();

      if (response?.code === 200) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error?.data?.message);
    } finally {
      fetchData();
      setfile("");
    }
  };

  const [hovered, setHovered] = useState(false);

  const BtnColor = useSelector(state => state.btnReducer.btnColor);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor; // If BtnColor is undefined, use the default color

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor, // Transparent on hover, btn color otherwise
    border: `2px solid ${hovered ? buttonColor : "transparent"}`, // Border is always there, but only shows color on hover
    color: hovered ? buttonColor : "#000", // Text color on hover and default text color (black)
  };

  return (
    <div
      className={`lg:p-6 ${
        isMe ? "2xl:min-w-[496px]" : " 2xl:min-w-[350px] 2xl:max-w-[496px]"
      } max-h-[649px] p-4 rounded-xl h-full flex flex-col justify-between bg-white border`}
    >
      <Title title={"Intro:"}></Title>
      <p className="text-textColor font-medium">
        {!isMe
          ? Searcheduser?.bio
            ? Searcheduser.bio
            : "Bio not available"
          : loggedInUser?.bio}
      </p>

      <div className="pt-6">
        <Title title={"Featured image"}></Title>

        <div className="rounded-xl border w-full h-[300px] overflow-hidden ">
          <img
            className="w-full h-full object-cover "
            src={feateureImage}
            alt=""
          />
        </div>
        {isMe && (
          <div className="pt-4">
            <Dialog>
              <DialogTrigger asChild className="w-full">
                <button
                  style={buttonStyles}
                  className="w-full rounded-full  text-textDark font-bold  py-4"
                >
                  Edit Featured
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="p-0 border-b pb-4">
                    <div className="relative">
                      <h3 className="text-2xl font-semibold text-textDark text-center ">
                        Edit featured
                      </h3>
                    </div>
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
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
                        name="bio"
                        placeholder="Write Bio"
                        id=""
                        value={Bio}
                        onChange={e => {
                          setBio(e.target.value);
                        }}
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
                      onChange={handleFileUpload}
                    />
                    <label
                      className="border cursor-pointer p-4 flex  justify-center items-center rounded-md  bg-backgroundLight w-full h-[200px]"
                      htmlFor="getFeatured"
                    >
                      <div className="w-full flex flex-col justify-center gap-2 items-center">
                        <MdOutlineCloudDownload size={40} />
                        <h4 className="text-textDark font-medium">
                          {file
                            ? file.name
                            : "Drop file here or click to upload"}
                        </h4>
                        <h4 className="font-medium text-textDark">
                          {file ? "Choose another" : "Browse"}{" "}
                        </h4>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <DialogClose>
                      <button
                        onClick={() => {
                          handleFeatureBioUpdate();
                        }}
                        style={buttonStyles}
                        disabled={isLoading}
                        type="submit"
                        className="text-sm px-6 py-3 rounded-full font-semibold "
                      >
                        {isLoading ? (
                          <BeatLoader
                           
                          />
                        ) : (
                          "Save changes"
                        )}
                      </button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

export default Intro;
