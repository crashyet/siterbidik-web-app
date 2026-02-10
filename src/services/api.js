// Base API Configuration
// const API_BASE_URL = 'https://api-siterbidik.eyi.my.id/api'
const API_BASE_URL = 'http://127.0.0.1:8000/api'

/**
 * Generic API request handler with error handling
 * @param {string} endpoint - API endpoint (e.g., '/login')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<object>} Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Check if body is FormData
  const isFormData = options.body instanceof FormData
  
  const defaultHeaders = {
    'Accept': 'application/json',
  }
  
  // Only set Content-Type for non-FormData requests
  if (!isFormData) {
    defaultHeaders['Content-Type'] = 'application/json'
  }

  // Add authorization token if available
  const token = localStorage.getItem('authToken')
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  // Merge headers, but remove Content-Type if it's undefined
  const mergedHeaders = {
    ...defaultHeaders,
    ...options.headers,
  }
  
  // Remove undefined headers
  Object.keys(mergedHeaders).forEach(key => {
    if (mergedHeaders[key] === undefined) {
      delete mergedHeaders[key]
    }
  })

  const config = {
    ...options,
    headers: mergedHeaders,
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
   * @param {string} login - User NISN or Email
   * @param {string} password - User password
   * @returns {Promise<object>} Login response with token and user data
   */
  login: async (login, password) => {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ login, password }),
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
   * @param {object|FormData} profileData - Profile data to update
   * @returns {Promise<object>} Updated profile response
   */
  completeProfile: async (profileData) => {
    // Check if profileData is already FormData (from EditProfile)
    const isFormData = profileData instanceof FormData
    
    let body
    let headers = {}
    
    if (isFormData) {
      // Already FormData, use it directly
      body = profileData
      // Don't set Content-Type header - let browser set it with boundary
      headers['Content-Type'] = undefined
    } else {
      // Check if profileData contains a file (photo)
      const hasFile = profileData.photo instanceof File
      
      if (hasFile) {
        // Use FormData for file upload
        const formData = new FormData()
        
        // Append all fields to FormData
        Object.keys(profileData).forEach(key => {
          if (profileData[key] !== null && profileData[key] !== undefined) {
            formData.append(key, profileData[key])
          }
        })
        
        body = formData
        headers['Content-Type'] = undefined
      } else {
        // Use JSON for regular data
        body = JSON.stringify(profileData)
        headers['Content-Type'] = 'application/json'
      }
    }
    
    return apiRequest('/completed-profile', {
      method: 'POST',
      headers: headers,
      body: body,
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

// Video API endpoints
export const videoAPI = {
  /**
   * Get all videos
   * @returns {Promise<object>} List of videos
   */
  getVideos: async () => {
    return apiRequest('/videos', {
      method: 'GET',
    })
  },

  /**
   * Get video by ID
   * @param {number} id - Video ID
   * @returns {Promise<object>} Video details
   */
  getVideoById: async (id) => {
    return apiRequest(`/videos/${id}`, {
      method: 'GET',
    })
  },

  /**
   * Upload new video
   * @param {FormData} videoData - Video data (title, video file, thumbnail, description)
   * @returns {Promise<object>} Created video
   */
  uploadVideo: async (videoData) => {
    return apiRequest('/videos', {
      method: 'POST',
      headers: {
        'Content-Type': undefined, // Let browser set it for FormData
      },
      body: videoData,
    })
  },

  /**
   * Update video
   * @param {number} id - Video ID
   * @param {FormData|object} videoData - Video data to update
   * @returns {Promise<object>} Updated video
   */
  updateVideo: async (id, videoData) => {
    const isFormData = videoData instanceof FormData
    
    return apiRequest(`/videos/${id}`, {
      method: 'PUT',
      headers: isFormData ? { 'Content-Type': undefined } : {},
      body: isFormData ? videoData : JSON.stringify(videoData),
    })
  },

  /**
   * Delete video
   * @param {number} id - Video ID
   * @returns {Promise<object>} Delete response
   */
  deleteVideo: async (id) => {
    return apiRequest(`/videos/${id}`, {
      method: 'DELETE',
    })
  },

  /**
   * Increment video view count
   * @param {number} id - Video ID
   * @returns {Promise<object>} Updated view count
   */
  incrementView: async (id) => {
    return apiRequest(`/videos/${id}/view`, {
      method: 'POST',
    })
  },

  /**
   * Get video comments
   * @param {number} id - Video ID
   * @returns {Promise<Array>} Array of comments
   */
  getComments: async (id) => {
    return apiRequest(`/videos/${id}/comments`, {
      method: 'GET',
    })
  },

  /**
   * Add comment to video
   * @param {number} id - Video ID
   * @param {string} comment - Comment text
   * @returns {Promise<Object>} Created comment
   */
  addComment: async (id, comment) => {
    return apiRequest(`/videos/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    })
  },

  /**
   * Search videos
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching videos
   */
  searchVideos: async (query) => {
    return apiRequest(`/videos?search=${query}`, {
      method: 'GET',
    })
  },

  // ============ ADMIN FUNCTIONS ============

  /**
   * Upload new video (Admin/Guru only)
   * @param {FormData} formData - Form data with video file and metadata
   */
  uploadVideoAdmin: async (formData) => {
    return apiRequest('/admin/videos', {
      method: 'POST',
      headers: {
        'Content-Type': undefined,
      },
      body: formData,
    })
  },

  /**
   * Update video metadata (Admin/Guru only)
   * @param {number} id - Video ID
   * @param {Object} data - Updated video data
   */
  updateVideoAdmin: async (id, data) => {
    return apiRequest(`/admin/videos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  /**
   * Delete video (Admin/Guru only)
   * @param {number} id - Video ID
   */
  deleteVideoAdmin: async (id) => {
    return apiRequest(`/admin/videos/${id}`, {
      method: 'DELETE',
    })
  },

  /**
   * Get video analytics (Admin/Guru only)
   * @param {number} id - Video ID
   */
  getVideoAnalytics: async (id) => {
    return apiRequest(`/admin/videos/${id}/analytics`, {
      method: 'GET',
    })
  },
}

// Category API endpoints
export const categoryAPI = {
  /**
   * Get all categories
   */
  getAllCategories: async () => {
    return apiRequest('/categories', {
      method: 'GET',
    })
  },

  /**
   * Get videos by category
   * @param {string} slug - Category slug
   */
  getVideosByCategory: async (slug) => {
    return apiRequest(`/categories/${slug}/videos`, {
      method: 'GET',
    })
  },
}

// Assignment/Submission API endpoints
export const assignmentAPI = {
  /**
   * Upload student submission
   * @param {FormData} submissionData - { type, assignment_id, file }
   */
  uploadSubmission: async (submissionData) => {
    return apiRequest('/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': undefined,
      },
      body: submissionData,
    })
  },

  /**
   * Get submissions for an assignment (Guru only)
   * @param {string} type - 'bicara' or 'tugas_akhir'
   * @param {string} assignment_id - ID of the assignment
   */
  getSubmissions: async (type, assignment_id) => {
    return apiRequest(`/submissions?type=${type}&assignment_id=${assignment_id}`, {
      method: 'GET',
    })
  },

  /**
   * Get current student's submission for an assignment
   * @param {string} type - 'bicara' or 'tugas_akhir'
   * @param {string} assignment_id - ID of the assignment
   */
  getMySubmission: async (type, assignment_id) => {
    return apiRequest(`/submissions/my?type=${type}&assignment_id=${assignment_id}`, {
      method: 'GET',
    })
  },

  /**
   * Get all current student's submissions
   */
  getMySubmissionsAll: async () => {
    return apiRequest('/submissions/my-all', {
      method: 'GET',
    })
  },

  /**
   * Grade a student submission (Guru only)
   * @param {number} submissionId - ID of the submission
   * @param {number} score - 0-100
   * @param {string} feedback - Optional feedback
   */
  gradeSubmission: async (submissionId, score, feedback) => {
    return apiRequest(`/submissions/${submissionId}/grade`, {
      method: 'POST',
      body: JSON.stringify({ score, feedback }),
    })
  },
}

/**
 * Get full URL for stored files (storage path)
 * @param {string} path - Relative path (e.g., 'photos/abc.jpg')
 * @returns {string} Full URL
 */
export const getStorageUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  
  // Derive storage URL from API_BASE_URL (removing /api)
  const baseUrl = API_BASE_URL.replace(/\/api$/, '')
  return `${baseUrl}/storage/${path}`
}

// Export API base URL for other uses
export { API_BASE_URL }
export default apiRequest
