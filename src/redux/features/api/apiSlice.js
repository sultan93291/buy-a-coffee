import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import { data } from "autoprefixer";

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

    logOutProfileIntent: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
        includeToken: true,
      }),
    }),

    updateProfileIntent: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/update-my-account`,
        method: "POST",
        data: updatedData,
        includeToken: true,
      }),
    }),

    updatePasswordIntent: builder.mutation({
      query: updatedPassword => ({
        url: `/change-password`,
        method: "POST",
        data: updatedPassword,
        includeToken: true,
      }),
    }),

    deleteUserAccount: builder.mutation({
      query: () => ({
        url: `/user-delete`,
        method: "DELETE",
        includeToken: true,
      }),
    }),

    connectStripeAccount: builder.mutation({
      query: ({ email }) => ({
        url: `/stripe/create-account`,
        method: "POST",
        data: { email: email },
        includeToken: true,
      }),
    }),

    editUserProfileInfo: builder.mutation({
      query: data => ({
        url: `/edit-profile`,
        method: "POST",
        data: {
          data,
        },
      }),
    }),

    editFeatureImgAndBio: builder.mutation({
      query: ({ data }) => ({
        url: `/feature-image`,
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
  useLogOutProfileIntentMutation,
  useUpdateProfileIntentMutation,
  useUpdatePasswordIntentMutation,
  useDeleteUserAccountMutation,
  useConnectStripeAccountMutation,
  useEditUserProfileInfoMutation,
  useEditFeatureImgAndBioMutation,
} = apiSlice;

// all okay ready to go again...
