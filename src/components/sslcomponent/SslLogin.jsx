import React from "react";

function SslLogin({ children }) {
  return (
    <div className="p-4 lg:p-[18px] text-sm md:text-[18px] font-medium border border-[rgba(0,0,0,0.12)] flex items-center cursor-pointer justify-center gap-2 md:gap-3 rounded-[12px]">
      {children}
    </div>
  );
}

export default SslLogin;
