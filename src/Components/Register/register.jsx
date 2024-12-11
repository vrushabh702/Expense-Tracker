import { createUserWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { Button, Form } from "react-bootstrap"
import "tailwindcss/tailwind.css"
import Notification from "../Toastify/notification"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setNotification({ message: "Registered successfully", type: "success" })
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      setNotification({
        message: `Error Register in : ${err.message}`,
        type: "errro",
      })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
      setError("Error registering: " + err.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formEail" className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter you email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-full">
            Register
          </Button>
        </Form>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Register
