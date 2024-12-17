import React, { useState, useEffect } from "react"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import NoDataError from "../Errors/errorNoData"
import useFetchData from "./hooks/useFetchData"
import DBExpenseTable from "./dbExpenseTable"
import AddExpenseModal from "./modal/addExpenseModal" // Import the modal for adding/editing
import ExpensesViewModal from "./../Expenses/modal/modelView"

const DataBaseExpense = () => {
  // State to manage modal visibility, form data, and update mode
  const [showModal, setShowModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
  const [isUpdateMode, setIsUpdateMode] = useState(false) // Flag to check if we are in update mode
  const [selectedExpense, setSelectedExpense] = useState(null) // Holds the expense data to edit

  // Fetch data using custom hook
  const { mergedExpenses, filteredData, isLoading, error } = useFetchData()

  // Categories, payment methods, and currencies will be fetched from the API
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [currencies, setCurrencies] = useState([])

  // Fetch categories, payment methods, and currencies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch(
          "http://localhost:3001/api/categories"
        )
        const paymentMethodsRes = await fetch(
          "http://localhost:3001/api/payment-methods"
        )
        const currenciesRes = await fetch(
          "http://localhost:3001/api/currencies"
        )

        setCategories(await categoriesRes.json())
        setPaymentMethods(await paymentMethodsRes.json())
        setCurrencies(await currenciesRes.json())
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  // Handle loading, error, and no data states
  if (isLoading) return <Loading />
  if (error) return <Error error={error} />
  if (mergedExpenses.length === 0) return <NoDataError />

  // Handle view expense - no modal involved here
  const handleViewExpense = (expense) => {
    setSelectedExpense(expense)
    setIsModalOpen(true)
  }

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedExpense(null)
  }

  // Handle edit expense - will set modal with prefilled data
  const handleEditExpense = (expense) => {
    // setSelectedExpense(expense)
    setIsUpdateMode(true) // Set to update mode
    setFormData({
      userName: expense.userName,
      userCountry: expense.userCountry,
      userEmail: expense.userEmail,
      category: expense.category,
      amount: expense.amount,
      paymentMethod: expense.paymentMethod,
      date: expense.date,
      description: expense.description,
      budget: expense.budget,
      currency: expense.currency,
    })
    setShowModal(true)
  }

  // Handle adding or updating expense
  const handleAddExpense = (data, isUpdate) => {
    if (isUpdate) {
      // Handle updating the expense
      console.log("Updating expense: ", data)
    } else {
      // Handle adding a new expense
      console.log("Adding expense: ", data)
    }
    setShowModal(false) // Close the modal after saving
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          DataBase Expense Tracker
        </h2>

        {/* Separate Add Expense Button */}
        <div className="mb-4 text-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsUpdateMode(false)
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
              setShowModal(true) // Open modal for adding new expense
            }}
          >
            Add New Expense
          </button>
        </div>

        <DBExpenseTable
          expenses={filteredData} // Pass filtered data to table
          onView={handleViewExpense} // View expense logic
          onEdit={handleEditExpense} // Edit expense logic
        />
        {isModalOpen && (
          <ExpensesViewModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            expense={selectedExpense}
          />
        )}

        {/* Modal for adding/editing expense */}
        <AddExpenseModal
          show={showModal}
          handleClose={() => setShowModal(false)} // Close modal
          formData={formData}
          setFormData={setFormData}
          handleSave={handleAddExpense}
          isUpdateMode={isUpdateMode}
          categories={categories}
          paymentMethods={paymentMethods}
          currencies={currencies}
        />
      </div>
    </div>
  )
}

export default DataBaseExpense
