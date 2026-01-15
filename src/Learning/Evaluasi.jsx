import React from 'react'
import task from '../assets/evaluasi-assets.png'
import { useNavigate } from 'react-router-dom'

const Evaluasi = () => {
  const navigate = useNavigate()
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
            Evaluasi
          </h1>

        </div>
      </div>

      <div className="px-5.5 mt-11 flex flex-col gap-5">
        <div onClick={() => navigate('/bicara-exam')} className="relative border border-[#D9D9D9] rounded-2xl w-full shadow">
          <div className="relative pt-2 pl-2 flex min-h-[122px] w-full h-full">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 33.5C4.39928 33.5 8.75549 32.6335 12.8199 30.95C16.8843 29.2664 20.5773 26.7988 23.6881 23.6881C26.7988 20.5773 29.2664 16.8843 30.95 12.8199C32.6335 8.75548 33.5 4.39928 33.5 -3.8147e-06L20.0468 -4.99082e-06C20.0468 2.63257 19.5282 5.23937 18.5208 7.67156C17.5133 10.1037 16.0367 12.3137 14.1752 14.1752C12.3137 16.0367 10.1037 17.5133 7.67156 18.5208C5.23938 19.5282 2.63258 20.0468 1.17612e-06 20.0468L0 33.5Z" fill="#D0B5F2"/>
            </svg>

            <div className="ml-2.5 flex items-center gap-3">
              <img src={task} alt="" />
              <div className="font-Montserrat font-normal text-base">
                <h1>Tes Keterampilan</h1>
                <h1>Berbicara</h1>
              </div>
            </div>

            <div className="absolute right-0 bottom-0">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.5 0C29.1007 -5.24609e-08 24.7445 0.866503 20.6801 2.55004C16.6157 4.23357 12.9227 6.70116 9.81192 9.81192C6.70116 12.9227 4.23357 16.6157 2.55003 20.6801C0.866502 24.7445 -6.64273e-07 29.1007 0 33.5L33.5 33.5V0Z" fill="#D0B5F2"/>
              </svg>
            </div>
          </div>

          <div className="border-t border-[#D9D9D9]"></div>

          <div className="flex items-center justify-center w-full h-full py-3.5">
            <h1 className='font-Montserrat font-semibold text-purple-main text-sm'>Kerjakan</h1>
          </div>
        </div>

        <div className="relative border border-[#D9D9D9] rounded-2xl w-full shadow">
          <div className="relative pt-2 pl-2 flex min-h-[122px] w-full h-full">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 33.5C4.39928 33.5 8.75549 32.6335 12.8199 30.95C16.8843 29.2664 20.5773 26.7988 23.6881 23.6881C26.7988 20.5773 29.2664 16.8843 30.95 12.8199C32.6335 8.75548 33.5 4.39928 33.5 -3.8147e-06L20.0468 -4.99082e-06C20.0468 2.63257 19.5282 5.23937 18.5208 7.67156C17.5133 10.1037 16.0367 12.3137 14.1752 14.1752C12.3137 16.0367 10.1037 17.5133 7.67156 18.5208C5.23938 19.5282 2.63258 20.0468 1.17612e-06 20.0468L0 33.5Z" fill="#D0B5F2"/>
            </svg>

            <div className="ml-2.5 flex items-center gap-3">
              <img src={task} alt="" />
              <div className="font-Montserrat font-normal text-base">
                <h1>Penilaian Tugas</h1>
                <h1>Akhir</h1>
              </div>
            </div>

            <div className="absolute right-0 bottom-0">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.5 0C29.1007 -5.24609e-08 24.7445 0.866503 20.6801 2.55004C16.6157 4.23357 12.9227 6.70116 9.81192 9.81192C6.70116 12.9227 4.23357 16.6157 2.55003 20.6801C0.866502 24.7445 -6.64273e-07 29.1007 0 33.5L33.5 33.5V0Z" fill="#D0B5F2"/>
              </svg>
            </div>
          </div>

          <div className="border-t border-[#D9D9D9]"></div>

          <div className="flex items-center justify-center w-full h-full py-3.5">
            <h1 className='font-Montserrat font-semibold text-purple-main text-sm'>Kerjakan</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Evaluasi