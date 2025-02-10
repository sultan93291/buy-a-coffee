import { MdOutlineCloudDownload } from "react-icons/md";
import Title from "./Title";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useEditFeatureImgAndBioMutation } from "@/redux/features/api/apiSlice";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";

function Intro() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const [Bio, setBio] = useState(loggedInUser?.bio);
  const [file, setfile] = useState();

  const [useEditeFeatureAndBio, { data, isLoading, error }] =
    useEditFeatureImgAndBioMutation();

  useEffect(() => {
    if (loggedInUser) {
      setBio(loggedInUser?.bio);
    }
  }, [loggedInUser]);

  const handleFileUpload = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setfile(selectedFile);
    }
  };

  const handleFeatureBioUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("bio", Bio);

      const response = await useEditeFeatureAndBio(formData).unwrap();
      if (response?.code === 200) {
        toast.success(response?.message);
        fetchData();
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error?.data?.message);
    }
  };

  return (
    <div className="lg:p-6 p-4 rounded-xl h-full flex flex-col justify-between bg-white border">
      <Title title={"Intro:"}></Title>
      <p className="text-textColor font-medium">{loggedInUser?.bio}</p>

      <div className="pt-6">
        <Title title={"Featured image"}></Title>

        <div className="rounded-xl border w-full h-[300px] overflow-hidden ">
          <img
            className="w-full h-full object-cover "
            src="https://images.unsplash.com/photo-1611689342806-0863700ce1e4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="pt-4">
          <Dialog>
            <DialogTrigger asChild className="w-full">
              <button className="w-full rounded-full bg-primaryColor text-textDark font-bold  py-4">
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
                        {file ? file.name : "Drop file here or click to upload"}
                      </h4>
                      <h4 className="font-medium text-textDark">
                        {file ? "Choose another" : "Browse"}{" "}
                      </h4>
                    </div>
                  </label>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      handleFeatureBioUpdate();
                    }}
                    disabled={isLoading}
                    type="submit"
                    className="text-sm px-6 py-3 rounded-full bg-primaryColor text-textDark font-semibold "
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
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Intro;
