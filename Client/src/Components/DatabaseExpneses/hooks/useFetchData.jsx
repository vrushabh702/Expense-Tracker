import { useState, useEffect } from "react"

const useFetchData = () => {
  const [mergedExpenses, setMergedExpenses] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetching data from the APIs
        const users = await fetch("http://localhost:3001/api/users").then(
          (res) => res.json()
        )
        const budgets = await fetch("http://localhost:3001/api/budgets").then(
          (res) => res.json()
        )
        const budgetCategories = await fetch(
          "http://localhost:3001/api/budgetCategory"
        ).then((res) => res.json())
        const expenses = await fetch("http://localhost:3001/api/expenses").then(
          (res) => res.json()
        )
        const categories = await fetch(
          "http://localhost:3001/api/categories"
        ).then((res) => res.json())
        const paymentMethods = await fetch(
          "http://localhost:3001/api/payment-methods"
        ).then((res) => res.json())
        const currencies = await fetch(
          "http://localhost:3001/api/currencies"
        ).then((res) => res.json())

        const mergedExpenses = expenses.map((expense) => {
          const user = users.find((u) => u.userId === expense.userId)
          const category = categories.find(
            (cat) => cat.categoryId === expense.categoryId
          )
          const paymentMethod = paymentMethods.find(
            (pm) => pm.paymentMethodId === expense.paymentMethodId
          )
          const currency = currencies.find(
            (cur) => cur.currencyId === expense.currencyId
          )

          // Find the budgetCategory and associated budget amount for the given expense category
          const budgetCategory = budgetCategories.find(
            (bc) => bc.categoryId === expense.categoryId
          )
          const budget = budgets.find(
            (b) => b.budgetId === budgetCategory?.budgetId
          )
          const budgetAmount =
            budgetCategories.find(
              (bc) =>
                bc.budgetId === budget?.budgetId &&
                bc.categoryId === expense.categoryId
            )?.amount || 0

          return {
            userName: user?.userName,
            userCountry: user?.userCountry,
            userEmail: user?.userEmail,
            category: category?.categoryName,
            amount: expense.amount,
            date: new Date(expense.date).toISOString().split("T")[0], // Formatting date to "YYYY-MM-DD"
            description: expense.description,
            paymentMethod: paymentMethod?.paymentMethodName,
            budget: budgetAmount,
            currency: currency?.currencyCode,
          }
        })

        console.log("mergedExpenses", mergedExpenses)
        setCategories(categories)
        setPaymentMethods(paymentMethods)

        setMergedExpenses(mergedExpenses)
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
    mergedExpenses,
    filteredData,
    categories,
    paymentMethods,
    isLoading,
    error,
    setFilteredData,
  }
}

export default useFetchData
