import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const App = () => {
  const [pieData, setPieData] = useState([])

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

      // Normalizing and combining data
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
          category: expense.category,
          amount: expense.amount,
        }))
      )

      // Preparing pie chart data
      const categoryTotals = mergedExpenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount
        return acc
      }, {})

      const pieData = Object.entries(categoryTotals).map(([key, value]) => ({
        name: key,
        value,
      }))

      setPieData(pieData)
    }

    fetchData()
  }, [])

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FEF",
    "#FC4F30",
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Expenses by Category
      </h1>
      <div className="bg-white shadow-xl rounded-lg p-6">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}

export default App
