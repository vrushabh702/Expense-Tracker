import React, { useEffect, useState } from "react"

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check localStorage for dark mode preference
  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode")
    if (storedMode === "true") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev
      localStorage.setItem("darkMode", newMode.toString())
      if (newMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return newMode
    })
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-800 text-white p-2 rounded"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  )
}

export default DarkMode
