// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for user data
const initialState = {
  // Ensure we handle the case where the color might not be found in localStorage
  btnColor: localStorage.getItem("btnColor") , // Default color if not set in localStorage
};

// Create slice with actions and reducers
const btnColorSlice = createSlice({
  name: "btnColorSlice",
  initialState,
  reducers: {
    SetThemeColor: (state, action) => {
      // Store the color in localStorage
      localStorage.setItem("btnColor", action.payload);
      state.btnColor = action.payload; // Update state with the new color
    },
    removeBtnColor: state => {
      // Remove the color from localStorage and reset state
      localStorage.removeItem("btnColor");
      state.btnColor = ""; // Clear the button color in state
    },
  },
});

// Export actions
export const { SetThemeColor, removeBtnColor } = btnColorSlice.actions;

// Export reducer to be added to the store
export default btnColorSlice.reducer;
