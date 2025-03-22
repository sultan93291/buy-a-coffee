import { AuthContext } from "@/provider/AuthContextProvider";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import PaymnetCancel from "../assets/images/paymentCancel.webp";

const PaymentErrorPage = () => {
  const navigate = useNavigate();
  const { fetchData } = useContext(AuthContext);
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center ">
      <div className="flex flex-col gap-y-5 items-center ">
        <div className="w-full h-full">
          <img
            className="w-[250px] h-[250px] md:h-[400px] md:w-[400px] object-cover"
            src={PaymnetCancel}
            alt="not found"
          />
        </div>

        <h2 className=" text-[18px] xl:text-2xl font-semibold text-headingColor  ">
          Payment Cancelled{" "}
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

export default PaymentErrorPage;




