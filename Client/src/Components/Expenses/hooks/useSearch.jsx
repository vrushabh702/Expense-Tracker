import { useState, useEffect } from "react"

const useSearch = (data, setFilteredData) => {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data) // If no search query, show all data
    } else {
      const filtered = data.filter((expense) =>
        expense.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredData(filtered) // Filter data based on search query
    }
  }, [searchQuery, data, setFilteredData])

  return {
    searchQuery,
    setSearchQuery,
  }
}

export default useSearch
