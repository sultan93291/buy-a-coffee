import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import userDocSlice from "./features/userDocSlice";
import BtnColorSlice from "./features/BtnColorSlice";

export const store = configureStore({
  reducer: {
    userDocReducer: userDocSlice,
    btnReducer: BtnColorSlice,
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add API middleware
});

export default store;
