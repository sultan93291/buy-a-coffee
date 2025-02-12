import { useEffect, useState } from "react";

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
    <div className="lg:flex-row flex flex-col gap-4 lg:p-6 p-4 bg-gray-50 rounded-xl h-full">
      <div className="lg:w-3/12 w-full overflow-hidden h-[300px] lg:h-full rounded-xl">
        {imageUrl ? (
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt="dynamic content"
          />
        ) : audioUrl ? (
          <audio className="w-full h-full" controls>
            <source
              src={audioUrl}
              type={`audio/${audioUrl.split(".").pop().toLowerCase()}`}
            />
            Your browser does not support the audio element.
          </audio>
        ) : videoUrl ? (
          <video className="w-full h-full" controls>
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
      <div className="flex flex-col h-fit lg:h-full">
        <p className="text-textColor ">{data?.title}</p>
      </div>
    </div>
  );
}

export default PostCard;
