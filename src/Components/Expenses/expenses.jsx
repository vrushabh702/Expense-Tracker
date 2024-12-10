import React, { useState, useEffect } from "react"
import ExpensesTable from "./expensesTable"
import ExpenseDropDown from "./expensesDropDown"
import { Button } from "react-bootstrap" // React Bootstrap Button
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import SearchBar from "./searchBar"
import ExpensesViewModal from "./modal/modelView"
import AddExpenseModal from "./modal/modalAddUpdate"

const Expense = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [modalOpen, setModalOpen] = useState(false) // Modal state
  const [currentExpense, setCurrentExpense] = useState(null) // Store the expense for the modal
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
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
    currency: "INR",
  })
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("expenses")) || []
    setData(storedData)
    setFilteredData(storedData)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetch("http://localhost:3000/api/user.json").then(
          (res) => res.json()
        )
        const expenses = await fetch(
          "http://localhost:3000/api/expenses.json"
        ).then((res) => res.json())
        const budgets = await fetch(
          "http://localhost:3000/api/budget.json"
        ).then((res) => res.json())
        const categories = await fetch(
          "http://localhost:3000/api/categories.json"
        ).then((res) => res.json())
        const paymentMethods = await fetch(
          "http://localhost:3000/api/paymentMethod.json"
        ).then((res) => res.json())

        setCategories(categories)
        setPaymentMethods(paymentMethods)

        const normalizedData = users.map((user) => ({
          ...user,
          expenses: expenses
            .filter((expense) => expense.userId === user.userId)
            .map((expense) => ({
              ...expense,
              userName: user.name,
              userCountry: user.country,
              userEmail: user.email,
              budget: budgets.find((budget) => budget.userId === user.userId)
                ?.categories[expense.category],
            })),
        }))

        const mergedExpenses = normalizedData.flatMap((user) =>
          user.expenses.map((expense) => ({
            userName: user.name,
            userCountry: user.country,
            userEmail: user.email,
            category: expense.category,
            amount: expense.amount,
            date: expense.date,
            description: expense.description,
            paymentMethod: expense.payment_method,
            budget: expense.budget || "N/A",
            currency: expense.currency || "INR",
          }))
        )

        setData(mergedExpenses)
        setFilteredData(mergedExpenses)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleFilterChange = (category, paymentMethod) => {
    const filtered = data.filter((expense) => {
      return (
        (category ? expense.category === category : true) &&
        (paymentMethod ? expense.paymentMethod === paymentMethod : true) &&
        (searchQuery
          ? expense.userName.toLowerCase().includes(searchQuery.toLowerCase())
          : true)
      )
    })
    setFilteredData(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // Get current items based on page and items per page
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // Handle the modal view
  const handleViewExpense = (expense) => {
    setCurrentExpense(expense) // Set the current expense
    setModalOpen(true) // Open the modal
  }

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query)

    // Normalize query and perform a case-insensitive search
    const lowerCaseQuery = query.toLowerCase()

    const filtered = data.filter((expense) =>
      expense.userName.toLowerCase().includes(lowerCaseQuery)
    )

    // Update the filtered data
    setFilteredData(filtered)

    // Reset pagination to first page
    setCurrentPage(1)

    // If the search query is empty, reset to original data
    if (lowerCaseQuery.trim() === "") {
      setFilteredData(data)
    }
  }

  const handleAddExpense = () => {
    const updatedData = [formData, ...data]
    setData(updatedData)
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
      currency: "INR",
    })
    setShowModal(false)
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Expense Tracker
      </h2>

      {/* Search and Filters Section */}
      <div className="flex justify-between items-center mb-6">
        {/* SearchBar aligned to the left */}
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Expense
        </Button>

        <div className="w-1/4">
          <SearchBar onSearch={handleSearchChange} />
        </div>

        {/* Dropdowns aligned to the right */}
        <div className="flex gap-4">
          <ExpenseDropDown
            options={categories}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              handleFilterChange(e.target.value, selectedPaymentMethod)
            }}
            placeholder="Select Category"
          />
          <ExpenseDropDown
            options={paymentMethods}
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value)
              handleFilterChange(selectedCategory, e.target.value)
            }}
            placeholder="Select Payment Method"
          />
        </div>
      </div>

      {/* Table and other content */}
      <ExpensesTable expenses={currentItems} onView={handleViewExpense} />

      {/* Pagination Controls */}
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

      {/* Modal Component */}
      <ExpensesViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)} // Close modal
        expense={currentExpense} // Pass current expense to the modal
      />

      <AddExpenseModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleAddExpense}
      />
    </div>
  )
}

export default Expense
