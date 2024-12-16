// PrivateRoute.js
import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext" // Using the auth context to get the current user

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth() // Check if user is authenticated

  if (user === null) {
    // Redirect to login if no user is found
    return <Navigate to="/login" />
  }

  return element
}

export default PrivateRoute
