import React, { useEffect, useState } from "react"

// const ExpensesCard = ({ expenses, onView, onEdit, onDelete }) => {
//   const [noData, setNoData] = useState(false)

//   useEffect(() => {
//     if (expenses.length === 0) {
//       setNoData(true)
//     } else {
//       setNoData(false)
//     }
//   }, [expenses])

return (
  <div>
    <h1>expenseImages</h1>
  </div>
  // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //   {/* If no data available, show the message */}
  //   {noData ? (
  //     <div className="col-span-full text-center text-gray-500 py-6">
  //       No Data Available
  //     </div>
  //   ) : (
  //     expenses.map((expense, index) => (
  //       <div
  //         key={index}
  //         className="bg-white shadow-xl rounded-lg border border-gray-200 p-4 mb-4 flex flex-col"
  //       >
  //         {/* Image Section */}
  //         <div className="mb-4">
  //           <img
  //             src={expense.expenseImage}
  //             alt="Expense"
  //             className="w-full h-48 object-cover rounded-lg"
  //           />
  //         </div>

  //         {/* Content Section */}
  //         <div>
  //           <h3 className="text-lg font-semibold text-gray-800">
  //             {expense.userName}
  //           </h3>
  //           <p className="text-sm text-gray-500">{expense.category}</p>
  //           <p className="text-md font-semibold text-gray-700">
  //             {expense.amount}
  //           </p>
  //           <p className="text-sm text-gray-500">Date: {expense.date}</p>
  //           <p className="text-sm text-gray-500">
  //             Description: {expense.description}
  //           </p>
  //           <p className="text-sm text-gray-500">
  //             Payment Method: {expense.paymentMethod}
  //           </p>
  //           <p className="text-sm text-gray-500">Budget: {expense.budget}</p>

  //           {/* Action Buttons */}
  //           <div className="flex gap-2 mt-4">
  //             <button
  //               onClick={() => onView(expense)}
  //               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  //             >
  //               View
  //             </button>
  //             <button
  //               onClick={() => onEdit(expense)}
  //               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
  //             >
  //               Edit
  //             </button>
  //             <button
  //               onClick={() => onDelete(expense)}
  //               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     ))
  //   )}
  // </div>
)
// }

export default ExpensesCard
