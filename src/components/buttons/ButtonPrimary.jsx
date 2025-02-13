import React, { useState } from "react";
import { useSelector } from "react-redux";

function ButtonPrimary({ fontSize = "16px", text, type }) {
  const BtnColor = useSelector(state => state.btnReducer.btnColor);
  const [hovered, setHovered] = useState(false);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor; // If BtnColor is undefined, use the default color

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor, // Transparent on hover, btn color otherwise
    border: `2px solid ${hovered ? buttonColor : "transparent"}`, // Border is always there, but only shows color on hover
    color: hovered ? buttonColor : "#000", // Text color on hover and default text color (black)
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`primary-button px-6 ${
        type === "small" ? "py-3" : "py-3 lg:py-4"
      }  rounded-[100px] text-headingColor border   font-bold duration-200 ease-out hover:bg-transparent  `}
      style={{
        ...buttonStyles,
        fontSize: fontSize,
      }}
    >
      {text}
    </div>
  );
}

export default ButtonPrimary;
