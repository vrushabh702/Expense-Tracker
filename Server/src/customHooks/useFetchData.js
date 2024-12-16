import { useState, useEffect } from "react"

const useFetchData = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the backend API
        const users = await fetch("http://localhost:3001/api/users").then(
          (res) => res.json()
        )
        const budgets = await fetch("http://localhost:3001/api/budgets").then(
          (res) => res.json()
        )
        const expenses = await fetch("http://localhost:3001/api/expenses").then(
          (res) => res.json()
        )
        const categories = await fetch(
          "http://localhost:3001/api/categories"
        ).then((res) => res.json())
        const paymentMethods = await fetch(
          "http://localhost:3001/api/payment-methods"
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
              currency: user.currency,
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
            currency: expense.currency || "",
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

  return {
    data,
    filteredData,
    categories,
    paymentMethods,
    isLoading,
    error,
    setFilteredData,
  }
}

export default useFetchData
