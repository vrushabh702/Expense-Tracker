import React, { createContext, useState, useEffect } from "react"

// Create context
const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  // Default to false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Get the dark mode preference from localStorage
    const storedMode = localStorage.getItem("darkMode")
    // Parse the value to boolean (true or false)
    console.log("storedMode", storedMode)
    if (storedMode) {
      setIsDarkMode(storedMode === "true") // Compare string with "true"
      if (storedMode === "true") {
        document.documentElement.classList.add("dark") // Add dark mode class to root
      } else {
        document.documentElement.classList.remove("dark") // Remove dark mode class from root
      }
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      // Store the new mode as a string in localStorage
      localStorage.setItem("darkMode", newMode.toString())
      if (newMode) {
        document.documentElement.classList.add("dark") // Apply dark mode
      } else {
        document.documentElement.classList.remove("dark") // Revert to light mode
      }
      return newMode
    })
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => React.useContext(DarkModeContext)
