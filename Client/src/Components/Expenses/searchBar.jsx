import React from "react"

const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by User Name"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}

export default SearchBar
