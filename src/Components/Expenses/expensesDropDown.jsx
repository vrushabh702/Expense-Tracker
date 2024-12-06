import React from "react"

const Dropdown = ({ options, onChange, placeholder }) => (
  <select onChange={onChange} className="border p-2 rounded-md">
    <option value="">{placeholder}</option>
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
)

export default Dropdown
