import { useState, useEffect } from "react"

const useFetchData = () => {
  const [mergedExpenses, setMergedExpenses] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [budgets, setBudgets] = useState([])
  const [budgetCategories, setBudgetCategories] = useState([])
  const [users, setUsers] = useState([]) // Added a state for users
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState("expenses") // "expenses" or "budget"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetching data from the APIs
        const usersData = await fetch("http://localhost:3001/api/users").then(
          (res) => res.json()
        )
        const budgetsData = await fetch(
          "http://localhost:3001/api/budgets"
        ).then((res) => res.json())
        const budgetCategoriesData = await fetch(
          "http://localhost:3001/api/budgetCategories"
        ).then((res) => res.json())
        const expensesData = await fetch(
          "http://localhost:3001/api/expenses"
        ).then((res) => res.json())
        const categoriesData = await fetch(
          "http://localhost:3001/api/categories"
        ).then((res) => res.json())
        const paymentMethodsData = await fetch(
          "http://localhost:3001/api/payment-methods"
        ).then((res) => res.json())
        const currenciesData = await fetch(
          "http://localhost:3001/api/currencies"
        ).then((res) => res.json())

        // Set state for users and other data after fetching
        setUsers(usersData)
        setCategories(categoriesData)
        setPaymentMethods(paymentMethodsData)
        setBudgets(budgetsData)
        setBudgetCategories(budgetCategoriesData)

        // Merging expenses with user, category, payment method, and currency data
        const mergedExpenses = expensesData.map((expense) => {
          const user = usersData.find((u) => u.userId === expense.userId)
          const category = categoriesData.find(
            (cat) => cat.categoryId === expense.categoryId
          )
          const paymentMethod = paymentMethodsData.find(
            (pm) => pm.paymentMethodId === expense.paymentMethodId
          )
          const currency = currenciesData.find(
            (cur) => cur.currencyId === expense.currencyId
          )

          // Find the budgetCategory and associated budget amount for the given expense category
          const budgetCategory = budgetCategoriesData.find(
            (bc) => bc.categoryId === expense.categoryId
          )
          const budget = budgetsData.find(
            (b) => b.budgetId === budgetCategory?.budgetId
          )
          const amount =
            budgetCategoriesData.find(
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
            budget: amount,
            currency: currency?.currencyCode,
          }
        })

        // After merging, update states
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

  // Filter data based on user choice (Expenses or Budget)
  const filterData = () => {
    if (view === "expenses") {
      setFilteredData(mergedExpenses)
    } else if (view === "budget") {
      const budgetData = budgets
        .map((budget) => {
          // For each user, show all the categories along with the budget data
          const userBudgets = budgetCategories.filter(
            (bc) => bc.budgetId === budget.budgetId
          )
          return userBudgets.map((userBudget) => {
            const category = categories.find(
              (cat) => cat.categoryId === userBudget.categoryId
            )
            return {
              userName: users.find((user) => user.userId === budget.userId)
                ?.userName,
              category: category?.categoryName,
              amount: userBudget.amount,
              date: new Date(budget.month).toISOString().split("T")[0], // Budget month
            }
          })
        })
        .flat()

      setFilteredData(budgetData)
    }
  }
  console.log(filteredData, "filteredData")

  // Whenever the view changes, re-filter the data
  useEffect(() => {
    filterData()
  }, [view, mergedExpenses, budgets, budgetCategories])

  return {
    mergedExpenses,
    filteredData,
    categories,
    paymentMethods,
    isLoading,
    error,
    setFilteredData,
    setView, // Allow the parent component to change the view
  }
}

export default useFetchData
