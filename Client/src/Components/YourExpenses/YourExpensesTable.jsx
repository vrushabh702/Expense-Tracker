// components/YourExpensesTable.js
import React from "react"

const YourExpensesTable = ({ expenses, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-xl rounded-lg border border-gray-200">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-6 py-3 text-sm font-medium">User</th>
            <th className="px-6 py-3 text-sm font-medium">Category</th>
            <th className="px-6 py-3 text-sm font-medium">Amount</th>
            <th className="px-6 py-3 text-sm font-medium">Date</th>
            <th className="px-6 py-3 text-sm font-medium">Description</th>
            <th className="px-6 py-3 text-sm font-medium">Payment Method</th>
            <th className="px-6 py-3 text-sm font-medium">Budget</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-3 text-sm">{expense.userName}</td>
              <td className="px-6 py-3 text-sm">{expense.category}</td>
              <td className="px-6 py-3 text-sm">{expense.amount}</td>
              <td className="px-6 py-3 text-sm">{expense.date}</td>
              <td className="px-6 py-3 text-sm">{expense.description}</td>
              <td className="px-6 py-3 text-sm">{expense.paymentMethod}</td>
              <td className="px-6 py-3 text-sm">{expense.budget}</td>
              <td className="p-2 border flex gap-2 justify-center">
                {/* Add appropriate actions such as View, Edit, Delete */}
                <button
                  onClick={() => onView(expense)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default YourExpensesTable
