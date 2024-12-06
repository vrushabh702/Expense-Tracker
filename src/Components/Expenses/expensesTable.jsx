import React from "react"

const ExpensesTable = ({ expenses }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-xl rounded-lg">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-6 py-3 text-sm font-medium">User</th>
          <th className="px-6 py-3 text-sm font-medium">Category</th>
          <th className="px-6 py-3 text-sm font-medium">Amount</th>
          <th className="px-6 py-3 text-sm font-medium">Date</th>
          <th className="px-6 py-3 text-sm font-medium">Description</th>
          <th className="px-6 py-3 text-sm font-medium">Payment Method</th>
          <th className="px-6 py-3 text-sm font-medium">Budget</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default ExpensesTable
