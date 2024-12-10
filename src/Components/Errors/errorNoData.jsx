import React from "react"

const NoDataError = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-xl rounded-lg max-w-md mx-auto">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-gray-400 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3m0 3h.01M5.12 5.12a9 9 0 1112.76 12.76 9 9 0 01-12.76-12.76z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          {message || "No Data Available"}
        </h3>
        <p className="text-gray-500">
          Please check back later or add some data to see the content.
        </p>
      </div>
    </div>
  )
}

export default NoDataError
