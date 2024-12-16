// hooks/useYourExpenseFetch.js
import { getAuth } from "firebase/auth"
import { useState, useEffect } from "react"
// import { getAuth } from "firebase/auth" // Import Firebase Auth

const useYourExpenseFetch = () => {
  const [userExpenses, setUserExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserExpenses = () => {
      try {
        // Get the current user from Firebase Auth
        const auth = getAuth()
        const user = auth.currentUser

        if (!user) {
          setError("User not authenticated")
          setIsLoading(false)
          return
        }

        // Fetch data from localStorage
        const storedExpenses =
          JSON.parse(localStorage.getItem("expenses")) || []

        // Filter expenses to match the current user's email
        const filteredExpenses = storedExpenses.filter(
          (expense) => expense.userEmail === user.email
        )

        setUserExpenses(filteredExpenses)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchUserExpenses()
  }, []) // Re-run on mount
  console.log("userExpenses", userExpenses)
  return {
    userExpenses,
    isLoading,
    error,
  }
}

export default useYourExpenseFetch
