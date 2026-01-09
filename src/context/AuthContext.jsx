import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken')
      
      if (token) {
        try {
          // Verify token by fetching user profile
          const response = await authAPI.getProfile()
          setUser(response.data || response.user)
          setIsAuthenticated(true)
        } catch (error) {
          // Token is invalid or expired
          localStorage.removeItem('authToken')
          localStorage.removeItem('userData')
          setUser(null)
          setIsAuthenticated(false)
        }
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  /**
   * Login function
   * @param {string} nisn - User NISN
   * @param {string} password - User password
   * @returns {Promise<object>} Login result
   */
  const login = async (nisn, password) => {
    try {
      const response = await authAPI.login(nisn, password)
      
      // Store token and user data
      const token = response.token || response.data?.token
      const userData = response.user || response.data?.user || response.data
      
      if (token) {
        localStorage.setItem('authToken', token)
      }
      
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData))
        setUser(userData)
      }
      
      setIsAuthenticated(true)
      
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login gagal',
        errors: error.errors 
      }
    }
  }

  /**
   * Logout function
   */
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local storage and state regardless of API call result
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  /**
   * Update user data
   * @param {object} userData - Updated user data
   */
  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
