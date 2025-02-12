import { NavLink } from "react-router-dom";

function CommonLink({ Icon, path, navName, isLogOut }) {
  return (
    <NavLink
      to={isLogOut ? null : path}
      className={({ isActive }) =>
        `flex items-center gap-2 w-full px-6 py-3 rounded-xl border ${
          isActive && !isLogOut
            ? "border-[#D0FF71] bg-[#FBFFF1] text-[#82B440]"
            : "bg-transparent border-transparent"
        } `
      }
    >
      <Icon size={24} />
      <h4 className="font-medium text-black">{navName}</h4>
    </NavLink>
  );
}

export default CommonLink;
