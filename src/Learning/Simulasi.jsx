import React from 'react'
import { useNavigate } from 'react-router-dom'

const Simulasi = () => {
  const navigate = useNavigate()

  return (
    <section className="relative" id="simulasi">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white z-50 px-5 pt-5 pb-3">
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

      {/* Video Cards */}
      <div className="px-5 mt-4 space-y-4 pb-6">
        {/* Video Card 1 */}
        <div onClick={() => navigate('/video1')} className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Thumbnail */}
          <div className="relative h-32 overflow-hidden">
            <img 
              src="/thumbnail/1-1-orientasi.png" 
              alt="Simulasi Video Thumbnail" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1.5 right-4 bg-black text-white text-[10px] font-semibold px-4 py-0.5 rounded">
              0.40
            </div>
          </div>
          
          {/* Video Info */}
          <div className="px-4 py-2.5 flex gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-stroke flex-shrink-0"></div>
            
            {/* Text Info */}
            <div className="flex-1 py-1">
              <h3 className="font-Montserrat font-bold text-black text-sm">
                Tema 1.1 Orientasi
              </h3>
              <p className="font-Montserrat text-[#A9A9A9] font-semibold text-xs mt-1">
                Pipit Dwi Komariah
              </p>
              <p className="font-Montserrat text-[#A9A9A9] text-xs mt-0.5">
                36 x ditonton • 3 Hari yang lalu
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

        {/* Video Card 2 */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Thumbnail */}
          <div className="relative bg-stroke h-32 flex items-center justify-center">
            <div className="absolute bottom-1.5 right-4 bg-black text-white text-[10px] font-semibold px-4 py-0.5 rounded">
              5.00
            </div>
          </div>
          
          {/* Video Info */}
          <div className="px-4 py-2.5 flex gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-stroke flex-shrink-0"></div>
            
            {/* Text Info */}
            <div className="flex-1 py-1">
              <h3 className="font-Montserrat font-bold text-black text-sm">
                Simulasi Video
              </h3>
              <p className="font-Montserrat text-[#A9A9A9] font-semibold text-xs mt-1">
                Thoriq Maulana
              </p>
              <p className="font-Montserrat text-[#A9A9A9] text-xs mt-0.5">
                36 x ditonton • 3 Hari yang lalu
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

        {/* Video Card 3 */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Thumbnail */}
          <div className="relative bg-stroke h-32 flex items-center justify-center">
            <div className="absolute bottom-1.5 right-4 bg-black text-white text-[10px] font-semibold px-4 py-0.5 rounded">
              5.00
            </div>
          </div>
          
          {/* Video Info */}
          <div className="px-4 py-2.5 flex gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-stroke flex-shrink-0"></div>
            
            {/* Text Info */}
            <div className="flex-1 py-1">
              <h3 className="font-Montserrat font-bold text-black text-sm">
                Simulasi Video
              </h3>
              <p className="font-Montserrat text-[#A9A9A9] font-semibold text-xs mt-1">
                Thoriq Maulana
              </p>
              <p className="font-Montserrat text-[#A9A9A9] text-xs mt-0.5">
                36 x ditonton • 3 Hari yang lalu
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
      </div>
    </section>

  )
}

export default Simulasi