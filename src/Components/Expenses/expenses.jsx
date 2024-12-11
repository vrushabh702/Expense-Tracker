import React, { useState, useEffect } from "react"
import ExpensesTable from "./expensesTable"
import ExpenseDropDown from "./expensesDropDown"
import { Button } from "react-bootstrap"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import SearchBar from "./searchBar"
import ExpensesViewModal from "./modal/modelView"
import AddExpenseModal from "./modal/modalAddUpdate"
import NoDataError from "../Errors/errorNoData"
import useFetchData from "./hooks/useFetchData"
import useFilter from "./hooks/useFilter"
import usePagination from "./hooks/usePagination"
import useExportCSV from "./hooks/useExportData"
// import useExportCSV from "./hooks/useExportCSV" // Import the custom hook

const Expense = () => {
  const {
    data,
    filteredData,
    categories,
    paymentMethods,
    isLoading,
    error,
    handleSearchChange,
    setFilteredData,
  } = useFetchData()

  const { currentItems, totalPages, currentPage, handlePageChange } =
    usePagination(filteredData)

  const { handleFilterChange, selectedCategory, selectedPaymentMethod } =
    useFilter(setFilteredData, data)

  const { exportToCSV } = useExportCSV(data) // Use the custom hook to handle CSV export

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
    let updatedData = []
    if (isUpdate) {
      updatedData = data.map((item) =>
        item.userEmail === expense.userEmail ? expense : item
      )
    } else {
      updatedData = [expense, ...data]
    }

    // setData(updatedData)
    setFilteredData(updatedData)
    localStorage.setItem("expenses", JSON.stringify(updatedData))

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
    // setModalOpen(true) // it was mistake for view
    setShowModal(true)
  }

  const handleDeleteExpense = (expense) => {
    const updatedData = data.filter((item) => item !== expense)
    // setData(updatedData)
    setFilteredData(updatedData)
    localStorage.setItem("expenses", JSON.stringify(updatedData))
  }

  const handleViewExpense = (expense) => {
    setCurrentExpense(expense) // Set the current expense
    setModalOpen(true) // Open the modal
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
          <SearchBar onSearch={handleSearchChange} />
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
