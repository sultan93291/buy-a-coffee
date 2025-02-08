import React from "react";

function SupporterStep({ step, text, highlitedText }) {
  return (
    <div className="mt-8 lg:mt-10">
      <div className="p-3 h-12 w-12 text-[18px] lg:text-[20px] font-bold lg:leading-[132%] tracking-[-0.2%] text-headingColor flex items-center justify-center scroll-mb-80 bg-primaryLight border border-primaryColor rounded-full mx-auto mb-4 lg:mb-8" data-aos="zoom-in" data-aos-delay="100">{step}</div>
      <h4 className="text-base max-w-[1094px]  mx-auto lg:w-full leading-[20px] lg:text-[22px] text-center font-semibold lg:leading-[43px]" data-aos="fade-In" data-aos-delay="200">
        {text} <span className="text-headingColor2">{highlitedText}</span>
      </h4>
    </div>
  );
}

export default SupporterStep;
