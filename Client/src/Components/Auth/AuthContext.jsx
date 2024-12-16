import React, { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie" // Import js-cookie
import { auth } from "../../firebase"
import Loading from "../Loading/loading"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Retrieve user from cookies
    const storedUser = Cookies.get("user") // Get user from cookies
    if (storedUser) {
      setUser(JSON.parse(storedUser)) // Set user if available
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false)
      if (user) {
        setUser(user)
        Cookies.set("user", JSON.stringify(user), { expires: 365 }) // Store user in cookie for 1 year
      } else {
        setUser(null)
        Cookies.remove("user") // Remove user cookie when logged out
      }
    })

    return () => unsubscribe()
  }, [])
  if (loading) {
    return <Loading /> // You can replace this with a more elegant loading indicator if needed
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
