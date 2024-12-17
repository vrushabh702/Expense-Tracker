import React from "react"
import { DarkModeProvider } from "../DarkMode/darkModeContext"
import DarkMode from "../DarkMode/darkMode"
import useFetchData from "./hooks/useFetchData"

function DarkModeTest() {
  const { mergedExpenses, loading, error } = useFetchData()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Expenses List Coming Straight From DataBase MYSQL</h1>
      <ul>
        {mergedExpenses.map((expense, index) => (
          <li key={index}>
            <p>Name: {expense.userName}</p>
            <p>Category: {expense.category}</p>
            <p>
              Amount: {expense.amount} {expense.currency}
            </p>
            <p>Date: {expense.date}</p>
            <p>Description: {expense.description}</p>
            <p>Payment Method: {expense.paymentMethod}</p>
            <p>Budget: {expense.budget}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DarkModeTest
