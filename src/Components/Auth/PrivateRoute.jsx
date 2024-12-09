import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext" // Use the context to get authentication state

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth() // Check if user is authenticated

  // If user is not authenticated, redirect to login page
  return user ? element : <Navigate to="/login" />
}

export default PrivateRoute
