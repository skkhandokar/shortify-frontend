'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const login = (username) => {
    setUsername(username)
    localStorage.setItem('username', username)
  }

  const logout = () => {
    setUsername(null)
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
