// import { useState, useEffect } from "react"

// const useFetchData = () => {
//   const [data, setData] = useState([])
//   const [filteredData, setFilteredData] = useState([])
//   const [categories, setCategories] = useState([])
//   const [paymentMethods, setPaymentMethods] = useState([])
//   const [currencies, setCurrencies] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetching data from the APIs
//         const users = await fetch("http://localhost:3001/api/users").then(
//           (res) => res.json()
//         )
//         const budgets = await fetch("http://localhost:3001/api/budgets").then(
//           (res) => res.json()
//         )
//         const budgetCategory = await fetch("http://localhost:3001/api/budgetCategory").then(
//           (res) => res.json()
//         )
//         const expenses = await fetch("http://localhost:3001/api/expenses").then(
//           (res) => res.json()
//         )
//         const categories = await fetch(
//           "http://localhost:3001/api/categories"
//         ).then((res) => res.json())
//         const paymentMethods = await fetch(
//           "http://localhost:3001/api/payment-methods"
//         ).then((res) => res.json())
//         const currencies = await fetch(
//           "http://localhost:3001/api/currencies"
//         ).then((res) => res.json())

//         // Setting state for categories, paymentMethods, and currencies
//         setCategories(categories)
//         setPaymentMethods(paymentMethods)
//         setCurrencies(currencies)

//         // Dynamically generating the categoryMap, paymentMethodMap, and currencyMap
//         const categoryMap = categories.reduce((map, category) => {
//           map[category.categoryId] = category.categoryName
//           return map
//         }, {})

//         const paymentMethodMap = paymentMethods.reduce((map, method) => {
//           map[method.paymentMethodId] = method.paymentMethodName
//           return map
//         }, {})

//         const currencyMap = currencies.reduce((map, currency) => {
//           map[currency.currencyId] = currency.currencyCode
//           return map
//         }, {})

//         // Normalize and merge the data with dynamically mapped values
//         const normalizedData = users.map((user) => {
//           const userBudget = budgets.find(
//             (budget) => budget.userId === user.userId
//           )
//           const userExpenses = expenses.filter(
//             (expense) => expense.userId === user.userId
//           )

//           const expensesWithDetails = userExpenses.map((expense) => ({
//             ...expense,
//             userName: user.userName,
//             userCountry: user.userCountry,
//             userEmail: user.userEmail,
//             category: categoryMap[expense.categoryId] || "Unknown", // Use categoryMap to get category name
//             paymentMethod:
//               paymentMethodMap[expense.paymentMethodId] || "Unknown", // Use paymentMethodMap to get payment method name
//             currency: currencyMap[expense.currencyId] || "Unknown", // Use currencyMap to get currency name
//             budget:
//               userBudget?.categories[categoryMap[expense.categoryId]] || "N/A", // Map category to budget
//           }))

//           return {
//             ...user,
//             expenses: expensesWithDetails,
//           }
//         })

//         // Flatten all expenses into a single list for easy use
//         const mergedExpenses = normalizedData.flatMap((user) =>
//           user.expenses.map((expense) => ({
//             userName: user.userName,
//             userCountry: user.userCountry,
//             userEmail: user.userEmail,
//             category: expense.category,
//             amount: expense.amount,
//             date: expense.date,
//             description: expense.description,
//             paymentMethod: expense.paymentMethod,
//             budget: expense.budget,
//             currency: expense.currency,
//           }))
//         )

//         // Setting the final data in state
//         setData(mergedExpenses)
//         setFilteredData(mergedExpenses)
//         setIsLoading(false)
//       } catch (err) {
//         setError(err.message)
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   return {
//     data,
//     filteredData,
//     categories,
//     paymentMethods,
//     currencies,
//     isLoading,
//     error,
//     setFilteredData,
//   }
// }

// export default useFetchData

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
        const users = await fetch("http://localhost:3000/api/user.json").then(
          (res) => res.json()
        )
        const budgets = await fetch(
          "http://localhost:3000/api/budget.json"
        ).then((res) => res.json())
        const expenses = await fetch(
          "http://localhost:3000/api/expenses.json"
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
