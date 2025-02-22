import Searchbar from "./homeComponents/Searchbar";
import HeroImg from "../../assets/images/hero-Illustartion.png";
import signUp from "../../assets/images/signUp.png";
import planeShape from "../../assets/images/plane.png";
import { useSelector } from "react-redux";

function HeroSection() {
  const loggedInUserData = useSelector(
    state => state.userDocReducer.loggedInuser
  );

  console.log(loggedInUserData);

  return (
    <section className="bg-heroColor pt-[92px] md:pt-[184px] relative">
      <div className="container">
        <div className="text-center flex flex-col items-center  ">
          <div className="text-center flex items-center max-w-[649px]  ">
            <h1
              className="text-[32px] leading-[132%] tracking-[-0.5%] lg:text-[50px] font-bold lg:leading-[95px]  text-headingColor"
              data-aos="fade-up"
            >
              Make money doing{" "}
              <span className="text-headingColor2">what you love</span>
            </h1>
          </div>
          <p
            className="text-sm leading-[23px] md:text-base lg:text-[18px] lg:leading-[160%] font-semibold text-text_dark lg:w-[869px] mx-auto mt-3 md:mt-4 lg:mt-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            A platform that allows creators, athletes, musicians, podcasters,
            charities and more to receive support and donations from their fans
            and followers.
          </p>
          <div
            className=" w-[250px] lg:w-[687px] mx-auto mt-1 md:mt-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Searchbar webUrl="giftacoffee.com/" btnText="Start my page" />
          </div>
          <p
            className="text-sm md:text-[20px] mt-2 md:mt-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            It’s free, and takes less than a minute to setup!
          </p>
        </div>
      </div>
      <div
        className="relative md:top-[50px] xl:top-[-50px] "
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <img
          className=" h-full w-full object-contain  "
          src={HeroImg}
          alt=""
        />
      </div>
      <div
        className="hidden md:block absolute top-[26%] right-[13%]"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <img
          className="h-[107px] object-cover w-[393px]"
          src={planeShape}
          alt=""
        />
      </div>
    </section>
  );
}

export default HeroSection;
