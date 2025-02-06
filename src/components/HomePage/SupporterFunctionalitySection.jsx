import React from "react";
import SupporterStep from "./homeComponents/SupporterStep";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { Link } from "react-router-dom";

function SupporterFunctionalitySection() {
  const stepData = [
    {
      id: 1,
      stepNum: "01",
      normalText: "Allow your supporters to make one off donations to show",
      highlitedText: "their support your work.",
    },
    {
      id: 2,
      stepNum: "02",
      normalText: "Offer monthly subscriptions for exclusive",
      highlitedText: "updates from you.",
    },
    {
      id: 3,
      stepNum: "03",
      normalText: "You get paid instantly to your bank account.",
      highlitedText: "No more 30-day delays.",
    },
    {
      id: 4,
      stepNum: "04",
      normalText:
        "With just a 3.5% platform fee, you get to keep more  of your money ",
      highlitedText: "compared to other platforms. (Stripe fees also apply).",
    },
  ];
  return (
    <section className="pt-[60px] lg:pt-[120px] pb-[67px]">
      <div className="conainer">
        <div>
          <h3
            className="text-[24px] leading-[32px] lg:text-[48px] mb-14 font-semibold lg:leading-[64px] lg:w-[1094px] mx-auto text-headingColor text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            All the functionality you need to{" "}
            <span className="text-headingColor2">
              generate revenue from supporters.
            </span>
          </h3>
          <div>
            {stepData.map((step) => (
              <div key={step.id}>
                <SupporterStep
                  step={step.stepNum}
                  highlitedText={step.highlitedText}
                  text={step.normalText}
                />
              </div>
            ))}
          </div>
          <div className="w-fit mx-auto mt-10 lg:mt-[60px] lg:mb-[68px]">
            <div data-aos="fade-up">
              <Link to={"/createaccount"}>
                <ButtonPrimary text="Start my page — It’s free" />
              </Link>
            </div>
            <p className="text-sm font-medium mt-4" data-aos="fade-up" data-aos-delay="100">
              It’s free, and takes less than a minute.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupporterFunctionalitySection;
