// src/features/api/axiosBaseQuery.js
import axios from "axios";

/**
 * Axios base query function for RTK Query.
 * @param {Object} options - Axios options, like baseURL and default headers.
 */



const axiosBaseQuery =
  ({ baseUrl, defaultHeaders = {} } = {}) =>
  async ({
    url,
    method = "GET",
    data,
    params,
    headers = {},
    includeToken = false,
  }) => {
    try {
      // Get the token if required
      const token = includeToken ? localStorage.getItem("token") : null;

      // Check if the data is FormData and set headers accordingly
      const isFormData = data instanceof FormData;
      const finalHeaders = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }), // Remove Content-Type for FormData
        ...defaultHeaders,
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      // Make the request
      const response = await axios({
        url: `${baseUrl}${url}`,
        method,
        headers: finalHeaders,
        data: ["POST", "PUT", "PATCH"].includes(method.toUpperCase())
          ? data
          : undefined,
        params: ["GET", "DELETE"].includes(method.toUpperCase())
          ? params
          : undefined,
      });

      return { data: response.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status || 500,
          data:
            error.response?.data ||
            error.message ||
            "An unknown error occurred",
        },
      };
    }
  };


export default axiosBaseQuery;
