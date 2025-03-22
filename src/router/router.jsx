import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import CreateAccount from "../Pages/CreateAccount";
import StepsSignupPage from "../Pages/StepsSignupPage";
import DashbaordLayout from "../layout/DashbaordLayout";
import HompePage from "../Pages/dashboardPages/HomePage/HompePage";
import MyPage from "../Pages/dashboardPages/MyPage/MyPage";
import Dontaions from "@/Pages/dashboardPages/Donations/Dontaions";
import Explore from "@/Pages/dashboardPages/Explore/Explore";
import Followers from "@/Pages/dashboardPages/Followers/Followers";
import Following from "@/Pages/dashboardPages/Following/Following";
import Membership from "@/Pages/dashboardPages/Membership/Membership";
import MyAccount from "@/Pages/dashboardPages/MyAccount/MyAccount";
import Payouts from "@/Pages/dashboardPages/Payouts/Payouts";
import Support from "@/Pages/dashboardPages/Support/Support";
import CreatorProfilePage from "@/Pages/dashboardPages/Explore/CreatorProfilePage";
import PrivateRouteProtector from "@/RouteProtector/PrivateRouteProtector/PrivateRouteProtector";
import PublicRouteProtector from "@/RouteProtector/PublicRouteProtector/PublicRouteProtector";
import SuccessPage from "@/Pages/SuccessPage";
import ForgotPass from "@/Pages/ForgotPass";
import VerifyOtp from "@/Pages/VerifyOtp";
import ChangePassword from "@/Pages/ChangePassword";
import PaymentSuccessPage from "@/Pages/PaymentSuccessPage";
import paymentErrorPage from "../Pages/PaymentErrorPage";
import PaymentErrorPage from "../Pages/PaymentErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRouteProtector>
        <Layout />
      </PublicRouteProtector>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <PublicRouteProtector>
            <LoginPage />
          </PublicRouteProtector>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRouteProtector>
            <SignUpPage />
          </PublicRouteProtector>
        ),
      },
      {
        path: "/createaccount",
        element: (
          <PublicRouteProtector>
            <CreateAccount />
          </PublicRouteProtector>
        ),
      },
      {
        path: "/forgot-pass",
        element: (
          <PublicRouteProtector>
            <ForgotPass />
          </PublicRouteProtector>
        ),
      },
      {
        path: "/verify-otp",
        element: (
          <PublicRouteProtector>
            <VerifyOtp />
          </PublicRouteProtector>
        ),
      },
      {
        path: "/change-password",
        element: (
          <PublicRouteProtector>
            <ChangePassword />
          </PublicRouteProtector>
        ),
      },
      {
        path: "/signupsteps",
        element: (
          <PublicRouteProtector>
            <StepsSignupPage />
          </PublicRouteProtector>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRouteProtector>
        <DashbaordLayout />
      </PrivateRouteProtector>
    ),
    children: [
      {
        path: "home",
        element: <HompePage></HompePage>,
      },
      {
        path: "my-page",
        element: <MyPage></MyPage>,
      },
      {
        path: "/donations",
        element: <Dontaions></Dontaions>,
      },
      {
        path: "/explore",
        element: <Explore></Explore>,
      },
      {
        path: "/followers",
        element: <Followers></Followers>,
      },
      {
        path: "/following",
        element: <Following></Following>,
      },
      {
        path: "/membership",
        element: <Membership></Membership>,
      },
      {
        path: "/my-account",
        element: <MyAccount></MyAccount>,
      },
      {
        path: "/payouts",
        element: <Payouts></Payouts>,
      },
      {
        path: "/support",
        element: <Support></Support>,
      },
      {
        path: "/:creatorId",
        element: <CreatorProfilePage></CreatorProfilePage>,
      },
      {
        path: "/account-connect-successfull",
        element: <SuccessPage />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccessPage />,
      },
      {
        path: "/payment-error",
        element: <PaymentErrorPage />,
      },
    ],
  },
]);

export default router;
