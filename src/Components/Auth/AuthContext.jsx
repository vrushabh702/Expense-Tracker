import React, { createContext, useContext, useState, useEffect } from "react"
import { auth } from "../firebase" // Firebase config
import Cookies from "js-cookie" // Import js-cookie

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Retrieve user from cookies
    const storedUser = Cookies.get("user") // Get user from cookies
    if (storedUser) {
      setUser(JSON.parse(storedUser)) // Set user if available
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
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

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
