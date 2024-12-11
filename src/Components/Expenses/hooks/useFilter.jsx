import { useState } from "react"

const useFilter = (setFilteredData, data, searchQuery) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

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
  }

  return {
    handleFilterChange,
    selectedCategory,
    selectedPaymentMethod,
    setSelectedCategory,
    setSelectedPaymentMethod,
  }
}

export default useFilter
