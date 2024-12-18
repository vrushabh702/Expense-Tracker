import React, { useState, useEffect } from "react"

const DBExpenseTable = ({ data, onView, onEdit }) => {
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    if (data.length === 0) {
      setNoData(true)
    } else {
      setNoData(false)
    }
  }, [data])

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
            {data[0]?.budget && (
              <th className="px-6 py-3 text-sm font-medium">Budget</th>
            )}
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {noData ? (
            <tr>
              <td colSpan="8" className="text-center text-gray-500 py-6">
                No Data Available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-3 text-sm">{item.userName}</td>
                <td className="px-6 py-3 text-sm">{item.category}</td>
                <td className="px-6 py-3 text-sm">{item.amount}</td>
                <td className="px-6 py-3 text-sm">{item.date}</td>
                <td className="px-6 py-3 text-sm">{item?.description}</td>
                <td className="px-6 py-3 text-sm">{item?.paymentMethod}</td>
                {item.budget && (
                  <td className="px-6 py-3 text-sm">{item.budget}</td>
                )}
                <td className="p-2 border flex gap-2 justify-center">
                  <button
                    onClick={() => onView(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DBExpenseTable
