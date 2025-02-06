import Searchbar from "./homeComponents/Searchbar";
import HeroImg from "../../assets/images/hero-Illustartion.png";
import planeShape from "../../assets/images/plane.png";




function HeroSection() {
  return (
    <section className="bg-heroColor pt-[92px] md:pt-[184px] relative">
      <div className="container">
        <div className="text-center">
          <h1 className="text-[32px] leading-[42px] lg:text-[72px] font-bold lg:leading-[95px] text-headingColor" data-aos="fade-up">
            A supporter is worth a{" "}
            <span className="text-headingColor2">thousand followers</span>
          </h1>
          <p className="text-sm leading-[23px] md:text-base lg:text-[18px] lg:leading-[29px] text-paraDark lg:w-[869px] mx-auto mt-3 md:mt-4 lg:mt-6" data-aos="fade-up" data-aos-delay="100">
            A platform that allows creators, athletes, musicians, podcasters,
            charities and more to receive support and donations from their fans
            and followers.
          </p>
          <div className="lg:w-[687px] mx-auto mt-1 md:mt-12" data-aos="fade-up" data-aos-delay="200">
            <Searchbar webUrl="giftacoffee.com/" btnText="Start my page" />
          </div>
          <p className="text-sm md:text-[20px] mt-2 md:mt-6" data-aos="fade-up" data-aos-delay="300">
            It’s free, and takes less than a minute to setup!
          </p>
        </div>
      </div>
      <div className="relative md:top-[-50px]" data-aos="fade-up" data-aos-delay="300">
        <img className="h-[140px] mt-5 md:mt-0 md:h-[782px] w-full" src={HeroImg} alt="" />
      </div>
      <div className="hidden md:block absolute top-[26%] right-[13%]"  data-aos="fade-up" data-aos-delay="300">
        <img className="h-[107px] w-[393px]" src={planeShape} alt="" />
      </div>
    </section>
  );
}

export default HeroSection;
