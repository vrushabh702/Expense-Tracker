import React from "react"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import NoDataError from "../Errors/errorNoData"
import useFetchData from "./hooks/useFetchData"
import DBExpenseTable from "./dbExpenseTable"

const DataBaseExpense = () => {
  const { mergedExpenses, filteredData, isLoading, error } = useFetchData() // Fetch data using custom hook

  // Handle loading state
  if (isLoading) return <Loading />

  // Handle error state
  if (error) return <Error error={error} />

  // Handle no data state
  if (mergedExpenses.length === 0) return <NoDataError />

  // Render the table if data is available
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          DataBase Expense Tracker
        </h2>

        <DBExpenseTable
          expenses={filteredData} // Pass filtered data to table
        />
      </div>
    </div>
  )
}

export default DataBaseExpense
