import React, { useState } from "react"
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import Notification from "../Toastify/notification" // Notification component

const Login = () => {
  const [email, setEmail] = useState("") // Email state
  const [password, setPassword] = useState("") // Password state
  const [errors, setErrors] = useState({}) // Form validation errors
  const [notification, setNotification] = useState(null) // Notification state
  const [formValid, setFormValid] = useState(true) // Form validity
  const navigate = useNavigate()

  // Validate form fields
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

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setNotification({ message: "Login successful!", type: "success" })
      setTimeout(() => {
        setNotification(null)
        navigate("/") // Navigate to home page
      }, 500)
    } catch (err) {
      setNotification({
        message: `Error logging in: ${err.message}`,
        type: "error",
      })
      setTimeout(() => setNotification(null), 2000)
    }
  }

  return (
    <Container className="flex justify-center items-center min-h-screen bg-gray-100">
      <Row className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Col>
          <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
          {!formValid && (
            <Alert variant="danger" className="mb-3">
              Please fill in all required fields.
            </Alert>
          )}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email..."
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
                placeholder="Password"
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            >
              Log In
            </Button>
          </Form>

          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              duration={notification.duration}
              onClose={() => setNotification(null)} // Close notification
            />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Login
