// Base API Configuration
const API_BASE_URL = 'http://api-siterbidik.eyi.my.id/api'

/**
 * Generic API request handler with error handling
 * @param {string} endpoint - API endpoint (e.g., '/login')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<object>} Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  // Add authorization token if available
  const token = localStorage.getItem('authToken')
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      // Handle HTTP errors
      throw {
        status: response.status,
        message: data.message || 'Terjadi kesalahan pada server',
        errors: data.errors || null,
      }
    }

    return data
  } catch (error) {
    // Handle network errors or thrown errors
    if (error.status) {
      throw error
    }
    
    throw {
      status: 0,
      message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
      errors: null,
    }
  }
}

// Auth API endpoints
export const authAPI = {
  /**
   * Login user
   * @param {string} nisn - User NISN
   * @param {string} password - User password
   * @returns {Promise<object>} Login response with token and user data
   */
  login: async (nisn, password) => {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ nisn, password }),
    })
  },

  /**
   * Logout user
   * @returns {Promise<object>} Logout response
   */
  logout: async () => {
    return apiRequest('/logout', {
      method: 'POST',
    })
  },

  /**
   * Get current user profile
   * @returns {Promise<object>} User profile data
   */
  getProfile: async () => {
    return apiRequest('/profile', {
      method: 'GET',
    })
  },

  /**
   * Register new user
   * @param {object} userData - User registration data
   * @returns {Promise<object>} Registration response
   */
  register: async (userData) => {
    return apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  /**
   * Complete/Update user profile
   * @param {object} profileData - Profile data to update
   * @returns {Promise<object>} Updated profile response
   */
  completeProfile: async (profileData) => {
    return apiRequest('/completed-profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    })
  },
}

// Learning/Module API endpoints
export const learningAPI = {
  /**
   * Get all modules
   * @returns {Promise<object>} List of modules
   */
  getModules: async () => {
    return apiRequest('/modules', {
      method: 'GET',
    })
  },

  /**
   * Get module by ID
   * @param {number} id - Module ID
   * @returns {Promise<object>} Module details
   */
  getModuleById: async (id) => {
    return apiRequest(`/modules/${id}`, {
      method: 'GET',
    })
  },

  /**
   * Get user progress
   * @returns {Promise<object>} User learning progress
   */
  getProgress: async () => {
    return apiRequest('/progress', {
      method: 'GET',
    })
  },

  /**
   * Update user progress
   * @param {object} progressData - Progress data to update
   * @returns {Promise<object>} Updated progress
   */
  updateProgress: async (progressData) => {
    return apiRequest('/progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    })
  },
}

// Export API base URL for other uses
export { API_BASE_URL }
export default apiRequest
