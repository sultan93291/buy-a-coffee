import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PostCard({ data }) {
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;

  const [imageUrl, setImageUrl] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [videoUrl, setVideoUrl] = useState();

  let fileExtension;
  let fileName;

  useEffect(() => {
    if (!data?.file_url) return; // Ensure file_url exists

    fileName = data.file_url;
    fileExtension = fileName.split(".").pop().toLowerCase(); // Convert to lowercase for consistency

    console.log(fileExtension);

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)) {
      setImageUrl(`${imgBaseUrl}/${fileName}`);
    } else if (["mp3", "wav", "ogg", "aac"].includes(fileExtension)) {
      setAudioUrl(`${imgBaseUrl}/${fileName}`);
    } else if (["mp4", "webm", "avi", "mov"].includes(fileExtension)) {
      setVideoUrl(`${imgBaseUrl}/${fileName}`);
    }
  }, [data]); // Runs when `data` changes

  return (
    <div className="2xl:flex-row relative overflow-x-hidden  flex flex-col w-[250px]   gap-4 lg:p-6 p-4  items-center lg:items-start  2xl:w-[640px] bg-[#fafafa]   rounded-xl after-content-[''] after:absolute after:top-0 after:left-0  after:w-full after:bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(255,255,255,0.5)]  after:backdrop-blur-sm after:rounded-xxl after:z-10  after:h-full z-0  ">
      <div className="absolute top-0 left-0 z-50 w-full h-full flex justify-center items-center">
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

      <div className="lg:w-[202px] md:h-[101px] w-full relative overflow-hidden lg rounded-xl">
        {imageUrl ? (
          <img
            className=" w-full  md:w-[202px] h-[101px] object-cover"
            src={imageUrl}
            alt="dynamic content"
          />
        ) : audioUrl ? (
          <audio className="w-full  md:w-[202px] object-cover" controls>
            <source
              src={audioUrl}
              type={`audio/${audioUrl.split(".").pop().toLowerCase()}`}
            />
            Your browser does not support the audio element.
          </audio>
        ) : videoUrl ? (
          <video
            className="w-full  md:w-[202px] h-[101px] object-cover"
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

      <p className="text-textColor w-[250px] lg:max-w-[300px] px-8 text-center break-words truncate">
        {data?.title}
      </p>
    </div>
  );
}

export default PostCard;

// className = "  ";

{
  /*  */
}
