import axios from 'axios';

// Base API URL dari environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance dengan default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Video Service
export const videoService = {
  /**
   * Get all videos with optional filters
   * @param {Object} params - Query parameters (category, search, page, etc)
   * @returns {Promise<Array>} Array of videos
   */
  getAllVideos: async (params = {}) => {
    try {
      const response = await apiClient.get('/videos', { params });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  /**
   * Get single video by ID
   * @param {number} id - Video ID
   * @returns {Promise<Object>} Video object
   */
  getVideoById: async (id) => {
    try {
      const response = await apiClient.get(`/videos/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching video ${id}:`, error);
      throw error;
    }
  },

  /**
   * Track video view
   * @param {number} id - Video ID
   * @param {Object} data - View data (watched_duration, completed)
   * @returns {Promise<Object>} Response data
   */
  trackView: async (id, data) => {
    try {
      const response = await apiClient.post(`/videos/${id}/view`, data);
      return response.data;
    } catch (error) {
      console.error(`Error tracking view for video ${id}:`, error);
      // Don't throw error for tracking, just log it
      return null;
    }
  },

  /**
   * Get video comments
   * @param {number} id - Video ID
   * @returns {Promise<Array>} Array of comments
   */
  getComments: async (id) => {
    try {
      const response = await apiClient.get(`/videos/${id}/comments`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching comments for video ${id}:`, error);
      throw error;
    }
  },

  /**
   * Add comment to video
   * @param {number} id - Video ID
   * @param {string} comment - Comment text
   * @returns {Promise<Object>} Created comment
   */
  addComment: async (id, comment) => {
    try {
      const response = await apiClient.post(`/videos/${id}/comments`, { comment });
      return response.data.data;
    } catch (error) {
      console.error(`Error adding comment to video ${id}:`, error);
      throw error;
    }
  },

  /**
   * Search videos
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching videos
   */
  searchVideos: async (query) => {
    try {
      const response = await apiClient.get('/videos', {
        params: { search: query }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error searching videos:', error);
      throw error;
    }
  },

  // ============ ADMIN FUNCTIONS ============

  /**
   * Upload new video (Admin only)
   * @param {FormData} formData - Form data with video file and metadata
   * @param {Function} onProgress - Progress callback
   * @returns {Promise<Object>} Created video
   */
  uploadVideo: async (formData, onProgress) => {
    try {
      const response = await apiClient.post('/admin/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  },

  /**
   * Update video metadata (Admin only)
   * @param {number} id - Video ID
   * @param {Object} data - Updated video data
   * @returns {Promise<Object>} Updated video
   */
  updateVideo: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/videos/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating video ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete video (Admin only)
   * @param {number} id - Video ID
   * @returns {Promise<Object>} Response message
   */
  deleteVideo: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting video ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get video analytics (Admin only)
   * @param {number} id - Video ID
   * @returns {Promise<Object>} Analytics data
   */
  getVideoAnalytics: async (id) => {
    try {
      const response = await apiClient.get(`/admin/videos/${id}/analytics`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching analytics for video ${id}:`, error);
      throw error;
    }
  },
};

// Category Service
export const categoryService = {
  /**
   * Get all categories
   * @returns {Promise<Array>} Array of categories
   */
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Get videos by category
   * @param {string} slug - Category slug
   * @returns {Promise<Array>} Array of videos
   */
  getVideosByCategory: async (slug) => {
    try {
      const response = await apiClient.get(`/categories/${slug}/videos`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching videos for category ${slug}:`, error);
      throw error;
    }
  },
};

export default apiClient;
