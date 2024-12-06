import React, { useEffect, useState } from "react"
import axios from "axios"

const Expenses = () => {
  const [data, setData] = useState(null) // State to store the fetched data
  const [loading, setLoading] = useState(true) // Loading state

  useEffect(() => {
    // Assuming your JSON data is hosted at an endpoint, replace with your actual URL
    axios
      .get("http://localhost:3000/api/expenses.json")
      // Replace with your API URL
      .then((response) => {
        setData(response.data) // Update the state with the fetched data
        setLoading(false) // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data", error)
        setLoading(false)
      })
  }, []) // Empty array means this effect runs only once after the initial render

  // Check if the data is still loading
  if (loading) {
    return <div>Loading...</div>
  }
  // If no data is fetched
  if (!data) {
    return <div>No data available</div>
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
