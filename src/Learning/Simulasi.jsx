import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI, videoAPI } from '../services/api'
import profil from '../assets/tl.webp'

const Simulasi = () => {
  const navigate = useNavigate()
  const { user: contextUser } = useAuth()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [localUser, setLocalUser] = useState(null)

  // Load videos and user profile from API in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch videos and profile concurrently for better performance
        const [videoResponse, profileResponse] = await Promise.all([
          videoAPI.getVideos(),
          authAPI.getProfile().catch(err => {
            console.warn('Silent profile fetch error:', err)
            return null
          })
        ])
        
        setVideos(videoResponse.data || [])
        
        if (profileResponse) {
          const userData = profileResponse.data || profileResponse.user || profileResponse
          setLocalUser(userData)
        }
        
        setError(null)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Gagal memuat data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Use local user if available (fresh fetch), otherwise fallback to context user
  const currentUser = localUser || contextUser

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="h-32 bg-gray-200"></div>
      <div className="px-4 py-2.5 flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex-1 py-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="relative" id="simulasi">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white z-50 px-5 pt-15 pb-3">
        <div className="flex items-center relative">
        
          {/* Button kiri */}
          <button
            onClick={() => navigate('/learning')}
            className="flex items-center gap-2 rounded-full bg-purple-main p-1.5"
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="8.5" r="8.5" fill="#ffffff"/>
              <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
            </svg>
            <h1 className="font-Montserrat font-bold text-white text-xs">
              Kembali
            </h1>
          </button>

          {/* Title tengah */}
          <h1 className="absolute left-1/2 -translate-x-1/2 font-Montserrat font-bold text-purple-main">
            Simulasi
          </h1>

        </div>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <input 
            type="text" 
            placeholder="Cari Video ..." 
            className="w-full px-5 py-3 pr-12 border border-gray-300 bg-stroke rounded-full text-sm font-Montserrat placeholder:text-gray-500" 
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="#666" strokeWidth="2"/>
              <path d="M13 13L17 17" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Video Cards - Dynamic Rendering */}
      <div className="px-5 mt-4 space-y-4 pb-6">
        {loading ? (
          // Display 3 skeleton cards while loading
          [1, 2, 3].map((i) => <SkeletonCard key={i} />)
        ) : error ? (
          <div className="text-center py-10">
            <p className="font-Montserrat text-red-500">{error}</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-10">
            <p className="font-Montserrat text-gray-500">Belum ada video</p>
          </div>
        ) : (
          videos.map((video) => (
            <div 
              key={video.id}
              onClick={() => navigate(`/video/${video.id}`)} 
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all active:scale-[0.98]"
            >
              {/* Thumbnail */}
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
                {/* Thumbnail Image */}
                {video.thumbnail_url ? (
                  <>
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Dark overlay for better visibility of play icon */}
                    <div className="absolute inset-0 bg-black/10"></div>
                  </>
                ) : (
                  // Fallback gradient background if no thumbnail
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200"></div>
                )}
                
                {/* Duration Badge */}
                <div className="absolute bottom-1.5 right-4 bg-black bg-opacity-80 text-white text-[10px] font-semibold px-4 py-0.5 rounded">
                  {video.duration || '0:00'}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="px-4 py-2.5 flex gap-3">
                {/* Avatar */}
                <img src={video.author?.avatar || profil} alt="Avatar" className="w-10 h-10 rounded-full bg-gray-100" />
                
                {/* Text Info */}
                <div className="flex-1 py-1">
                  <h3 className="font-Montserrat font-bold text-black text-sm line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="font-Montserrat text-[#A9A9A9] font-semibold text-xs mt-1">
                    {video.author?.name || 'Unknown'}
                  </p>
                  <p className="font-Montserrat text-[#A9A9A9] text-xs mt-0.5">
                    {video.views} x ditonton • {video.upload_date}
                  </p>
                </div>
                
                {/* Menu Button */}
                <button className="flex-shrink-0 h-6">
                  <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                    <circle cx="2" cy="2" r="2" fill="#000"/>
                    <circle cx="2" cy="8" r="2" fill="#000"/>
                    <circle cx="2" cy="14" r="2" fill="#000"/>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Video Button - Only for Teachers */}
      {currentUser?.role === 'guru' && (
        <button
          onClick={() => navigate('/upload-video')}
          className="fixed bottom-20 right-5 z-40 bg-gradient-to-br from-purple-main to-purple-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
          aria-label="Upload Video"
        >
          {/* Camera/Upload Icon */}
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:rotate-12 transition-transform duration-300"
          >
            <path 
              d="M17 10.5V7C17 6.46957 16.7893 5.96086 16.4142 5.58579C16.0391 5.21071 15.5304 5 15 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V13.5L21 17.5V6.5L17 10.5Z" 
              fill="white"
            />
            <circle cx="18" cy="6" r="3" fill="#FFD700" stroke="white" strokeWidth="1"/>
            <path d="M18 4.5V7.5M16.5 6H19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          
          {/* Tooltip on hover */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-Montserrat font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Upload Video
          </span>
        </button>
      )}
    </section>

  )
}

export default Simulasi