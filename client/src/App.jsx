import React from "react";
import AppRoutes from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      {/* All app routes */}
      <AppRoutes />

      {/* GLOBAL TOAST (always visible, fixed position, not clipped) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover
        closeOnClick
        newestOnTop
        draggable
      />
    </>
  );
};

export default App;
