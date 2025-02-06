import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import AosInit from "../aos/AosInit";
import UsernameProvider from "../provider/UsernameProvider";
import AuthStepFormProvider from "../provider/AuthStepFormProvider";

function Layout() {
  return (
    <AosInit>
      <UsernameProvider>
        <AuthStepFormProvider>
          <div>
            <Navbar />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </AuthStepFormProvider>
      </UsernameProvider>
    </AosInit>
  );
}

export default Layout;
