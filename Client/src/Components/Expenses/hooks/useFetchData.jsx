// import { useState, useEffect } from "react"

// const useFetchData = () => {
//   const [expensesData, setExpensesData] = useState([])
//   const [filteredData, setFilteredData] = useState([])
//   const [categories, setCategories] = useState([])
//   const [paymentMethods, setPaymentMethods] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true)

//         // Fetching data from the APIs in parallel
//         const [
//           users,
//           budgets,
//           budgetCategories,
//           expenses,
//           categories,
//           paymentMethods,
//           currencies,
//         ] = await Promise.all([
//           fetch("http://localhost:3001/api/users").then((res) => res.json()),
//           fetch("http://localhost:3001/api/budgets").then((res) => res.json()),
//           fetch("http://localhost:3001/api/budgetCategory").then((res) =>
//             res.json()
//           ),
//           fetch("http://localhost:3001/api/expenses").then((res) => res.json()),
//           fetch("http://localhost:3001/api/categories").then((res) =>
//             res.json()
//           ),
//           fetch("http://localhost:3001/api/payment-methods").then((res) =>
//             res.json()
//           ),
//           fetch("http://localhost:3001/api/currencies").then((res) =>
//             res.json()
//           ),
//         ])

//         // Merging the data
//         const mergedExpenses = expenses.map((expense) => {
//           const user = users.find((u) => u.userId === expense.userId) || {}
//           const category =
//             categories.find((cat) => cat.categoryId === expense.categoryId) ||
//             {}
//           const paymentMethod =
//             paymentMethods.find(
//               (pm) => pm.paymentMethodId === expense.paymentMethodId
//             ) || {}
//           const currency =
//             currencies.find((cur) => cur.currencyId === expense.currencyId) ||
//             {}

//           // Find the budgetCategory and associated budget amount for the given expense category
//           const budgetCategory = budgetCategories.find(
//             (bc) => bc.categoryId === expense.categoryId
//           )
//           const budget = budgets.find(
//             (b) => b.budgetId === budgetCategory?.budgetId
//           )
//           const budgetAmount =
//             budgetCategories.find(
//               (bc) =>
//                 bc.budgetId === budget?.budgetId &&
//                 bc.categoryId === expense.categoryId
//             )?.amount || 0

//           return {
//             userName: user?.userName,
//             userCountry: user?.userCountry,
//             userEmail: user?.userEmail,
//             category: category?.categoryName,
//             amount: expense.amount,
//             date: new Date(expense.date).toISOString().split("T")[0], // Formatting date to "YYYY-MM-DD"
//             description: expense.description,
//             paymentMethod: paymentMethod?.paymentMethodName,
//             budget: budgetAmount,
//             currency: currency?.currencyCode,
//           }
//         })

//         // Set the states
//         setCategories(categories)
//         setPaymentMethods(paymentMethods)
//         setExpensesData(mergedExpenses)
//         setFilteredData(mergedExpenses)
//         setIsLoading(false)
//       } catch (err) {
//         setError(err.message)
//         setIsLoading(false)
//         console.error("Fetch error: ", err) // Log the error for debugging
//       }
//     }

//     fetchData()
//   }, [])

//   return {
//     expensesData,
//     filteredData,
//     categories,
//     paymentMethods,
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
