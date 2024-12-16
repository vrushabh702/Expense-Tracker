import React from "react"
import { DarkModeProvider } from "../DarkMode/darkModeContext"
import DarkMode from "../DarkMode/darkMode"

function DarkModeTest() {
  return (
    <DarkModeProvider>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <DarkMode />
        <h1 className="text-center text-3xl mt-10 text-black dark:text-white">
          Welcome to Dark Mode App
        </h1>
      </div>
    </DarkModeProvider>
  )
}

export default DarkModeTest
