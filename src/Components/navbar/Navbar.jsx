import React from "react"

import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/all-expenses" className="text-white hover:text-gray-400">
            Expenses
          </Link>
        </li>
        <li>
          <Link to="/all-chart" className="text-white hover:text-gray-400">
            Chart
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar