// src/store/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state for user data
const initialState = {
  userName: "",
};

// Create slice with actions and reducers
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

// Export actions
export const { setUserName } = userSlice.actions;

// Export reducer to be added to the store
export default userSlice.reducer;
