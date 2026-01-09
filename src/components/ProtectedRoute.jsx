import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * 
 * Usage:
 * <Route 
 *   path="/profile" 
 *   element={
 *     <ProtectedRoute>
 *       <Profile />
 *     </ProtectedRoute>
 *   } 
 * />
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-main">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          <p className="mt-4 text-white font-Montserrat">Memuat...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated, but save the attempted location
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // User is authenticated, render the protected content
  return children
}

/**
 * Public Only Route Component
 * Redirects to home if user is already authenticated
 * Useful for login/register pages
 * 
 * Usage:
 * <Route 
 *   path="/login" 
 *   element={
 *     <PublicOnlyRoute>
 *       <Login />
 *     </PublicOnlyRoute>
 *   } 
 * />
 */
export const PublicOnlyRoute = ({ children, redirectTo = '/home' }) => {
  const { isAuthenticated, loading } = useAuth()

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-main">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          <p className="mt-4 text-white font-Montserrat">Memuat...</p>
        </div>
      </div>
    )
  }

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // User is not authenticated, show the public page
  return children
}

export default ProtectedRoute
