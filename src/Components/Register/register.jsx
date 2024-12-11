import { createUserWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { Alert, Button, Form } from "react-bootstrap"
import "tailwindcss/tailwind.css"
import Notification from "../Toastify/notification"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)
  const [errors, setErrors] = useState({}) // Form validation errors
  const [formValid, setFormValid] = useState(true) // Form validity

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    if (!email.trim()) {
      newErrors.email = "Email is required."
      isValid = false
    }

    if (!password.trim()) {
      newErrors.password = "Password is required."
      isValid = false
    }

    setErrors(newErrors)
    setFormValid(isValid)
    return isValid
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setNotification({ message: "Registered successfully", type: "success" })
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      setNotification({
        message: `Error Register in : ${err.message}`,
        type: "error",
      })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        {!formValid && (
          <Alert variant="danger" className="mb-3">
            Please fill in all required fields.
          </Alert>
        )}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formEail" className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter you email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email} // Highlight field if error exists
              className="border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password} // Highlight field if error exists
              className="border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
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
