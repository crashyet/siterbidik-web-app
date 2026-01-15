import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HTMLFlipBook from 'react-pageflip'

const MateriFlipbook = () => {
  const navigate = useNavigate()
  const bookRef = useRef()
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages] = useState(14)

  // Generate array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const onFlip = (e) => {
    setCurrentPage(e.data)
  }

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext()
  }

  const prevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev()
  }

  return (
    <section className='bg-purple-main w-full min-h-screen flex flex-col'>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/materi')} 
          className="flex items-center gap-2 rounded-full bg-white p-2 hover:bg-gray-100 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 11H7.83L12.71 6.12C13.1 5.73 13.1 5.09 12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7L4.71 11.29C4.32 11.68 4.32 12.31 4.71 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.83 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill="#9747FF"/>
          </svg>
        </button>

        <h1 className="font-Montserrat font-bold text-white text-lg">Teks Negosiasi</h1>

        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Flipbook Section - Landscape Orientation */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {/* Page Counter */}
        <div className="mb-4">
          <p className="font-Montserrat font-semibold text-white text-sm">
            Halaman {currentPage + 1} / {totalPages}
          </p>
        </div>

        {/* Flipbook Container - Landscape */}
        <div className="flex-1 flex items-center justify-center w-full">
          <HTMLFlipBook
            ref={bookRef}
            width={500}
            height={350}
            size="stretch"
            minWidth={300}
            maxWidth={600}
            minHeight={200}
            maxHeight={400}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className="flipbook shadow-2xl"
            style={{ margin: '0 auto' }}
          >
            {pages.map((pageNum) => (
              <div key={pageNum} className="page bg-white flex items-center justify-center">
                <img
                  src={`/materi/teks_negosiasi/${pageNum}.jpg`}
                  alt={`Halaman ${pageNum}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="350"%3E%3Crect width="500" height="350" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="16"%3EHalaman ' + pageNum + '%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        {/* Navigation Controls */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`px-6 py-3 rounded-xl font-Montserrat font-semibold text-sm transition-all ${
              currentPage === 0
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-white text-purple-main hover:bg-gray-100'
            }`}
          >
            ← Sebelumnya
          </button>

          <button
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
            className={`px-6 py-3 rounded-xl font-Montserrat font-semibold text-sm transition-all ${
              currentPage >= totalPages - 1
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-white text-purple-main hover:bg-gray-100'
            }`}
          >
            Selanjutnya →
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center">
          <p className="font-Montserrat text-xs text-white/80">
            💡 Tip: Klik pada halaman atau gunakan tombol untuk membalik halaman
          </p>
        </div>
      </div>
    </section>
  )
}

export default MateriFlipbook
