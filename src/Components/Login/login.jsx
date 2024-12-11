// Login.js
import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import Notification from "../Toastify/notification" // Notification component

const Login = () => {
  const [email, setEmail] = useState("") // Email state
  const [password, setPassword] = useState("") // Password state
  const [notification, setNotification] = useState(null) // Notification state
  const navigate = useNavigate()

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault() // Prevent form from refreshing
    try {
      await signInWithEmailAndPassword(auth, email, password) // Firebase login
      // On success, display notification and redirect to home
      setNotification({ message: "Login successful!", type: "success" })
      setTimeout(() => {
        setNotification(null) // Hide notification after 3 seconds
        navigate("/") // Navigate to home page
      }, 2000)
    } catch (err) {
      // On error, show error notification
      setNotification({
        message: `Error logging in: ${err.message}`,
        type: "error",
      })
      setTimeout(() => setNotification(null), 2000) // Hide error notification after 3 seconds
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
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
      </div>
    </div>
  )
}

export default Login
