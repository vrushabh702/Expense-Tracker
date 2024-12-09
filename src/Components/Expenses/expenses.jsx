import React, { useState, useEffect } from "react"
import ExpensesTable from "./expensesTable"
import ExpenseDropDown from "./expensesDropDown"
import ExpensesViewModal from "./modelView"

const Expense = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [currentExpense, setCurrentExpense] = useState(null)

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
            userCountry: user.country,
            userEmail: user.email,
            budget: budgets.find((budget) => budget.userId === user.userId)
              ?.categories[expense.category],
          })),
      }))

      const mergedExpenses = normalizedData.flatMap((user) =>
        user.expenses.map((expense) => ({
          userName: user.name,
          userCountry: user.country,
          userEmail: user.email,
          category: expense.category,
          amount: expense.amount,
          date: expense.date,
          description: expense.description,
          paymentMethod: expense.payment_method,
          budget: expense.budget || "N/A",
          currency: expense.currency || "INR",
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

  const handleViewExpense = (expense) => {
    setCurrentExpense(expense)
    setModalOpen(true)
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Expense Tracker
      </h2>
      <div className="flex gap-4 mb-6">
        <ExpenseDropDown
          options={categories}
          onChange={(e) => {
            setSelectedCategory(e.target.value)
            handleFilterChange(e.target.value, selectedPaymentMethod)
          }}
          placeholder="Select Category"
        />
        <ExpenseDropDown
          options={paymentMethods}
          onChange={(e) => {
            setSelectedPaymentMethod(e.target.value)
            handleFilterChange(selectedCategory, e.target.value)
          }}
          placeholder="Select Payment Method"
        />
      </div>
      <ExpensesTable expenses={filteredData} onView={handleViewExpense} />
      <ExpensesViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        expense={currentExpense}
      />
    </div>
  )
}

export default Expense
