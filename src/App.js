import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import Home from "./Components/Home/home"
import Expenses from "./Components/Expenses/expenses"
import Chart from "./Components/Chart/chart"
import PieChartPage from "./Components/PieChart/pieChart"
import Login from "./Components/Login/login"
import Register from "./Components/Register/register"
import ExpenseNavbar from "./Components/navbar/expenseNavbar"
import { AuthProvider, useAuth } from "./Components/Auth/AuthContext"
import PrivateRoute from "./Components/Auth/PrivateRoute"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      {/* App content goes here */}
      <AppContent />
    </AuthProvider>
  )
}

const AppContent = () => {
  const { user } = useAuth() // Get the current user from the context
  const location = useLocation() // Get the current route

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Only show navbar if user is logged in and not on the login/register page */}
      {user &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && <ExpenseNavbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/expenses"
          element={<PrivateRoute element={<Expenses />} />}
        />
        <Route
          path="/chart/line"
          element={<PrivateRoute element={<Chart />} />}
        />
        <Route
          path="/chart/pie"
          element={<PrivateRoute element={<PieChartPage />} />}
        />
      </Routes>
    </div>
  )
}

export default App
