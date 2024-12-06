import React, { useEffect, useState } from "react"
import axios from "axios"

const Expenses = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:3000/server/expenses.json")
      .then((response) => {
        setData(response.data)
        setLoading(false)
        setError(null)
      })
      .catch((error) => {
        console.error("Error fetching data", error)
        setLoading(false)
        setError("There was an issue loading the data. please try again later")
      })
  }, [])
  if (loading) {
    return (
      <div className="text-center">
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-blue-500"></div>
        </div>
        <p className="mt-4">Loading...</p>
      </div>
    )
  }

  if (!data) {
    return (
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
          <h3 className="text-2xl font-semibold text-red-700 mb-2">
            No Data Available
          </h3>
          <p className="text-red-500">
            It looks like there's nothing to display at the moment. Please try
            again later.
          </p>
        </div>
      </div>
    )
  }
  const rows = []
  Object.keys(data.users).forEach((userId) => {
    const user = data.users[userId]
    user.expenses.forEach((expenseId) => {
      const expense = data.expenses[expenseId]
      rows.push({
        userName: user.name,
        userCountry: user.country,
        userEmail: user.email,
        category: expense.category,
        amount: `${user.preferences.currency} ${expense.amount}`,
        paymentMethod: expense.payment_method,
        date: expense.date,
        description: expense.description,
        budget: `${user.preferences.currency} ${
          user.budget["2024-12"][expense.category]
        }`,
        currency: user.preferences.currency,
      })
    })
  })
  return (
    <div className="App p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        All Expenses
      </h1>
      <div className="overflow-x-auto p-8">
        <table className="min-w-full bg-white shadow-xl rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-sm font-medium">User Name</th>
              <th className="px-6 py-3 text-sm font-medium">Country</th>
              <th className="px-6 py-3 text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-sm font-medium">Category</th>
              <th className="px-6 py-3 text-sm font-medium">Amount</th>
              <th className="px-6 py-3 text-sm font-medium">Payment Method</th>
              <th className="px-6 py-3 text-sm font-medium">Date</th>
              <th className="px-6 py-3 text-sm font-medium">Description</th>
              <th className="px-6 py-3 text-sm font-medium">Budget</th>
              <th className="px-6 py-3 text-sm font-medium">Currency</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-3 text-sm">{row.userName}</td>
                <td className="px-6 py-3 text-sm">{row.userCountry}</td>
                <td className="px-6 py-3 text-sm">{row.userEmail}</td>
                <td className="px-6 py-3 text-sm">{row.category}</td>
                <td className="px-6 py-3 text-sm">{row.amount}</td>
                <td className="px-6 py-3 text-sm">{row.paymentMethod}</td>
                <td className="px-6 py-3 text-sm">{row.date}</td>
                <td className="px-6 py-3 text-sm">{row.description}</td>
                <td className="px-6 py-3 text-sm">{row.budget}</td>
                <td className="px-6 py-3 text-sm">{row.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Expenses
