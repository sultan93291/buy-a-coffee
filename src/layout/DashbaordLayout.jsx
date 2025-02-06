import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import MainContextProvider from "@/provider/MainContextProvider";
import AosInit from "@/aos/AosInit";
import DashboardFooter from "@/shared/DashboardFooter";

function DashbaordLayout() {
  return (
    <MainContextProvider>
      <AosInit>
        <div className="flex w-full ">
          <div className="w-[320px] lg:block hidden fixed border-r h-screen">
            <Sidebar></Sidebar>
          </div>
          <div className="flex flex-col lg:ml-[320px] m-0 w-full lg:w-full">
          <div  className="bg-[#FAFAFA] flex-1 min-h-screen p-4 lg:p-6">
            <Outlet></Outlet>
          </div>
          <div className=" p-4 lg:p-6 ">
            <DashboardFooter/>
          </div>
          </div>
        </div>
      </AosInit>
    </MainContextProvider>
  );
}

export default DashbaordLayout;
