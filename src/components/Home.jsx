import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import bannerBelajar from '../assets/banner_belajar.png'
import instagram from '../assets/instagram.png'
import youtube from '../assets/youtube.png'
import gmail from '../assets/gmail.png'

const Home = () => {
  return (
    <section className='relative' id='home'>
      <div className="flex flex-col items-center">
        <div className="w-20 h-0.5 bg-purple-secondary rounded-full mt-6"></div>

        <div className="flex flex-col w-[85%] mt-4 border-2 border-purple-secondary rounded-2xl p-4">
          <img src={bannerBelajar} alt="" />

          <button className='bg-purple-main mt-4.5 text-white py-3 rounded-full font-Montserrat font-bold text-sm'>Mulai Belajar</button>
        </div>

        <div className="text-purple-secondary mt-20 text-center font-Montserrat font-normal text-sm">
          <h3>Made with love &copy; SMKN1CILACAP</h3>
          <div className=" flex justify-center gap-2 mt-5 mb-8">
            <a href='https://www.instagram.com/smkn1cilacap' target='_blank' rel='noopener noreferrer'>
              <img src={instagram} alt="" className='w-7' />
            </a>
            <a href='mailto:osismpksmkn1clp@gmail.com'>
              <img src={gmail} alt="" className='w-7 mt-1' />
            </a>
            <a href='https://www.youtube.com/@smknegeri1cilacap' target='_blank' rel='noopener noreferrer'>
              <img src={youtube} alt="" className='w-7' />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home