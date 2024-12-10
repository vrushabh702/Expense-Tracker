// import React from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { Navbar, Nav, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap"
// import { auth } from "../firebase"

import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { Dropdown, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap"

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
  const userName = "John Doe"

  return (
    <Navbar bg="light" expand="lg" className="p-3 shadow-md">
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/expenses" className="mr-3">
            Expenses
          </Nav.Link>

          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-chart"
              className="mr-3"
            >
              chart
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/chart/line">
                Line
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/chart/pie">
                pie
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
    </Navbar>
  )
}

export default ExpenseNavbar
