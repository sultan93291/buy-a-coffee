import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

function DeleteAccount() {
  return (
    <div className="lg:flex items-center justify-between p-6 lg:p-[30px] bg-[#FAFAFA] rounded-[12px]">
      <div className="lg:w-[562px]">
        <h4 className="text-[20px] font-semibold mb-5 lg:mb-6">Delete account</h4>
        <p className="text-[18px] font-medium text-paraDark">
          Your account and your personal data will be permanently deleted. This
          action is irreversible.
        </p>
      </div>

      <Dialog>
        <DialogTrigger>
          <button className="text-base py-3 px-6 mt-8 lg:mt-0 rounded-[70px] bg-[#FF5630] text-white font-bold">
            Delete
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[760px] p-[60px]">
          <DialogHeader>
            <DialogTitle className="text-center text-[32px] text-[#3D464F] mb-8">
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <DialogClose className="flex items-end justify-center gap-5 w-full">
              <button className="py-4 px-14 font-bold text-headingColor border border-[rgba(31,32,34,0.12)] rounded-[32px] bg-primaryColor">
                No
              </button>
              <button className="py-4 px-14 font-bold text-headingColor border border-[rgba(31,32,34,0.12)] rounded-[32px]">
                Yes
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteAccount;
