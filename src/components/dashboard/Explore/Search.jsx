import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";


function Search({ onSearch, searchTerm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    onSearch(data.creatorSearch);
    console.log(data.creatorSearch);
  };
  const handleSearchOnChange = e => {
    onSearch(e.target.value);
  };

  const [hovered, setHovered] = useState(false);

  const BtnColor = useSelector(state => state.btnReducer.btnColor);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor; // If BtnColor is undefined, use the default color

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor, // Transparent on hover, btn color otherwise
    border: `2px solid ${hovered ? buttonColor : "transparent"}`, // Border is always there, but only shows color on hover
    color: hovered ? buttonColor : "#000", // Text color on hover and default text color (black)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <input
          {...register("creatorSearch")}
          className="lg:py-5 py-3 pl-[60px] pr-[110px] lg:pr-3 text-sm border border-[rgba(113,113,113,0.12)] rounded-[100px] lg:text-base text-headingColor w-full focus:outline-none"
          type="text"
          name="creatorSearch"
          id="creatorSearch"
          value={searchTerm}
          placeholder="Search creators on gift a coffee"
          onChange={handleSearchOnChange}
        />
        <button
          style={buttonStyles}
          type="submit"
          className="absolute py-[8px] text-sm lg:text-base lg:py-[10px] px-4 rounded-[100px]  font-bold text-headingColor top-1/2 translate-y-[-50%] right-3"
        >
          Search
        </button>
        <p className="absolute top-1/2 translate-y-[-50%] left-5 text-[26px]">
          <IoSearchOutline />
        </p>
      </div>
    </form>
  );
}

export default Search;
