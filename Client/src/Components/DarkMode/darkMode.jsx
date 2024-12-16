import React from "react"
import { useDarkMode } from "./darkModeContext"

const DarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode() // Now destructure correctly

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-2 right-40 bg-gray-800 text-white p-3 rounded-full shadow-lg z-50"
    >
      {isDarkMode ? "🌙 Light Mode" : "🌞 Dark Mode"}{" "}
      {/* Correctly show mode */}
    </button>
  )
}

export default DarkMode
