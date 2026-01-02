import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/logo_tutwuri.svg'
import logo2 from '../../assets/siterbidikLogo.svg'

const Splash = () => {
  const navigate = useNavigate()
  const [showFirstLogo, setShowFirstLogo] = useState(false)
  const [showSecondLogo, setShowSecondLogo] = useState(false)
  const [fadeOutFirst, setFadeOutFirst] = useState(false)

  useEffect(() => {
    // White screen selama 1.5 detik, kemudian logo pertama muncul
    const timer1 = setTimeout(() => {
      setShowFirstLogo(true)
    }, 1500)

    // Fade out logo pertama setelah 2 detik ditampilkan
    const timer2 = setTimeout(() => {
      setFadeOutFirst(true)
    }, 3500)

    // Sembunyikan logo pertama dan tampilkan logo kedua
    const timer3 = setTimeout(() => {
      setShowFirstLogo(false)
      setShowSecondLogo(true)
    }, 4300)

    // Redirect ke /home setelah logo kedua selesai ditampilkan (2 detik)
    const timer4 = setTimeout(() => {
      navigate('/splash2')
    }, 6300)

    // Cleanup timers
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [navigate])

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      {/* Logo Pertama */}
      {showFirstLogo && (
        <img 
          src={logo} 
          alt="Logo 1" 
          className="absolute w-32 h-32 object-contain"
          style={{
            opacity: fadeOutFirst ? 0 : 1,
            transition: 'opacity 0.8s ease-in-out',
            animation: fadeOutFirst ? 'none' : 'fadeInScale 0.8s ease-in-out',
          }}
        />
      )}

      {/* Logo Kedua */}
      {showSecondLogo && (
        <img 
          src={logo2} 
          alt="Logo 2" 
          className="absolute w-32 h-32 object-contain"
          style={{
            opacity: 1,
            transition: 'opacity 0.8s ease-in-out',
            animation: 'fadeInScale 0.8s ease-in-out'
          }}
        />
      )}

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Splash