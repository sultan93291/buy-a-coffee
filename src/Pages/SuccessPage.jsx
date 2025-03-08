import React, { useContext } from "react";
import success from "../assets/images/success.jpg";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/provider/AuthContextProvider";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { fetchData } = useContext(AuthContext);
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center ">
      <div className="flex flex-col gap-y-3 items-center ">
        <img
          className=" w-[250px] h-[250px] md:h-[500px] md:w-[500px] object-cover "
          src={success}
          alt="not found"
        />
        <h2 className=" text-[18px] xl:text-2xl font-semibold text-headingColor  ">
          Account connected successfully{" "}
        </h2>
        <div
          onClick={() => {
            navigate("/dashboard/payouts");
            fetchData();
          }}
        >
          <ButtonPrimary text={"Back to Dashboard"} />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
