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
    path: "/dashboard",
    element: (
      <PrivateRouteProtector>
        <DashbaordLayout />
      </PrivateRouteProtector>
    ),
    children: [
      {
        path: "/dashboard/home",
        element: <HompePage></HompePage>,
      },
      {
        path: "/dashboard/my-page",
        element: <MyPage></MyPage>,
      },
      {
        path: "/dashboard/donations",
        element: <Dontaions></Dontaions>,
      },
      {
        path: "/dashboard/explore",
        element: <Explore></Explore>,
      },
      {
        path: "/dashboard/followers",
        element: <Followers></Followers>,
      },
      {
        path: "/dashboard/following",
        element: <Following></Following>,
      },
      {
        path: "/dashboard/membership",
        element: <Membership></Membership>,
      },
      {
        path: "/dashboard/my-account",
        element: <MyAccount></MyAccount>,
      },
      {
        path: "/dashboard/payouts",
        element: <Payouts></Payouts>,
      },
      {
        path: "/dashboard/support",
        element: <Support></Support>,
      },
      {
        path: "/dashboard/explore/creator/:creatorId",
        element: <CreatorProfilePage></CreatorProfilePage>,
      },
    ],
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
]);

export default router;
