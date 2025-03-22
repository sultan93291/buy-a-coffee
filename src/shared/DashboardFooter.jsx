import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useNavigate } from "react-router-dom";

function DashboardFooter() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/login");
  };
  return (
    <div className="  flex-col gap-4 flex items-center w-full  lg:justify-between justify-center ">
      <div className="max-w-[450px]">
        <button
          onClick={() => {
            handleRedirect();
          }}
          type="submit"
          className="text-center w-full mt-8"
        >
          <ButtonPrimary text={"Start my page -it's free"} />
        </button>
      </div>
      <h4 className="text-textColor  lg:text-base font-medium text-sm">
        support@giftacoffee.com
      </h4>
    </div>
  );
}

export default DashboardFooter;
