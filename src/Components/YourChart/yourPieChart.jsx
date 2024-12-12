import React, { useEffect, useState } from "react"
import ExpenseDropDown from "../Expenses/expensesDropDown"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import { getAuth } from "firebase/auth"

const YourPieChart = () => {
  const [pieData, setPieData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Fetching authenticated user's email from Firebase
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      setUserEmail(user.email) // Store user email in state
    }

    // Simulating category and payment method data retrieval (you can replace this with actual data fetching)
    setCategories(["Healthcare", "Food", "Transport", "Entertainment"])
    setPaymentMethods(["Cash", "Debit Card", "Credit Card"])

    // Retrieving expenses from localStorage (Assuming localStorage contains an array of expenses)
    const expensesData = JSON.parse(localStorage.getItem("expenses")) || []
    console.log("All expenses from localStorage:", expensesData)
    if (expensesData.length === 0) {
      setError("No expenses data found in localStorage.")
      setIsLoading(false)
      return
    }

    // Filter expenses by authenticated user email
    const filteredExpenses = expensesData.filter(
      (expense) => expense.userEmail === userEmail
    )
    console.log("Filtered expenses for user:", filteredExpenses) // Log
    // Map filtered expenses to pie chart format
    const mappedExpenses = filteredExpenses.map((expense) => ({
      category: expense.category,
      amount: parseFloat(expense.amount),
      budget: parseFloat(expense.budget), // Including budget
    }))
    console.log("Mapped expenses with amount and budget:", mappedExpenses)

    setPieData(mappedExpenses)
    setIsLoading(false)
  }, [userEmail]) // Re-run when userEmail changes

  // Filter the pie data based on category and payment method
  const filteredData = pieData.filter(
    (expense) =>
      (selectedCategory ? expense.category === selectedCategory : true) &&
      (selectedPaymentMethod
        ? expense.paymentMethod === selectedPaymentMethod
        : true)
  )

  // Prepare data for the amount pie chart
  const pieFilterDataAmount = filteredData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount
    return acc
  }, {})

  const pieChartDataAmount = Object.entries(pieFilterDataAmount).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  )

  // Prepare data for the budget pie chart
  const pieFilterDataBudget = filteredData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.budget
    return acc
  }, {})

  const pieChartDataBudget = Object.entries(pieFilterDataBudget).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  )

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

      <div className="flex gap-8">
        {" "}
        {/* Flexbox for side-by-side layout */}
        {/* Amount by Category Pie Chart */}
        <div className="bg-white shadow-xl rounded-lg p-6 w-1/2">
          <h2 className="text-lg font-bold text-center mb-4">
            Expense by Category (Amount)
          </h2>
          {pieChartDataAmount.length > 0 ? (
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartDataAmount}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieChartDataAmount.map((entry, index) => (
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
            <div className="text-center p-6 bg-white shadow-xl rounded-lg max-w-md mx-auto">
              <p className="text-red-500">
                No data available for selected filters.
              </p>
            </div>
          )}
        </div>
        {/* Budget by Category Pie Chart */}
        <div className="bg-white shadow-xl rounded-lg p-6 w-1/2">
          <h2 className="text-lg font-bold text-center mb-4">
            Expense by Category (Budget)
          </h2>
          {pieChartDataBudget.length > 0 ? (
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartDataBudget}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieChartDataBudget.map((entry, index) => (
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
            <div className="text-center p-6 bg-white shadow-xl rounded-lg max-w-md mx-auto">
              <p className="text-red-500">
                No data available for selected filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default YourPieChart
