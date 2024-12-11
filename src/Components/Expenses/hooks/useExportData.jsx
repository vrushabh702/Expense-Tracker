import { useCallback } from "react"

// Custom hook to export data to CSV
const useExportCSV = (data) => {
  const exportToCSV = useCallback(() => {
    const header = [
      "User Name",
      "User Country",
      "User Email",
      "Category",
      "Amount",
      "Payment Method",
      "Date",
      "Description",
      "Budget",
      "Currency",
    ]

    // Convert the data to CSV
    const rows = data.map((item) => [
      item.userName,
      item.userCountry,
      item.userEmail,
      item.category,
      item.amount,
      item.paymentMethod,
      item.date,
      item.description,
      item.budget,
      item.currency,
    ])

    // Create CSV content
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n")

    // Trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "expenses.csv"
    link.click()
  }, [data])

  return { exportToCSV }
}

export default useExportCSV
