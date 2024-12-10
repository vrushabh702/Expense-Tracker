// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";  // Firebase config

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");  // Retrieve user from sessionStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));  // Store user info in sessionStorage
      } else {
        setUser(null);
        sessionStorage.removeItem("user");  // Remove user info if logged out
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
