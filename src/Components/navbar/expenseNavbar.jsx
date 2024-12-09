import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css" // Import Bootstrap CSS
import { auth } from "../firebase"

const ExpenseNavbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/login")
      })
      .catch((error) => {
        console.error("logout error", error)
      })
  }

  return (
    <div className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/expenses" className="text-white hover:text-gray-400">
              Expenses
            </Link>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle
                className="bg-gray-800 border-none text-white hover:text-gray-400"
                id="dropdown-basic"
              >
                Chart
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/chart/line">
                  Line Chart
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/chart/pie">
                  Pie Chart
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white  px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ExpenseNavbar
