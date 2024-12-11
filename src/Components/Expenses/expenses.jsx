import React, { useState } from "react"
import ExpensesTable from "./expensesTable"
import ExpenseDropDown from "./expensesDropDown"
import { Button } from "react-bootstrap"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import SearchBar from "./searchBar"
import ExpensesViewModal from "./modal/modelView"
import AddExpenseModal from "./modal/modalAddUpdate"
import NoDataError from "../Errors/errorNoData"

// Import hooks and functions
// import useFirestore from "./hooks/useFirestore" // Correctly import useFirestore hook
import useFilter from "./hooks/useFilter"
import usePagination from "./hooks/usePagination"
import useExportCSV from "./hooks/useExportData"
import useSearch from "./hooks/useSearch"
import useFetchData from "./hooks/useFetchData" // Correctly import useFetchData hook
import useFirestore from "./hooks/useFireStore"

const Expense = () => {
  // Use the hooks
  const {
    data,
    filteredData,
    categories,
    paymentMethods,
    isLoading,
    error,
    setFilteredData,
  } = useFetchData()
  const { currentItems, totalPages, currentPage, handlePageChange } =
    usePagination(filteredData)
  const { searchQuery, setSearchQuery } = useSearch(filteredData) // Use filteredData instead of data directly
  const { handleFilterChange, selectedCategory, selectedPaymentMethod } =
    useFilter(setFilteredData, data, searchQuery)
  const { exportToCSV } = useExportCSV(filteredData) // Export filteredData
  const { addExpense, updateExpense, deleteExpense } = useFirestore() // Ensure these are destructured properly

  const [modalOpen, setModalOpen] = useState(false)
  const [currentExpense, setCurrentExpense] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    userName: "",
    userCountry: "",
    userEmail: "",
    category: "",
    amount: "",
    paymentMethod: "",
    date: "",
    description: "",
    budget: "",
    currency: "",
  })
  const [isUpdateMode, setIsUpdateMode] = useState(false)

  const handleAddExpense = (expense, isUpdate) => {
    if (isUpdate) {
      updateExpense(expense.id, expense) // Update expense in Firestore
    } else {
      addExpense(expense) // Add new expense to Firestore
    }

    // Reset form data
    setFormData({
      userName: "",
      userCountry: "",
      userEmail: "",
      category: "",
      amount: "",
      paymentMethod: "",
      date: "",
      description: "",
      budget: "",
      currency: "",
    })
    setShowModal(false)
  }

  const handleEditExpense = (expense) => {
    setFormData(expense)
    setIsUpdateMode(true)
    setShowModal(true)
  }

  const handleDeleteExpense = (expense) => {
    deleteExpense(expense.id) // Delete expense from Firestore
  }

  const handleViewExpense = (expense) => {
    setCurrentExpense(expense)
    setModalOpen(true)
  }

  if (isLoading) return <Loading />
  if (error) return <Error error={error} />
  if (data.length === 0) return <NoDataError />

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Expense Tracker
      </h2>

      <div className="flex justify-between items-center mb-6">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Expense
        </Button>
        <div className="w-1/4">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <div className="flex gap-4">
          <ExpenseDropDown
            options={categories}
            onChange={(e) =>
              handleFilterChange(e.target.value, selectedPaymentMethod)
            }
            placeholder="Filter by Category"
          />
          <ExpenseDropDown
            options={paymentMethods}
            onChange={(e) =>
              handleFilterChange(selectedCategory, e.target.value)
            }
            placeholder="Filter by Payment-method"
          />
        </div>
        {/* Add export button */}
        <Button variant="success" onClick={exportToCSV}>
          Export to CSV
        </Button>
      </div>

      <ExpensesTable
        expenses={currentItems}
        onView={handleViewExpense}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />

      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="flex items-center text-gray-800 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <ExpensesViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        expense={currentExpense}
      />

      <AddExpenseModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleAddExpense}
        isUpdateMode={isUpdateMode}
      />
    </div>
  )
}

export default Expense
