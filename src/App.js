import logo from "./logo.svg"
import "./App.css"
import { Button, Navbar } from "react-bootstrap"
// import { Route, Router, Routes } from "react-router-dom"
import { Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/home"
import Expenses from "./Components/Expenses/expenses"
import Chart from "./Components/Chart/chart"

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </div>
  )
}

export default App
