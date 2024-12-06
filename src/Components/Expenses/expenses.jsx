import React, { useState, useEffect } from "react"
import ExpensesTable from "./expensesTable"
import Dropdown from "./expensesDropDown"

const App = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetch("http://localhost:3000/api/user.json").then(
        (res) => res.json()
      )
      const expenses = await fetch(
        "http://localhost:3000/api/expenses.json"
      ).then((res) => res.json())
      const budgets = await fetch("http://localhost:3000/api/budget.json").then(
        (res) => res.json()
      )
      const categories = await fetch(
        "http://localhost:3000/api/categories.json"
      ).then((res) => res.json())
      const paymentMethods = await fetch(
        "http://localhost:3000/api/paymentMethod.json"
      ).then((res) => res.json())

      setCategories(categories)
      setPaymentMethods(paymentMethods)

      const normalizedData = users.map((user) => ({
        ...user,
        expenses: expenses
          .filter((expense) => expense.userId === user.userId)
          .map((expense) => ({
            ...expense,
            userName: user.name,
            budget: budgets.find((budget) => budget.userId === user.userId)
              ?.categories[expense.category],
          })),
      }))

      const mergedExpenses = normalizedData.flatMap((user) =>
        user.expenses.map((expense) => ({
          userName: user.name,
          category: expense.category,
          amount: expense.amount,
          date: expense.date,
          description: expense.description,
          paymentMethod: expense.payment_method,
          budget: expense.budget || "N/A",
        }))
      )

      setData(mergedExpenses)
      setFilteredData(mergedExpenses)
    }

    fetchData()
  }, [])

  const handleFilterChange = (category, paymentMethod) => {
    const filtered = data.filter((expense) => {
      return (
        (category ? expense.category === category : true) &&
        (paymentMethod ? expense.paymentMethod === paymentMethod : true)
      )
    })
    setFilteredData(filtered)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Expense Tracker</h1>
      <div className="flex gap-4 mb-6">
        <Dropdown
          options={categories}
          onChange={(e) => {
            setSelectedCategory(e.target.value)
            handleFilterChange(e.target.value, selectedPaymentMethod)
          }}
          placeholder="Select Category"
        />
        <Dropdown
          options={paymentMethods}
          onChange={(e) => {
            setSelectedPaymentMethod(e.target.value)
            handleFilterChange(selectedCategory, e.target.value)
          }}
          placeholder="Select Payment Method"
        />
      </div>
      <ExpensesTable expenses={filteredData} />
    </div>
  )
}

export default App
