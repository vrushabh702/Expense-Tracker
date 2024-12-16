import React, { useEffect, useState } from "react"
import { Card, Button, Row, Col, Container } from "react-bootstrap"
import { getAuth } from "firebase/auth" // Firebase Auth

const AdminDashBoard = () => {
  const [totalSpending, setTotalSpending] = useState(0)
  const [totalBudget, setTotalBudget] = useState(0)
  const [inactiveUsers, setInactiveUsers] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [categoryBudgets, setCategoryBudgets] = useState({})
  const [categoryAmounts, setCategoryAmounts] = useState({})
  const [currentUserEmail, setCurrentUserEmail] = useState("") // To store the current user's email
  const [activeUsersLastMonth, setActiveUsersLastMonth] = useState(0) // To store active users in the last month

  useEffect(() => {
    // Get the current user's email from Firebase Auth
    const auth = getAuth()
    const currentUser = auth.currentUser
    if (currentUser) {
      setCurrentUserEmail(currentUser.email) // Set the email of the logged-in user
    }

    // Retrieve expenses from localStorage
    const expenses = JSON.parse(localStorage.getItem("expenses")) || []

    let totalSpending = 0
    let totalBudget = 0
    let uniqueUsers = new Set()
    let inactiveUserCount = 0
    let categoryTotals = {}
    let categoryAmountUsed = {}
    let activeUsersSet = new Set() // To store active users in the last 1 month

    // Get the current date and subtract 1 month to get the date for the last month
    const currentDate = new Date()
    const oneMonthAgo = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1)
    ) // 1 month ago from the current date

    expenses.forEach((expense) => {
      totalSpending += parseFloat(expense.amount) || 0
      totalBudget += parseFloat(expense.budget) || 0

      // Add to unique users set
      uniqueUsers.add(expense.userEmail)

      // Count inactive users (users whose email doesn't match the logged-in user)
      if (expense.userEmail !== currentUserEmail) {
        inactiveUserCount += 1
      }

      // Check if the expense date is within the last 1 month (check the last login)
      const lastLoginDate = expense.lastLoginDate
        ? new Date(expense.lastLoginDate)
        : null

      if (lastLoginDate && lastLoginDate >= oneMonthAgo) {
        activeUsersSet.add(expense.userEmail)
      }

      // Group budgets and amount used by category
      const category = expense.category
      const budget = parseFloat(expense.budget) || 0
      const amountUsed = parseFloat(expense.amount) || 0

      if (categoryTotals[category]) {
        categoryTotals[category] += budget
      } else {
        categoryTotals[category] = budget
      }

      if (categoryAmountUsed[category]) {
        categoryAmountUsed[category] += amountUsed
      } else {
        categoryAmountUsed[category] = amountUsed
      }
    })

    setTotalSpending(totalSpending)
    setTotalBudget(totalBudget)
    setInactiveUsers(inactiveUserCount)
    setTotalUsers(uniqueUsers.size)
    setCategoryBudgets(categoryTotals)
    setCategoryAmounts(categoryAmountUsed)
    setActiveUsersLastMonth(activeUsersSet.size) // Set the number of active users in the last month
  }, [currentUserEmail])

  return (
    <div className="min-h-screen bg-gray-50">
      <Container fluid className="px-6 py-8">
        {/* Header Section */}
        <Row className="mb-8 justify-content-center">
          <Col className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              User Spending Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Get insights into user spending, budget trends, and activities.
            </p>
            {/* Displaying the logged-in user's email */}
            <p className="text-lg text-gray-600 mt-4">
              Logged-in as:{" "}
              <strong>{currentUserEmail || "Not logged in"}</strong>
            </p>
          </Col>
        </Row>

        {/* Key Metrics and KPIs */}
        <Row className="mb-8">
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-xl rounded-lg bg-white p-6">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Total Spending
                </h5>
                <p className="text-3xl text-blue-600">${totalSpending}</p>
                <Button variant="outline-primary" className="mt-4 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-xl rounded-lg bg-white p-6">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Total Budget
                </h5>
                <p className="text-3xl text-green-600">${totalBudget}</p>
                <Button variant="outline-primary" className="mt-4 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-xl rounded-lg bg-white p-6">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Inactive Users
                </h5>
                <p className="text-3xl text-red-600">{inactiveUsers}</p>
                <Button variant="outline-primary" className="mt-4 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-xl rounded-lg bg-white p-6">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Total Users
                </h5>
                <p className="text-3xl text-gray-800">{totalUsers}</p>
                <Button variant="outline-primary" className="mt-4 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Active Users in Last 1 Month */}
        <Row className="mb-8">
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-xl rounded-lg bg-white p-6">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Active Users (Last 1 Month)
                </h5>
                <p className="text-3xl text-green-600">
                  {activeUsersLastMonth}
                </p>
                <Button variant="outline-primary" className="mt-4 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Category Budget and Amount Spent */}
        <Row className="mb-8">
          {Object.keys(categoryBudgets).map((category) => (
            <Col lg={3} sm={6} className="mb-6" key={category}>
              <Card className="shadow-xl rounded-lg bg-white p-6">
                <Card.Body>
                  <h5 className="text-lg font-semibold text-gray-800">
                    {category} Budget
                  </h5>
                  <p className="text-3xl text-purple-600">
                    ${categoryBudgets[category]}
                  </p>
                  <h5 className="text-lg font-semibold text-gray-800 mt-4">
                    {category} Amount Spent
                  </h5>
                  <p className="text-3xl text-red-600">
                    ${categoryAmounts[category]}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default AdminDashBoard
