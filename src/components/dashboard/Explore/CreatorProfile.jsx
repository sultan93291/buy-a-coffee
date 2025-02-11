function CreatorProfile({ creator }) {
  const imgBaseUrl = import.meta.env.VITE_SERVER_URL;
  return (
    <div className="flex items-center gap-4 mt-12">
      <div className="flex items-center gap-3">
        <div
          style={{
            backgroundImage: `url(${`${imgBaseUrl}/${creator?.avatar}`})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="lg:min-w-20 min-w-16 lg:h-20  border h-16 relative  border-[rgba(113,113,113,0.12)]  rounded-full flex items-center justify-center overflow-hidden"
        >
        </div>
        <div className="max-w-[278px]">
          <h3 className="font-bold text-headingColor text-sm lg:text-base mb-2 ">
            {creator?.name}
          </h3>
          <p className="text-headingColor text-sm lg:text-base">{`${creator?.bio?.slice(
            0,
            52
          )}....`}</p>
        </div>
      </div>
    </div>
  );
}

export default CreatorProfile;
