import React from 'react'

import logoApp from '../assets/logoApp.png'

const Header = () => {
  return (
    <div className='bg-purple-main h-50 flex flex-col items-center justify-center'>
      <div className="flex gap-3 items-center -mt-5">
        <img src={logoApp} alt="" className='w-10'/>
        <h1 className='font-Coolvetica text-3xl text-white'>Siterbidik</h1>
      </div>
      <p className='font-Montserrat text-white text-xs font-semibold mt-4'>Aplikasi Terampil Berbicara Di Depan Publik</p>
    </div>
  )
}

export default Header