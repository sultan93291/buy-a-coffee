import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

// Backend base URL from environment variables
const SiteURl = import.meta.env.VITE_SERVER_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: SiteURl }),
  endpoints: builder => ({
    // ✅ Register User API Call
    registerUserIntent: builder.mutation({
      query: data => ({
        url: `/register`,
        method: "POST",
        data: data, // Sending user data
      }),
    }),

    // ✅ Login User API Call
    loginUserIntent: builder.mutation({
      query: ({ email, password }) => ({
        url: `/login`,
        method: "POST",
        data: { email, password }, // Sending credentials
      }),
    }),

    checkUserNameAvialabilitiesIntent: builder.mutation({
      query: ({ userName }) => ({
        url: "/check-user-name",
        method: "POST",
        data: { user_name: userName },
      }),
    }),

    completeProfileIntent: builder.mutation({
      query: data => ({
        url: "/choose-your-profile",
        method: "POST",
        data: data,
        includeToken: true,
      }),
    }),
  }),
});

// ✅ Correct Hook Exports
export const {
  useRegisterUserIntentMutation,
  useLoginUserIntentMutation,
  useCheckUserNameAvialabilitiesIntentMutation,
  useCompleteProfileIntentMutation,
} = apiSlice;

// all okay ready to go