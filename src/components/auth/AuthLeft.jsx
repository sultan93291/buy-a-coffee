import authImg from "../../assets/images/auth.png";
import Logo from "../../assets/images/logo.svg";
import cImg1 from "../../assets/images/client1.png";
import cImg2 from "../../assets/images/client2.png";
import cImg3 from "../../assets/images/client3.png";
import cImg4 from "../../assets/images/client4.png";
import ratingStar from "../../assets/images/rating.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserName } from "@/redux/features/userDocSlice";

function AuthLeft() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-primaryLight min-h-screen rounded-tr-[20px] rounded-br-[20px] pt-8 pl-[30px] pb-[66px]">
      <div className="pl-[35px]">
        <Link
          onClick={e => {
            e.preventDefault();
            dispatch(setUserName(""));
            navigate("/")
            
          }}
          to={"/"}
          className="cursor-pointer"
        >
          <img src={Logo} alt="logo" />
        </Link>
        <p className="text-[18px] font-medium mt-2 text-headingColor">
          Welcome to giftacoffee
        </p>
      </div>
      <div>
        <img
          className="w-[636px] h-[636px] py-20"
          src={authImg}
          alt="authImg"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex">
          <img className="client-img mr-[-10px]" src={cImg1} alt="cImg1" />
          <img className="client-img mr-[-10px]" src={cImg2} alt="cImg1" />
          <img className="client-img mr-[-10px]" src={cImg3} alt="cImg1" />
          <img className="client-img mr-[-10px]" src={cImg4} alt="cImg1" />
        </div>
        <div>
          <p className="text-[20px] text-headingColor mb-1">
            Trusted by +700 Clients Reviews
          </p>
          <div className="flex items-center gap-4">
            <img src={ratingStar} alt="" />
            <p className="text-[20px]">4.8/05</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLeft;
