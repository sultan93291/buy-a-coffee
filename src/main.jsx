import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./router/router";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center" // Toasts will appear at the top-right
        reverseOrder={false} // Order of toasts
        toastOptions={{
          duration: 3000, // Duration of the toast in milliseconds
          style: {
            background: "#fff", // Background color of the toast
            color: "#000", // Text color
            padding: "16px", // Padding for the toast
          },
        }}
      />
    </Provider>
  </StrictMode>
);
