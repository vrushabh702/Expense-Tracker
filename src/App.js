import logo from "./logo.svg"
import "./App.css"
import { Button, NavbarToggle } from "react-bootstrap"
// import { Route, Router, Routes } from "react-router-dom"
import { Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/home"
import Expenses from "./Components/Expenses/expenses"
import Chart from "./Components/Chart/chart"
import ExpenseNavbar from "./Components/navbar/expenseNavbar"
import PieChartPage from "./Components/PieChart/pieChart"
import Login from "./Components/Login/login"
import PrivateRoute from "./Components/Auth/PrivateRoute"
import Register from "./Components/Register/register"
import { auth } from "./Components/firebase"

function App() {
  // const isAuthenticated = auth.currentUser
  return (
    <div>
      {/* {<ExpenseNavbar /> && isAuthenticated} */}
      <ExpenseNavbar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/chart/line" element={<Chart />} />
        <Route path="/chart/pie" element={<PieChartPage />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/chart/line" element={<Chart />} />
          <Route path="/chart/pie" element={<PieChartPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
