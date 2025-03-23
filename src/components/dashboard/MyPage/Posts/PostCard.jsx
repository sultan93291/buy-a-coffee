import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCreatorsFollowerListQuery } from "@/redux/features/api/apiSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function PostCard({ data, isMe }) {
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  const { creatorId } = useParams();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [followerDataArr, setfollowerDataArr] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleClick = () => {
    if (imageUrl) {
      setSelectedMedia({
        type: "image",
        url: imageUrl,
        title: data?.title,
        description: data?.description,
      });
    } else if (audioUrl) {
      setSelectedMedia({
        type: "audio",
        url: audioUrl,
        title: data?.title,
        description: data?.description,
      });
    } else if (videoUrl) {
      setSelectedMedia({
        type: "video",
        url: videoUrl,
        title: data?.title,
        description: data?.description,
      });
    } else {
      setSelectedMedia(null);
    }
  };

  const {
    data: followerData,
    isLoading,
    error,
  } = useGetCreatorsFollowerListQuery(creatorId);

  const loggedInUserData = useSelector(
    state => state.userDocReducer.loggedInuser
  );

  useEffect(() => {
    if (followerData) {
      setfollowerDataArr(followerData.data);
    }
  }, [followerData]);

  const isAuthorized =
    Array.isArray(followerDataArr) &&
    followerDataArr.some(follower => follower === loggedInUserData?.id);

  let fileExtension;
  let fileName;

  useEffect(() => {
    if (!data?.file_url) return; // Ensure file_url exists

    fileName = data.file_url;
    fileExtension = fileName.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)) {
      setImageUrl(`${imgBaseUrl}/${fileName}`);
    } else if (["mp3", "wav", "ogg", "aac"].includes(fileExtension)) {
      setAudioUrl(`${imgBaseUrl}/${fileName}`);
    } else if (["mp4", "webm", "avi", "mov"].includes(fileExtension)) {
      setVideoUrl(`${imgBaseUrl}/${fileName}`);
    }
  }, [data]); // Runs when `data` changes

  return (
    <>
      <div
        onClick={() => {
          if (isMe || isAuthorized) {
            setOpen(true);
            handleClick();
          }
        }}
        className="2xl:flex-row relative cursor-pointer overflow-x-hidden   flex flex-col w-[250px]  p-4  gap-4   items-center lg:items-start  2xl:w-[700px] bg-[#fafafa]   rounded-xl   "
      >
        <div className="flex flex-col   gap-y-4 relative w-full ">
          <div className="">
            <h3 className="text-[#34312C]  text-base xl:text-xl  font-bold leading-[132%] tracking-[-0.2%] ">
              {data?.title}
            </h3>
          </div>
          <div
            className={`${
              isMe || isAuthorized
                ? "after:hidden"
                : "flex flex-row gap-x-5  after-content-[''] relative w-full after:absolute after:top-0 after:left-0  after:w-full after:bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(255,255,255,0.5)]  after:backdrop-blur-sm after:rounded-xxl after:z-10  after:h-full z-0 after:rounded-[12px]"
            }`}
          >
            <div
              className={`${
                isMe || isAuthorized
                  ? "hidden"
                  : "absolute top-0 left-0 z-50 w-full h-full flex justify-center items-center"
              }`}
            >
              <svg
                onClick={() => {
                  toast.error("Membership required to view the post.");
                }}
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  opacity="0.6"
                  d="M26.2602 31.4397C26.2602 32.6879 25.2484 33.6997 24.0002 33.6997C22.7521 33.6997 21.7402 32.6879 21.7402 31.4397C21.7402 30.1915 22.7521 29.1797 24.0002 29.1797C25.2484 29.1797 26.2602 30.1915 26.2602 31.4397Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                />
                <path
                  d="M14.7 19.8799H33.3C37.3648 19.8799 39.6718 20.5159 41.0179 21.862C42.364 23.2081 43 25.5151 43 29.5799V33.2999C43 37.3647 42.364 39.6717 41.0179 41.0178C39.6718 42.3639 37.3648 42.9999 33.3 42.9999H14.7C10.6352 42.9999 8.32818 42.3639 6.98211 41.0178C5.63603 39.6717 5 37.3647 5 33.2999V29.5799C5 25.5151 5.63603 23.2081 6.98211 21.862C8.32818 20.5159 10.6352 19.8799 14.7 19.8799ZM16.96 31.4399C16.96 35.31 20.1056 38.4799 24 38.4799C27.8944 38.4799 31.04 35.31 31.04 31.4399C31.04 27.5698 27.8944 24.3999 24 24.3999C20.1056 24.3999 16.96 27.5698 16.96 31.4399Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                />
                <path
                  opacity="0.4"
                  d="M14.2395 18.9V16.56C14.2395 10.7 15.8995 6.8 23.9995 6.8C32.0995 6.8 33.7595 10.7 33.7595 16.56V18.9C34.7795 18.92 35.6995 18.96 36.5595 19.08V16.56C36.5595 11.16 35.2595 4 23.9995 4C12.7395 4 11.4395 11.16 11.4395 16.56V19.06C12.2795 18.96 13.2195 18.9 14.2395 18.9Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col-reverse w-full relative  xl:flex-row bg-white rounded-[12px]  gap-y-2 shadow-md  ">
              <div className="w-full relative overflow-hidden p-4 ">
                {imageUrl ? (
                  <img
                    className=" w-full  rounded-xl  h-[101px] object-cover"
                    src={imageUrl}
                    alt="dynamic content"
                  />
                ) : audioUrl ? (
                  <audio className="w-full mx-auto block" controls>
                    <source
                      src={audioUrl}
                      type={`audio/${audioUrl.split(".").pop().toLowerCase()}`}
                    />
                    Your browser does not support the audio element.
                  </audio>
                ) : videoUrl ? (
                  <video
                    className="w-full rounded-xl   h-[101px] object-cover"
                    controls
                  >
                    <source
                      src={videoUrl}
                      type={`video/${videoUrl.split(".").pop().toLowerCase()}`}
                    />
                    Your browser does not support the video element.
                  </video>
                ) : (
                  <p>Unsupported file type</p>
                )}
              </div>

              <div className="w-full py-2 xl:py-5 flex items-center xl:items-start ">
                <p className="text-textColor xl:w-[250px] 2xl:max-w-[300px] px-8 text-center break-words truncate ">
                  {data?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="max-w-[772px] relative h-auto pt-4 flex flex-col gap-y-6   ">
                <div className="w-full h-auto relative ">
                  {selectedMedia && (
                    <div className=" relative w-full h-full  rounded">
                      {selectedMedia.type === "image" ? (
                        <img
                          src={selectedMedia.url}
                          alt="Selected"
                          className="w-full h-full object-cover  rounded-[8px] "
                        />
                      ) : selectedMedia.type === "audio" ? (
                        <audio controls className="mt-2">
                          <source
                            src={selectedMedia.url}
                            type={`audio/${selectedMedia.url.split(".").pop()}`}
                          />
                        </audio>
                      ) : selectedMedia.type === "video" ? (
                        <video
                          controls
                          muted={false}
                          playsInline
                          className="w-full h-full object-cover rounded-[8px]"
                        >
                          <source
                            src={selectedMedia.url}
                            type={`video/${selectedMedia.url.split(".").pop()}`}
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <p className="text-xl font-bold leading-[132%] tracking-[-0.2%] text-[#34312C]  ">
                    {selectedMedia?.title}
                  </p>
                  <div className="max-h-[200px]  overflow-y-scroll">
                    <span className="text-base   leading-[164%] text-[#717171] font-normal ">
                      {selectedMedia?.description}
                    </span>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostCard;
