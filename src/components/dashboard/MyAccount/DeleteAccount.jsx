import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDeleteUserAccountMutation } from "@/redux/features/api/apiSlice";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "@/provider/AuthContextProvider";
import toast from "react-hot-toast";

function DeleteAccount() {
  const [deleteProfile, { data, error, isLoading, isSuccess }] =
    useDeleteUserAccountMutation();
  const [showDialog, setShowDialog] = useState(false);
  const [password, setpassword] = useState();

  const { fetchData } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    if (!password) {
      toast.error("Please enter your password!");
      return;
    } else {
      try {
        const response = await deleteProfile(password).unwrap(); // Unwrap the response to access the result

        if (response?.code === 200) {
          toast.success(response?.message || "Account deleted successfully!");
          console.log("Account deleted successfully:", response);
          localStorage.removeItem("token");
          fetchData();
        } else {
          throw new Error(response?.message || "Unexpected server response");
        }
      } catch (error) {
        console.error("Account deletion failed:", error);
        toast.error(
          error?.data?.message || "Failed to delete account. Please try again."
        );
      } finally {
        setShowDialog(false);
      }
    }
  };

  return (
    <div className="lg:flex items-center justify-between p-6 lg:p-[30px] bg-[#FAFAFA] rounded-[12px]">
      <div className="lg:w-[562px]">
        <h4 className="text-[20px] font-semibold mb-5 lg:mb-6">
          Delete account
        </h4>
        <p className="text-[18px] font-medium text-paraDark">
          Your account and your personal data will be permanently deleted. This
          action is irreversible.
        </p>
      </div>

      <Dialog>
        <DialogTrigger
          onClick={() => {
            setShowDialog(true);
          }}
        >
          <button className="text-base py-3 px-6 mt-8 lg:mt-0 rounded-[70px] bg-[#FF5630] text-white font-bold">
            Delete
          </button>
        </DialogTrigger>
        {showDialog && (
          <DialogContent className="max-w-[760px] p-[60px]">
            <DialogHeader>
              <DialogTitle className="text-center text-[32px] text-[#3D464F] mb-8">
                Are you sure you want to delete your account?
              </DialogTitle>
              <DialogDescription></DialogDescription>
              <input
                placeholder="Enter Your password"
                type="text"
                className=" p-3 outline-none border-[1px] border-solid rounded-[12px] "
                value={password}
                onChange={e => {
                  setpassword(e.target.value);
                }}
              />
            </DialogHeader>
            <div>
              <div className="flex items-end justify-center gap-5 w-full">
                <button
                  onClick={() => {
                    setShowDialog(false);
                  }}
                  className="py-4 px-14 font-bold text-headingColor border border-[rgba(31,32,34,0.12)] rounded-[32px] bg-primaryColor"
                >
                  No
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    handleDeleteAccount();
                  }}
                  className="py-4 px-14 font-bold text-headingColor border border-[rgba(31,32,34,0.12)] rounded-[32px]"
                >
                  {isLoading ? (
                    <BeatLoader
                      size={10}
                      color={"#000"}
                      speedMultiplier={0.5}
                    />
                  ) : (
                    "Yes"
                  )}
                </button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default DeleteAccount;
