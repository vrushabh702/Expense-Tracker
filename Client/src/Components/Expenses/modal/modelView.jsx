import React from "react"

const ExpensesViewModal = ({ isOpen, onClose, expense }) => {
  if (!isOpen || !expense) return null
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Expense Details
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-xl space-y-4 max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>User:</strong>{" "}
                <span className="text-gray-500">{expense.userName}</span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Country:</strong>{" "}
                <span className="text-gray-500">
                  {expense.userCountry || "N/A"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Email:</strong>{" "}
                <span className="text-gray-500">
                  {expense.userEmail || "N/A"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Category:</strong>{" "}
                <span className="text-gray-500">{expense.category}</span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Amount:</strong>{" "}
                <span className="text-gray-500">{expense.amount}</span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Payment Method:</strong>{" "}
                <span className="text-gray-500">{expense.paymentMethod}</span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Date:</strong>{" "}
                <span className="text-gray-500">{expense.date}</span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Description:</strong>{" "}
                <span className="text-gray-500">{expense.description}</span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Budget:</strong>{" "}
                <span className="text-gray-500">{expense.budget}</span>
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Currency:</strong>{" "}
                <span className="text-gray-500">
                  {expense.currency || "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ExpensesViewModal
