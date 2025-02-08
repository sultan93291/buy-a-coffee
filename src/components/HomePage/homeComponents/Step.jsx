import Tag from "./Tag";

function Step({ item, imgSrc }) {
  return (
    <div
      className={`lg:flex items-center lg:justify-between mt-10 lg:mt-20 ${
        item.reversed ? "flex-row-reverse" : ""
      }`}
    >
      <div className="lg:w-[536px]" data-aos="fade-up" data-aos-delay="100">
        <div className="mb-3 md:mb-4">
          <Tag text={item.tag} />
        </div>
        <div className=" flex flex-col gap-y-6">
          <h3 className="text-[24px] leading-[32px] lg:text-[36px] font-bold text-headingColor lg:leading-[132%]">
            {item.title}
          </h3>
          <p className="text-sm mt-5 md:mt-0 leading-[23px] md:leading-normal md:text-[16px] text-paraDeep">
            {item.description}
          </p>
        </div>
      </div>
      <div className="mt-8 md:mt-0" data-aos="fade-up" data-aos-delay="100">
        <img
          className={`${
            item.id === 1
              ? " w-full mt-8 h-auto md:h-[563px] md-mt-0 object-contain md:w-[657px]"
              : "h-auto md:h-[614px] object-cover md:w-[760px]"
          }`}
          src={imgSrc}
          alt="img"
        />
      </div>
    </div>
  );
}

export default Step;
