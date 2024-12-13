import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap"
import { NavLink } from "react-router-dom" // Import NavLink for active class functionality
import { auth } from "../../firebase"
import DarkMode from "../DarkMode/darkMode"
// import { useDarkMode } from "../DarkMode/darkModeContext"

const ExpenseNavbar = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  // const { isDarkMode, toggleDarkMode } = useDarkMode()

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      setUserName(user.email)
    }
  }, [])

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
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
      <Navbar bg="light" expand="lg" className="p-3 shadow-md">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto bg-white text-black dark:bg-gray-800 dark:text-white">
            {/* Use NavLink to apply active class automatically */}
            <Nav.Item>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link text-danger" : "nav-link"
                }
              >
                Home
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/expenses"
                className={({ isActive }) =>
                  isActive ? "nav-link text-danger" : "nav-link"
                }
              >
                Expenses
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/manageByImages"
                className={({ isActive }) =>
                  isActive ? "nav-link text-danger" : "nav-link"
                }
              >
                Expenses-Image
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/yourExpense"
                className={({ isActive }) =>
                  isActive ? "nav-link text-danger" : "nav-link"
                }
              >
                Your-Expenses
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink
                to="/yourChart"
                className={({ isActive }) =>
                  isActive ? "nav-link text-danger" : "nav-link"
                }
              >
                Your-Chart
              </NavLink>
            </Nav.Item>

            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-chart"
                className={`mr-3  ${
                  window.location.pathname.includes("/chart")
                    ? "text-danger"
                    : ""
                } `}
              >
                Chart
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <NavLink
                    to="/chart/line"
                    className={({ isActive }) =>
                      isActive ? "text-danger" : ""
                    }
                  >
                    Line
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  <NavLink
                    to="/chart/pie"
                    className={({ isActive }) =>
                      isActive ? "text-danger" : ""
                    }
                  >
                    Pie
                  </NavLink>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item>
              <NavLink
                to="/Dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-link text-danger" : "nav-link"
                }
              >
                Dashboard
              </NavLink>
            </Nav.Item>
          </Nav>

          <div className="d-flex items-center">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="avatar-tooltip">{userName}</Tooltip>}
            >
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1549342785.1733746034&semt=ais_hybrid"
                alt="Avatar"
                className="rounded-circle"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
              />
            </OverlayTrigger>
            <button className="btn btn-danger ml-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </Navbar.Collapse>
        {/* <button onClick={toggleDarkMode} className="btn btn-dark ml-3">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button> */}
        <DarkMode></DarkMode>
      </Navbar>
    </div>
  )
}

export default ExpenseNavbar
