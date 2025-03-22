import { AuthContext } from "@/provider/AuthContextProvider";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PaymnetSuccess from "../assets/images/paymentSucces.svg";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { fetchData } = useContext(AuthContext);
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center ">
      <div className="flex flex-col gap-y-3 items-center ">
        <img
          className=" w-[250px] h-[250px] md:h-[500px] md:w-[500px] object-cover "
          src={PaymnetSuccess}
          alt="not found"
        />
        <h2 className=" text-[18px] xl:text-2xl font-semibold text-headingColor  ">
          Payment successful{" "}
        </h2>
        <div
          onClick={() => {
            fetchData();
            navigate("/explore");
          }}
        >
          <ButtonPrimary text={"Back to Dashboard"} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
