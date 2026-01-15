import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllVideos } from '../data/videosData'

const Simulasi = () => {
  const navigate = useNavigate()
  const videos = getAllVideos()

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
        {videos.map((video) => (
          <div 
            key={video.id}
            onClick={() => navigate(`/video/${video.id}`)} 
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            {/* Thumbnail */}
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
              {/* Thumbnail Image */}
              {video.thumbnail ? (
                <>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay for better visibility of play icon */}
                  <div className="absolute inset-0 bg-black/10"></div>
                </>
              ) : (
                // Fallback gradient background if no thumbnail
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200"></div>
              )}
              
              {/* Play Icon Overlay */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <circle cx="30" cy="30" r="30" fill="#FFFFFF" opacity="0.9" />
                  <path
                    d="M22 18L40 30L22 42V18Z"
                    fill="#9747FF"
                  />
                </svg>
              </div> */}
              
              {/* Duration Badge */}
              <div className="absolute bottom-1.5 right-4 bg-black bg-opacity-80 text-white text-[10px] font-semibold px-4 py-0.5 rounded">
                {video.duration || '5:00'}
              </div>
            </div>
            
            {/* Video Info */}
            <div className="px-4 py-2.5 flex gap-3">
              {/* Avatar */}
              <img src={video.author.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
              
              {/* Text Info */}
              <div className="flex-1 py-1">
                <h3 className="font-Montserrat font-bold text-black text-sm">
                  {video.title}
                </h3>
                <p className="font-Montserrat text-[#A9A9A9] font-semibold text-xs mt-1">
                  {video.author.name}
                </p>
                <p className="font-Montserrat text-[#A9A9A9] text-xs mt-0.5">
                  {video.views} x ditonton • {video.uploadDate}
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
        ))}
      </div>
    </section>

  )
}

export default Simulasi