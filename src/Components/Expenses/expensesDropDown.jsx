import React from "react"
import { Dropdown } from "react-bootstrap"

const ExpenseDropDown = ({ options, onSelect, placeholder }) => (
  <Dropdown>
    <Dropdown.Toggle
      variant="info"
      id="dropdown-custom-components"
      className="border p-2 rounded-md w-full text-left"
    >
      {placeholder}
    </Dropdown.Toggle>

    <Dropdown.Menu className="w-full">
      {options.map((option, index) => (
        <Dropdown.Item
          key={index}
          eventKey={option}
          onSelect={() => onSelect(option)}
        >
          {option}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
)

export default ExpenseDropDown
