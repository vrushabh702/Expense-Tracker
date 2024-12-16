// hooks/usePagination.js
import { useState } from "react"

const usePagination = (data) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Change based on your requirements

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return {
    currentItems,
    totalPages,
    currentPage,
    handlePageChange,
  }
}

export default usePagination
