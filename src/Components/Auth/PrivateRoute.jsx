import React from "react"
import { Route, Navigate, Outlet } from "react-router-dom"
import { auth } from "../firebase"

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = auth.currentUser

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
