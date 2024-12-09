import React, { useEffect, useState } from "react"
import ExpenseDropDown from "../Expenses/expensesDropDown"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"

const PieChartPage = () => {
  const [pieData, setPieData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetch("http://localhost:3000/api/user.json").then(
          (res) => res.json()
        )
        const expenses = await fetch(
          "http://localhost:3000/api/expenses.json"
        ).then((res) => res.json())

        const budgets = await fetch(
          "http://localhost:3000/api/budget.json"
        ).then((res) => res.json())
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
        setPieData(mergedExpenses)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredData = pieData.filter(
    (expense) =>
      (selectedCategory ? expense.category === selectedCategory : true) &&
      (selectedPaymentMethod
        ? expense.paymentMethod === selectedPaymentMethod
        : true)
  )

  const pieFilterData = filteredData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount
    return acc
  }, {})

  const pieChartData = Object.entries(pieFilterData).map(([key, value]) => ({
    name: key,
    value,
  }))

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FEF",
    "#FC4F30",
  ]

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Expense Tracker</h1>
      <div className="flex-gap-4 mb-6">
        <ExpenseDropDown
          options={categories}
          onChange={(e) => setSelectedCategory(e.target.value)}
          placeholder="select Category"
        />

        <ExpenseDropDown
          options={paymentMethods}
          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          placeholder="Select Payment Method"
        />
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-lg font-bold text-center mb-4">
          Expense by Category
        </h2>
        {pieChartData.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <div className="flex justify-center items-center h-screen bg-red-100">
            <div className="text-center p-6 bg-white shadow-xl rounded-lg max-w-md mx-auto">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-red-400 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 3h.01M5.12 5.12a9 9 0 1112.76 12.76 9 9 0 01-12.76-12.76z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-red-700 mb-2"></h3>
              <p className="text-red-500">Selected Data is not available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PieChartPage
