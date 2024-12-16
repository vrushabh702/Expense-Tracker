import { useState, useEffect } from "react"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  getFirestore,
} from "firebase/firestore"
import { app } from "../../firebase"

const db = getFirestore(app)

const useFirestore = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch expenses from Firestore
  const fetchExpenses = async () => {
    setIsLoading(true)
    try {
      const querySnapshot = await getDocs(collection(db, "expenseTable"))
      const expenses = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setData(expenses)
    } catch (err) {
      setError(err)
      console.error("Error fetching expenses: ", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Add expense to Firestore
  const addExpense = async (expense) => {
    try {
      const docRef = await addDoc(collection(db, "expenseTable"), expense)
      console.log("Expense added with ID: ", docRef.id)
      fetchExpenses() // Reload expenses after adding
    } catch (err) {
      console.error("Error adding expense: ", err)
    }
  }

  // Update expense in Firestore
  const updateExpense = async (expenseId, updatedExpense) => {
    try {
      const expenseRef = doc(db, "expenseTable", expenseId)
      await updateDoc(expenseRef, updatedExpense)
      console.log("Expense updated")
      fetchExpenses() // Reload expenses after updating
    } catch (err) {
      console.error("Error updating expense: ", err)
    }
  }

  // Delete expense from Firestore
  const deleteExpense = async (expenseId) => {
    try {
      const expenseRef = doc(db, "expenseTable", expenseId)
      await deleteDoc(expenseRef)
      console.log("Expense deleted")
      fetchExpenses() // Reload expenses after deletion
    } catch (err) {
      console.error("Error deleting expense: ", err)
    }
  }

  // Fetch expenses when the component mounts
  useEffect(() => {
    fetchExpenses()
  }, [])

  return {
    data,
    isLoading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
  }
}

export default useFirestore
