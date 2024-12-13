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
import YourExpense from "./Components/YourExpenses/yourExpenses"
import YourPieChart from "./Components/YourChart/yourPieChart"
import { DarkModeProvider } from "./Components/DarkMode/darkModeContext"
import DarkMode from "./Components/DarkMode/darkMode"
import ExpensesImage from "./Components/Expenses-Image/expensesImages"
import Dashboard from "./Components/Dashboard/dashbord"

function App() {
  return (
    <DarkModeProvider>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        {/* Wrap your whole app with DarkModeProvider */}
        <AuthProvider>
          <AppContent />
        </AuthProvider>
        <DarkMode />
      </div>
    </DarkModeProvider>
  )
}

const AppContent = () => {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Only show navbar if user is logged in and not on login/register pages */}
      {user &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && <ExpenseNavbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/expenses"
          element={<PrivateRoute element={<Expenses />} />}
        />
        <Route
          path="/yourExpense"
          element={<PrivateRoute element={<YourExpense />} />}
        />
        <Route
          path="/manageByImages"
          element={<PrivateRoute element={<ExpensesImage />} />}
        />
        <Route
          path="/yourChart"
          element={<PrivateRoute element={<YourPieChart />} />}
        />
        <Route
          path="/chart/line"
          element={<PrivateRoute element={<Chart />} />}
        />
        <Route
          path="/chart/pie"
          element={<PrivateRoute element={<PieChartPage />} />}
        />
        <Route
          path="/Dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
      </Routes>
    </div>
  )
}

export default App
