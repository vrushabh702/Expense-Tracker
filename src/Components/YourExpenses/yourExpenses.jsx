// components/YourExpenses/yourExpenses.jsx

import React, { useState } from "react"
import { Button } from "react-bootstrap"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import useYourExpenseFetch from "./hooks/useYourExpenseFetch "
import YourExpensesTable from "./YourExpensesTable"
import ExpensesViewModal from "../Expenses/modal/modelView"
// import YourExpensesTable from "./YourExpensesTable" // Ensure this matches the correct filename (YourExpensesTable.jsx)
// import useYourExpenseFetch from "./hooks/useYourExpenseFetch" // Ensure this path is correct

const YourExpense = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentExpense, setCurrentExpense] = useState(null)
  const { userExpenses, isLoading, error } = useYourExpenseFetch()

  if (isLoading) return <Loading />
  if (error) return <Error error={error} />
  if (userExpenses.length === 0) return <div>No Expenses Found</div>

  const handleViewExpense = (expense) => {
    setCurrentExpense(expense)
    setModalOpen(true)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Your Expense Tracker
      </h2>

      <div className="flex justify-between items-center mb-6">
        <Button variant="primary">Add New Expense</Button>
      </div>

      {/* Display the user expenses table */}
      <ExpensesViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        expense={currentExpense}
      />
      <YourExpensesTable expenses={userExpenses} onView={handleViewExpense} />
    </div>
  )
}

export default YourExpense
