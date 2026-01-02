import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import splash1 from '../../assets/splash1.svg'
import splash2 from '../../assets/splash1.svg'
import splash3 from '../../assets/splash1.svg'

const Splash2 = () => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const slides = [
    {
      image: splash1,
      title: 'Selamat Datang',
      description: 'Daftarkan dirimu terlebih dahulu'
    },
    {
      image: splash2,
      title: 'Belajar Berbicara',
      description: 'Tingkatkan kemampuan berbicara di depan publik'
    },
    {
      image: splash3,
      title: 'Mulai Sekarang',
      description: 'Raih kesuksesan dengan percaya diri'
    }
  ]

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(0) // Reset
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      navigate('/home')
    }
  }

  const handleSkip = () => {
    navigate('/home')
  }

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section 
      className='flex flex-col items-center justify-between h-screen py-12 px-6'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Skip Button */}
      <div className="w-full flex justify-end">
        <button 
          onClick={handleSkip}
          className='font-Montserrat text-sm font-semibold text-gray-500 hover:text-purple-main transition-colors'
        >
          Lewati
        </button>
      </div>

      {/* Slides Container */}
      <div className="flex flex-col items-center justify-center flex-1 gap-10 overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="min-w-full flex flex-col items-center justify-center gap-10"
            >
              <img src={slide.image} alt={slide.title} className="w-64 h-64 object-contain" />
              <div className="flex flex-col items-center gap-2.5">
                <h1 className='font-Montserrat text-2xl font-bold text-center'>{slide.title}</h1>
                <p className='font-Montserrat text-sm font-medium text-center text-gray-600'>
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots and Next Button */}
      <div className="flex flex-col items-center gap-8 w-full">
        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="transition-all duration-300"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5" cy="5" r="5" fill="#9747FF"/>
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5" cy="5" r="4.5" fill="#F1F1F1" stroke="#A9A9A9"/>
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Next/Get Started Button */}
        <button
          onClick={handleNext}
          className="w-full max-w-xs bg-purple-main text-white py-3 px-6 rounded-full font-Montserrat font-bold text-sm hover:bg-purple-700 transition-colors shadow-lg"
        >
          {currentSlide === slides.length - 1 ? 'Mulai Sekarang' : 'Selanjutnya'}
        </button>
      </div>
    </section>
  )
}

export default Splash2