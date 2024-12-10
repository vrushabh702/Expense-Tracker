// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";  // Using the auth context to get the current user

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();  // Check if user is authenticated

  // If user is authenticated, render the element, otherwise redirect to login
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
