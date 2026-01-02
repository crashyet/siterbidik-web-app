import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Learning = () => {
  const navigate = useNavigate()
  const [expandedSimulasi, setExpandedSimulasi] = useState(false)
  const [expandedLatihan, setExpandedLatihan] = useState(false)
  const [expandedEvaluasi, setExpandedEvaluasi] = useState(false)

  return (
    <section className='bg-purple-main w-full min-h-screen flex flex-col'>
      <div className="px-13 py-18 flex flex-col items-start justify-center gap-8">
        <button onClick={() => navigate('/home')} className="flex items-center gap-2 rounded-full border border-purple-secondary p-1.5">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8.5" cy="8.5" r="8.5" fill="#D9D9D9"/>
            <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
          </svg>
          <h1 className='font-Montserrat font-bold text-stroke text-xs'>Kembali</h1>
        </button>

        <div className="flex flex-col gap-4">
          <h1 className='font-Montserrat font-bold text-white text-3xl'>Belajar</h1>
          <p className='font-Montserrat font-normal text-white text-[13px]'>Simulasi memberikan pengalaman praktis, latihan untuk mengasah keterampilan, dan evaluasi mengukur kemampuan. Ketiga fitur tersebut dapat membantumu meningkatkan kemampuan berbicara dengan lebih baik!</p>
        </div>
      </div>

      <div className="px-13 py-12 min-h-[calc(100vh-50vh)] flex flex-col items-start gap-6.5 bg-white rounded-t-[30px]">
        <div className="w-full gap-4.5 flex flex-col">
          <h1 className='font-Montserrat font-bold text-purple-secondary'>Pilihan</h1>
          <div className='border-1 border-purple-secondary w-full'></div>
        </div>
        <div className="w-full flex flex-col gap-5">
          {/* Simulasi Button */}
          <div className="w-full flex flex-col shadow-md rounded-2xl overflow-hidden">
            <button onClick={() => navigate('/simulasi')} className="w-full flex items-center justify-between py-5 px-8">
              <h1 className='font-Montserrat font-bold text-purple-main text-sm'>Simulasi</h1>
              <svg 
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedSimulasi(!expandedSimulasi)
                }}
                className="cursor-pointer transition-transform duration-300"
                style={{ transform: expandedSimulasi ? 'rotate(180deg)' : 'rotate(0deg)' }}
                width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58333 0C10.8418 0 12.088 0.24788 13.2507 0.729488C14.4134 1.2111 15.4699 1.917 16.3598 2.80689C17.2497 3.69679 17.9556 4.75325 18.4372 5.91595C18.9188 7.07865 19.1667 8.32483 19.1667 9.58333C19.1667 12.125 18.157 14.5625 16.3598 16.3598C14.5625 18.157 12.125 19.1667 9.58333 19.1667C8.32483 19.1667 7.07865 18.9188 5.91595 18.4372C4.75325 17.9556 3.69679 17.2497 2.80689 16.3598C1.00967 14.5625 0 12.125 0 9.58333C0 7.04168 1.00967 4.60412 2.80689 2.80689C4.60412 1.00967 7.04168 0 9.58333 0ZM4.79167 7.66667L9.58333 12.4583L14.375 7.66667H4.79167Z" fill="#9747FF"/>
              </svg>
            </button>
            <div 
              style={{
                maxHeight: expandedSimulasi ? '200px' : '0',
                opacity: expandedSimulasi ? '1' : '0',
                transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out',
                overflow: 'hidden'
              }}
            >
              <div className="px-8 pb-5 pt-2">
                <p className='font-Montserrat text-gray-700 text-xs leading-relaxed'>
                  Ini menyediakan skenario simulasi di mana peserta didik dapat berlatih berbicara.
                </p>
              </div>
            </div>
          </div>

          {/* Latihan Button */}
          <div className="w-full flex flex-col shadow-md rounded-2xl overflow-hidden">
            <button onClick={() => navigate('/latihan')} className="w-full flex items-center justify-between py-5 px-8">
              <h1 className='font-Montserrat font-bold text-purple-main text-sm'>Latihan</h1>
              <svg 
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedLatihan(!expandedLatihan)
                }}
                className="cursor-pointer transition-transform duration-300"
                style={{ transform: expandedLatihan ? 'rotate(180deg)' : 'rotate(0deg)' }}
                width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58333 0C10.8418 0 12.088 0.24788 13.2507 0.729488C14.4134 1.2111 15.4699 1.917 16.3598 2.80689C17.2497 3.69679 17.9556 4.75325 18.4372 5.91595C18.9188 7.07865 19.1667 8.32483 19.1667 9.58333C19.1667 12.125 18.157 14.5625 16.3598 16.3598C14.5625 18.157 12.125 19.1667 9.58333 19.1667C8.32483 19.1667 7.07865 18.9188 5.91595 18.4372C4.75325 17.9556 3.69679 17.2497 2.80689 16.3598C1.00967 14.5625 0 12.125 0 9.58333C0 7.04168 1.00967 4.60412 2.80689 2.80689C4.60412 1.00967 7.04168 0 9.58333 0ZM4.79167 7.66667L9.58333 12.4583L14.375 7.66667H4.79167Z" fill="#9747FF"/>
              </svg>
            </button>
            <div 
              style={{
                maxHeight: expandedLatihan ? '200px' : '0',
                opacity: expandedLatihan ? '1' : '0',
                transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out',
                overflow: 'hidden'
              }}
            >
              <div className="px-8 pb-5 pt-2">
                <p className='font-Montserrat text-gray-700 text-xs leading-relaxed'>
                  Menampilkan soal-soal acak untuk menguji dan melatih keterampilan berbicara dengan tipe drill and practice.
                </p>
              </div>
            </div>
          </div>

          {/* Evaluasi Button */}
          <div className="w-full flex flex-col shadow-md rounded-2xl overflow-hidden">
            <button className="w-full flex items-center justify-between py-5 px-8">
              <h1 className='font-Montserrat font-bold text-purple-main text-sm'>Evaluasi</h1>
              <svg 
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedEvaluasi(!expandedEvaluasi)
                }}
                className="cursor-pointer transition-transform duration-300"
                style={{ transform: expandedEvaluasi ? 'rotate(180deg)' : 'rotate(0deg)' }}
                width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58333 0C10.8418 0 12.088 0.24788 13.2507 0.729488C14.4134 1.2111 15.4699 1.917 16.3598 2.80689C17.2497 3.69679 17.9556 4.75325 18.4372 5.91595C18.9188 7.07865 19.1667 8.32483 19.1667 9.58333C19.1667 12.125 18.157 14.5625 16.3598 16.3598C14.5625 18.157 12.125 19.1667 9.58333 19.1667C8.32483 19.1667 7.07865 18.9188 5.91595 18.4372C4.75325 17.9556 3.69679 17.2497 2.80689 16.3598C1.00967 14.5625 0 12.125 0 9.58333C0 7.04168 1.00967 4.60412 2.80689 2.80689C4.60412 1.00967 7.04168 0 9.58333 0ZM4.79167 7.66667L9.58333 12.4583L14.375 7.66667H4.79167Z" fill="#9747FF"/>
              </svg>
            </button>
            <div 
              style={{
                maxHeight: expandedEvaluasi ? '200px' : '0',
                opacity: expandedEvaluasi ? '1' : '0',
                transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out',
                overflow: 'hidden'
              }}
            >
              <div className="px-8 pb-5 pt-2">
                <p className='font-Montserrat text-gray-700 text-xs leading-relaxed'>
                  Evaluasi mengukur kemampuan berbicara kamu dengan memberikan feedback yang konstruktif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Learning