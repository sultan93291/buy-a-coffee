import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";

function SharePopup({ isProfilePage }) {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const location = useLocation();
  const fullLocation = `${window.location.origin}/dashboard/explore/creator/${loggedInUser.id}`;
  // const [copySuccess, setCopySuccess] = useState('')

  const copyToClipboard = () => {
    const urlToCopy = fullLocation; // You can replace this with dynamic content
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(err => {
        toast("Failed to copy!"), { position: "center" };
        console.error("Could not copy text: ", err);
      });
  };

  const handleTwitterRedirect = () => {
    const url = fullLocation; // Replace with your actual URL
    const text = "Check this out!"; // Replace with your custom message
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;

    window.open(twitterShareUrl, "_blank");
  };

  const handleFacebookRedirect = () => {
    const url = fullLocation; // Replace with your actual URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;

    window.open(facebookShareUrl, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger className="w-fit">
        {isProfilePage ? (
          <div className="bg-white cursor-pointer border rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="21"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M2 21.75C1.94281 21.75 1.88506 21.7435 1.82787 21.7303C1.66346 21.6913 1.51699 21.598 1.41214 21.4655C1.30728 21.333 1.25016 21.169 1.25 21C1.25 14.1848 2.11212 8.51666 12.5 8.25885V3.00003C12.5 2.85422 12.5425 2.71157 12.6224 2.58954C12.7022 2.46752 12.8159 2.37141 12.9495 2.31297C13.0831 2.25454 13.2308 2.23632 13.3746 2.26054C13.5184 2.28476 13.652 2.35037 13.7591 2.44935L23.5091 11.4493C23.6628 11.5905 23.75 11.7906 23.75 12C23.75 12.2095 23.6628 12.4095 23.5091 12.5509L13.7591 21.5509C13.6521 21.6503 13.5184 21.7161 13.3745 21.7404C13.2305 21.7646 13.0826 21.7461 12.9491 21.6872C12.8155 21.6287 12.702 21.5325 12.6222 21.4105C12.5425 21.2884 12.5 21.1458 12.5 21V15.7588C5.37425 15.9295 4.0595 18.5582 2.67088 21.3355C2.60861 21.4601 2.51286 21.5649 2.39436 21.6381C2.27586 21.7113 2.1393 21.7501 2 21.75ZM13.25 14.25C13.6646 14.25 14 14.5855 14 15V19.2868L21.8941 12L14 4.71322V9.00003C14 9.4146 13.6646 9.75003 13.25 9.75003C4.96475 9.75003 3.18069 12.9544 2.82987 18.0726C4.38331 15.9859 7.031 14.25 13.25 14.25Z"
                fill="#1F2022"
              />
            </svg>
          </div>
        ) : (
          <div className="flex cursor-pointer items-center bg-btnColor gap-4 lg:px-8 px-4 py-3 rounded-full text-white">
            <h4 className="hidden lg:flex">Share Page</h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M1.25 18.625C1.20234 18.625 1.15422 18.6196 1.10656 18.6086C0.969548 18.5761 0.847492 18.4984 0.760113 18.388C0.672733 18.2775 0.625133 18.1409 0.625 18C0.625 12.3207 1.34344 7.59724 10 7.38239V3.00005C10 2.87853 10.0355 2.75966 10.102 2.65797C10.1685 2.55628 10.2632 2.47619 10.3745 2.4275C10.4859 2.37881 10.609 2.36362 10.7288 2.3838C10.8486 2.40399 10.96 2.45866 11.0492 2.54114L19.1742 10.0411C19.3023 10.1588 19.375 10.3255 19.375 10.5C19.375 10.6746 19.3023 10.8413 19.1742 10.9591L11.0492 18.4591C10.9601 18.5419 10.8487 18.5968 10.7287 18.617C10.6088 18.6372 10.4855 18.6218 10.3742 18.5727C10.263 18.5239 10.1683 18.4438 10.1019 18.3421C10.0354 18.2404 10 18.1215 10 18V13.6324C4.06187 13.7746 2.96625 15.9652 1.80906 18.2796C1.75718 18.3834 1.67738 18.4708 1.57863 18.5318C1.47988 18.5928 1.36608 18.6251 1.25 18.625ZM10.625 12.375C10.9705 12.375 11.25 12.6546 11.25 13V16.5724L17.8284 10.5L11.25 4.4277V8.00005C11.25 8.34552 10.9705 8.62505 10.625 8.62505C3.72062 8.62505 2.23391 11.2954 1.94156 15.5605C3.23609 13.8216 5.4425 12.375 10.625 12.375Z"
                fill="white"
              />
            </svg>
          </div>
        )}
        <Toaster />
      </DialogTrigger>
      <DialogContent className="h-fit ">
        <DialogHeader>
          <DialogTitle className="p-0 border-b pb-4">
            <div className="relative">
              <h3 className="text-2xl  font-semibold text-textDark text-center ">
                Share’s page
              </h3>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="py-4 flex justify-center flex-col items-center space-y-4">
          <input
            value={fullLocation}
            type="text"
            readOnly
            name=""
            className="px-4 py-4 focus:outline-none w-full border rounded-full bg-gray-50 "
            id=""
          />
          <div className="flex flex-row items-center gap-x-4 ">
            <FaSquareXTwitter
              onClick={() => {
                handleTwitterRedirect();
              }}
              className="text-[22px] cursor-pointer "
            />
            <FaFacebookSquare
              onClick={() => {
                handleFacebookRedirect();
              }}
              className="text-[22px] text-[#1877F2] cursor-pointer "
            />
          </div>
          {/* <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primaryColor text-textDark font-semibold text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M20 16.5C20.2652 16.5 20.5196 16.3946 20.7071 16.2071C20.8946 16.0196 21 15.7652 21 15.5V4.5C21 4.23478 20.8946 3.98043 20.7071 3.79289C20.5196 3.60536 20.2652 3.5 20 3.5H9C8.73478 3.5 8.48043 3.60536 8.29289 3.79289C8.10536 3.98043 8 4.23478 8 4.5V6.5H10V5.5H19V14.5H18V16.5H20Z"
                fill="#222E48"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 8.5C3.73478 8.5 3.48043 8.60536 3.29289 8.79289C3.10536 8.98043 3 9.23478 3 9.5V20.5C3 20.7652 3.10536 21.0196 3.29289 21.2071C3.48043 21.3946 3.73478 21.5 4 21.5H15C15.2652 21.5 15.5196 21.3946 15.7071 21.2071C15.8946 21.0196 16 20.7652 16 20.5V9.5C16 9.23478 15.8946 8.98043 15.7071 8.79289C15.5196 8.60536 15.2652 8.5 15 8.5H4ZM5 19.5V10.5H14V19.5H5Z"
                fill="#222E48"
              />
            </svg>
            Copy to Clipboard
          </button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SharePopup;
