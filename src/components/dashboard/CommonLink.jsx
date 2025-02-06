import { NavLink } from "react-router-dom"


function CommonLink({Icon, path, navName}) {
  return (
    <NavLink
    to={path}
    className={({ isActive }) =>
      isActive
        ? "border-[#D0FF71] flex items-center text-[#82B440] gap-2 rounded-xl bg-[#FBFFF1] border w-full  px-6 py-3 "
        : "bg-transparent border-transparent border w-full flex items-center gap-2 px-6 py-3 "
    }
  >
    <Icon size={24} />
    <h4 className="font-medium text-black">{navName}</h4>
  </NavLink>
  )
}

export default CommonLink