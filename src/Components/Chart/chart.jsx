import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts"
import ExpenseDropDown from "../Expenses/expensesDropDown"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
const LineChartPage = () => {
  const [lineData, setLineData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get("http://localhost:3000/api/user.json")
        const expenses = await axios.get(
          "http://localhost:3000/api/expenses.json"
        )
        const budgets = await axios.get("http://localhost:3000/api/budget.json")
        const categories = await axios.get(
          "http://localhost:3000/api/categories.json"
        )
        const paymentMethods = await axios.get(
          "http://localhost:3000/api/paymentMethod.json"
        )

        setCategories(categories.data)
        setPaymentMethods(paymentMethods.data)

        const normalizedData = users.data.map((user) => ({
          ...user,
          expenses: expenses.data
            .filter((expense) => expense.userId === user.userId)
            .map((expense) => ({
              ...expense,
              userName: user.name,
              budget: budgets.data.find(
                (budget) => budget.userId === user.userId
              )?.categories[expense.category],
            })),
        }))

        const mergedExpenses = normalizedData.flatMap((user) =>
          user.expenses.map((expense) => ({
            userName: user.name,
            category: expense.category,
            amount: expense.amount,
            paymentMethod: expense.payment_method,
            date: expense.date,
          }))
        )

        setLineData(mergedExpenses)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredData = lineData.filter(
    (expense) =>
      (selectedCategory ? expense.category === selectedCategory : true) &&
      (selectedPaymentMethod
        ? expense.paymentMethod === selectedPaymentMethod
        : true)
  )

  const categoriesSet = [
    ...new Set(filteredData.map((expense) => expense.category)),
  ]

  // Log filtered data to inspect structure
  console.log("Filtered Data:", filteredData)

  // Log categories set
  console.log("Categories Set:", categoriesSet)

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        User Expenses Line Chart
      </h1>
      <div className="flex gap-4 mb-6">
        <ExpenseDropDown
          options={categories}
          onChange={(e) => setSelectedCategory(e.target.value)}
          placeholder="Select Category"
        />
        <ExpenseDropDown
          options={paymentMethods}
          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          placeholder="Select Payment Method"
        />
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="userName" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categoriesSet.map((category) => {
              console.log("Rendering category:", category)

              // Filter data for the current category
              const categoryData = filteredData.filter(
                (data) => data.category === category
              )

              console.log("Category Data:", categoryData)

              return (
                <Line
                  key={category}
                  type="monotone"
                  dataKey="amount" // This will use 'amount' for plotting the line
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`} // Random color for each line
                  name={category}
                  dot={{ r: 4 }} // This ensures dots appear on the line
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LineChartPage
