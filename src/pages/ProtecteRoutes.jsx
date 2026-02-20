import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtecteRoutes = () => {
  if (localStorage.getItem("token")) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default ProtecteRoutes;
