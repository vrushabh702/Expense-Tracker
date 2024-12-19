import React, { useState, useEffect } from "react"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import NoDataError from "../Errors/errorNoData"
import useFetchData from "./hooks/useFetchData"
import DBExpenseTable from "./dbExpenseTable"
import AddExpenseModal from "./modal/addExpenseModal"
import ExpensesViewModal from "../Expenses/modal/modelView"

const DataBaseExpense = () => {
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
  const [isUpdateMode, setIsUpdateMode] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [viewType, setViewType] = useState("expenses") // 'expenses' or 'budget'

  const { mergedExpenses, filteredData, isLoading, error, setView } =
    useFetchData(viewType) // Pass viewType to the hook

  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [currencies, setCurrencies] = useState([])

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

  if (isLoading) return <Loading />
  if (error) return <Error error={error} />
  if (mergedExpenses.length === 0) return <NoDataError />

  const handleViewExpense = (expense) => {
    setSelectedExpense(expense)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedExpense(null)
  }

  const handleEditExpense = (expense) => {
    console.log("handleEditExpense", expense)

    setIsUpdateMode(true)
    setFormData({
      userName: expense.userName,
      userCountry: expense.userCountry,
      userEmail: expense.userEmail,
      category: expense.categoryName,
      amount: expense.amount,
      paymentMethod: expense.paymentMethodId,
      date: expense.date,
      description: expense.description,
      budget: expense.budget,
      currency: expense.currencyId,
    })
    setShowModal(true)
  }
  const handleAddExpense = (data, isUpdate) => {
    if (isUpdate) {
      console.log("Updating expense: ", data)
    } else {
      console.log("Adding expense: ", data)
    }
    setShowModal(false)
  }

  // Handle view type change (Expense or Budget)
  const handleViewTypeChange = (event) => {
    setViewType(event.target.value) // Change viewType state to toggle between 'expenses' and 'budget'
    const selectedView = event.target.value
    setView(selectedView) // Change the view based on dropdown selection
    console.log("Current View:", selectedView) // Log the selected view to the console
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          DataBase Expense Tracker
        </h2>

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
              setShowModal(true)
            }}
          >
            Add New Expense
          </button>

          {/* Dropdown for selecting view type (Expenses or Budget) */}
          <select
            value={viewType}
            onChange={handleViewTypeChange}
            className="ml-4 p-2 border rounded"
          >
            <option value="expenses">Expense View</option>
            <option value="budget">Budget View</option>
          </select>
        </div>

        <DBExpenseTable
          data={filteredData} // Pass filtered data to table (expenses or budget)
          onView={handleViewExpense}
          onEdit={handleEditExpense}
        />
        {isModalOpen && (
          <ExpensesViewModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            expense={selectedExpense}
          />
        )}

        <AddExpenseModal
          show={showModal}
          handleClose={() => setShowModal(false)}
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
