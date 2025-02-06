

function CreatorProfile({ creator }) {
  return (
    <div className="flex items-center gap-4 mt-12">
      <p className="text-paraDark">{creator.creatorNum}</p>
      <div className="flex items-center gap-3">
        <div className="lg:min-w-20 min-w-16 lg:h-20 border h-16  border-[rgba(113,113,113,0.12)]  rounded-full flex items-center justify-center overflow-hidden">
          <img className="w-full h-full object-cover" src={creator.creatorImg} alt="creatorimg" />
        </div>
        <div className="max-w-[278px]">
          <h3 className="font-bold text-headingColor text-sm lg:text-base mb-2 ">{creator.name}</h3>
          <p className="text-headingColor text-sm lg:text-base">{`${creator.description.slice(0, 52
          ) }....`}</p>
        </div>
      </div>
    </div>
  );
}

export default CreatorProfile;
