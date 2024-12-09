// Loading.js
import React from "react"

const Loading = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-blue-500"></div>
      </div>
      <p className="mt-4">Loading...</p>
    </div>
  )
}

export default Loading
