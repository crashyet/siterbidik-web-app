import React from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../assets/banner-latihan.png'

const Latihan = () => {
  const navigate = useNavigate()

  return (
    <section className="relative bg-purple-main min-h-screen">
      <div className="top-0 z-50 px-5 pt-5 pb-6">
        <div className="flex items-center relative">
          <button onClick={() => navigate('/learning')} className="flex items-center gap-2 rounded-full border border-purple-secondary p-1.5">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.5" cy="8.5" r="8.5" fill="white"/>
              <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
            </svg>
            <h1 className='font-Montserrat font-bold text-white text-xs'>Kembali</h1>
          </button>

          {/* Title tengah */}
          <h1 className="absolute left-1/2 -translate-x-1/2 font-Montserrat font-bold text-white">
            Latihan
          </h1>
        </div>

        <div className="bg-white p-4 rounded-4xl mt-10">
          <div className="bg-light-purple px-1.5 pb-1.5 pt-3.5 rounded-2xl shadow-md mb-5">
            <div className="px-0.5 mb-2">
              <div className="flex items-center justify-between mb-2">
                <h1 className='font-Montserrat font-bold text-black text-xs ml-2'>Progres Latihan</h1>
                <div className="flex items-center gap-2 mr-1">
                  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1H5.91C5.7 0.42 5.15 0 4.5 0C3.85 0 3.3 0.42 3.09 1H1C0.45 1 0 1.45 0 2V9C0 9.55 0.45 10 1 10H8C8.55 10 9 9.55 9 9V2C9 1.45 8.55 1 8 1ZM4.5 1C4.775 1 5 1.225 5 1.5C5 1.775 4.775 2 4.5 2C4.225 2 4 1.775 4 1.5C4 1.225 4.225 1 4.5 1ZM5.5 8H2V7H5.5V8ZM7 6H2V5H7V6ZM7 4H2V3H7V4Z" fill="#A9A9A9"/>
                  </svg>
                  <h1 className='font-Montserrat font-bold text-[#A9A9A9] text-xs'>10/200 Soal</h1>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-main rounded-full transition-all duration-300"
                  style={{ width: '5%' }} // 10/200 = 5%
                />
              </div>
            </div>

            <div className="bg-white flex items-center gap-4 p-2.5 rounded-2xl">
              <div className="w-12.5 h-12.5 rounded-full bg-stroke flex-shrink-0"></div>
              <div className="">
                <h1 className='font-Montserrat font-bold text-black text-xs'>ADHITYA PUTRA</h1>
                <div className="flex items-center gap-2 mt-2">
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0ZM5 2C4.86739 2 4.74021 2.05268 4.64645 2.14645C4.55268 2.24021 4.5 2.36739 4.5 2.5V5C4.50003 5.1326 4.55273 5.25975 4.6465 5.3535L6.1465 6.8535C6.2408 6.94458 6.3671 6.99498 6.4982 6.99384C6.6293 6.9927 6.75471 6.94011 6.84741 6.84741C6.94011 6.75471 6.9927 6.6293 6.99384 6.4982C6.99498 6.3671 6.94458 6.2408 6.8535 6.1465L5.5 4.793V2.5C5.5 2.36739 5.44732 2.24021 5.35355 2.14645C5.25979 2.05268 5.13261 2 5 2Z" fill="black"/>
                  </svg>
                  <p className='font-Montserrat font-normal text-black text-[10px]'>Terakhir mengerjakan: <span>Latihan 1</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-light-purple px-4.5 rounded-2xl shadow-md pt-3 pb-5.5">
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-2 flex flex-col gap-2 items-center">
                <img src={Banner}/>
                <div className="flex flex-col items-center gap-1">
                  <h1 className='font-Montserrat font-bold text-black text-sm'>Latihan 1</h1>
                  <p className='font-Montserrat font-normal text-[#A9A9A9] text-xs'>25 Soal</p>
                </div>
                <button className="bg-purple-main text-white font-Montserrat font-bold text-xs rounded-xl w-full py-2">Mulai</button>
              </div>

              <div className="bg-white rounded-2xl p-2 flex flex-col gap-2 items-center">
                <img src={Banner}/>
                <div className="flex flex-col items-center gap-1">
                  <h1 className='font-Montserrat font-bold text-black text-sm'>Latihan 2</h1>
                  <p className='font-Montserrat font-normal text-[#A9A9A9] text-xs'>25 Soal</p>
                </div>
                <button className="bg-purple-main text-white font-Montserrat font-bold text-xs rounded-xl w-full py-2">Mulai</button>
              </div>

              <div className="bg-white rounded-2xl p-2 flex flex-col gap-2 items-center">
                <img src={Banner}/>
                <div className="flex flex-col items-center gap-1">
                  <h1 className='font-Montserrat font-bold text-black text-sm'>Latihan 3</h1>
                  <p className='font-Montserrat font-normal text-[#A9A9A9] text-xs'>25 Soal</p>
                </div>
                <button className="bg-purple-main text-white font-Montserrat font-bold text-xs rounded-xl w-full py-2">Mulai</button>
              </div>

              <div className="bg-white rounded-2xl p-2 flex flex-col gap-2 items-center">
                <img src={Banner}/>
                <div className="flex flex-col items-center gap-1">
                  <h1 className='font-Montserrat font-bold text-black text-sm'>Latihan 4</h1>
                  <p className='font-Montserrat font-normal text-[#A9A9A9] text-xs'>25 Soal</p>
                </div>
                <button className="bg-purple-main text-white font-Montserrat font-bold text-xs rounded-xl w-full py-2">Mulai</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Latihan