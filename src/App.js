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

function App() {
  return (
    <div>
      <ExpenseNavbar></ExpenseNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/chart/line" element={<Chart />} />
        <Route path="/chart/pie" element={<PieChartPage />} />
      </Routes>
    </div>
  )
}

export default App
