import axios from "axios"
import React, { useEffect, useState } from "react"
import { Tooltip } from "react-bootstrap"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

const Chart = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3000/server/expenses.json") // If using local JSON, put the correct file path
      .then((response) => {
        const fetchedData = response.data // Assuming this is the JSON structure you provided
        // Format the data as needed (e.g., extract total expenses for each user, or monthly data)

        const formattedData = Object.keys(fetchedData.users).map((userId) => {
          const user = fetchedData.users[userId]
          return {
            name: user.name,
            food: user.budget["2024-12"].Food,
            transport: user.budget["2024-12"].Transport,
            entertainment: user.budget["2024-12"].Entertainment,
            total_expenses:
              fetchedData.monthly_summary[userId]["2024-12"].total_expenses,
          }
        })
        setData(formattedData)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      })
  }, [])

  return (
    <div>
      <div className="App p-10 bg-gray-100">
        <h1 className="text-4xl font-bold text-center text-blue-600">Chart</h1>
      </div>
      <div className="container mx-auto p-4 chart-container">
        <h2 className="text-2xl font-bold mb-4">
          User Expenses by Category (December 2024)
        </h2>
        <div className="chart-container bg-white p-6 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="food" stroke="#8884d8" />
              <Line type="monotone" dataKey="transport" stroke="#82ca9d" />
              <Line type="monotone" dataKey="entertainment" stroke="#ff7300" />
              <Line type="monotone" dataKey="total_expenses" stroke="#ff0000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Chart
