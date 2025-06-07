import React from 'react'

import splashImg from '../assets/splash1.svg'

const Splash = () => {
  return (
    <section className='relative h-screen' id='splash'>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={splashImg} alt="" />

        <div className="text-center mt-10">
          <h1 className='text-2xl font-bold font-Montserrat text-Text'>Selamat Datang</h1>
          <p className='text-Text font-Montserrat font-normal text-sm'>Daftarkan dirimu terlebih dahulu</p>
        </div>

        <div className="flex gap-1 mt-24">
          <button>
            <svg width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.82456" cy="4.82456" r="4.82456" transform="matrix(1 0 0 -1 0 10)" fill="#35C35B"/>
            </svg>
          </button>
          <button>
            <svg width="13" height="13" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.82456" cy="4.82456" r="4.32456" transform="matrix(1 0 0 -1 0.675415 10)" fill="#F1F1F1" stroke="#A9A9A9"/>
            </svg>
          </button>
          <button>
            <svg width="13" height="13" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.82456" cy="4.82456" r="4.32456" transform="matrix(1 0 0 -1 0.675415 10)" fill="#F1F1F1" stroke="#A9A9A9"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Splash