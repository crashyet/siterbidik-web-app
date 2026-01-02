import React from 'react'

import book from '../assets/ic_book.png'
import file from '../assets/ic_file.png'

const Modul = () => {
  return (
    <section className='relative' id='modul'>
      <div className="w-[85%] flex flex-col items-center mx-auto">
        <div className="grid grid-cols-2 gap-6 mt-10">
          <button onClick={() => window.location.href = '/modul'}>
            <div className="bg-light-purple pl-10 pr-7 pt-12 pb-8 rounded-2xl relative">
              <div className="absolute bg-white text-purple-main top-0 left-0 w-24 py-1.5 rounded-br-2xl font-Montserrat font-bold text-sm">
                Silabus
              </div>
              <img src={book} alt="" className='h-12'/>
            </div>
          </button>

          <button onClick={() => window.location.href = '/modul'}>
            <div className="bg-light-purple pl-10 pr-7 pt-12 pb-8 rounded-2xl relative">
              <div className="absolute bg-white text-purple-main top-0 left-0 w-24 py-1.5 rounded-br-2xl font-Montserrat font-bold text-sm">
                RPP
              </div>
              <img src={book} alt="" className='h-12'/>
            </div>
          </button>

          <button onClick={() => window.location.href = '/modul'}>
            <div className="bg-light-purple pl-10 pr-7 pt-12 pb-8 rounded-2xl relative">
              <div className="absolute bg-white text-purple-main top-0 left-0 w-24 py-1.5 rounded-br-2xl font-Montserrat font-bold text-sm">
                Buku Ajar
              </div>
              <img src={book} alt="" className='h-12'/>
            </div>
          </button>

          <button onClick={() => window.location.href = '/modul'}>
            <div className="bg-light-purple pl-10 pr-7 pt-12 pb-8 rounded-2xl relative">
              <div className="absolute bg-white text-purple-main top-0 left-0 w-24 py-1.5 rounded-br-2xl font-Montserrat font-bold text-sm">
                Panduan
              </div>
              <img src={book} alt="" className='h-12'/>
            </div>
          </button>
        </div>

        <div className="mt-10 py-6 px-4 w-full bg-white rounded-t-3xl shadow-[0_-1px_5px_rgba(0,0,0,0.1)]">
          <h1 className='font-Montserrat font-bold text-base text-purple-main text-center'>Unduhan</h1>

          <div className="flex flex-col mt-5">
            <div className="bg-light-purple w-full border-1 border-stroke pt-3.5 pb-2 px-3.5 rounded-xl ">
              <div className="flex justify-between">

                <div className="flex items-center gap-4">
                  <div className="p-3.5 border-1 border-stroke rounded-lg bg-white">
                    <img src={file} alt="" className='w-4' />
                  </div>

                  <div className="font-Montserrat text-black">
                    <h3 className='font-bold text-sm'>File Silabus 1</h3>
                    <p className='text-xs'>10 MB</p>
                  </div>
                </div>

                <div className="mt-1.5 mr-1">
                  <svg width="10" height="10" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 4.55191L1.28142 6.77049C1.14117 6.91075 0.962659 6.98087 0.745901 6.98087C0.529143 6.98087 0.350637 6.91075 0.210382 6.77049C0.0701272 6.63024 0 6.45173 0 6.23497C0 6.01822 0.0701272 5.83971 0.210382 5.69945L2.42896 3.48087L0.210382 1.28142C0.0701272 1.14117 0 0.96266 0 0.745902C0 0.529144 0.0701272 0.350638 0.210382 0.210383C0.350637 0.0701276 0.529143 0 0.745901 0C0.962659 0 1.14117 0.0701276 1.28142 0.210383L3.5 2.42896L5.69945 0.210383C5.83971 0.0701276 6.01821 0 6.23497 0C6.45173 0 6.63024 0.0701276 6.77049 0.210383C6.9235 0.363388 7 0.545209 7 0.755847C7 0.966484 6.9235 1.14168 6.77049 1.28142L4.55191 3.48087L6.77049 5.69945C6.91075 5.83971 6.98087 6.01822 6.98087 6.23497C6.98087 6.45173 6.91075 6.63024 6.77049 6.77049C6.61749 6.9235 6.43592 7 6.22579 7C6.01566 7 5.84022 6.9235 5.69945 6.77049L3.5 4.55191Z" fill="#A9A9A9"/>
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <div className="w-full h-1 bg-white rounded-full"></div>
                <div className="absolute w-[40%] h-1 bg-purple-secondary rounded-full"></div>
                <p className='font-Montserrat text-sm text-[#A9A9A9] text-nowrap'>85 %</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <div className="bg-light-purple w-full border-1 border-stroke p-3.5 rounded-xl ">
              <div className="flex justify-between">

                <div className="flex items-center gap-4">
                  <div className="p-3.5 border-1 border-stroke rounded-lg bg-white">
                    <img src={file} alt="" className='w-4' />
                  </div>

                  <div className="font-Montserrat text-black">
                    <h3 className='font-bold text-sm'>Buku Ajar 1</h3>
                    <p className='text-xs'>10 MB</p>
                  </div>
                </div>

                <div className="mt-1.5 mr-1">
                  <svg width="10" height="10" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 4.55191L1.28142 6.77049C1.14117 6.91075 0.962659 6.98087 0.745901 6.98087C0.529143 6.98087 0.350637 6.91075 0.210382 6.77049C0.0701272 6.63024 0 6.45173 0 6.23497C0 6.01822 0.0701272 5.83971 0.210382 5.69945L2.42896 3.48087L0.210382 1.28142C0.0701272 1.14117 0 0.96266 0 0.745902C0 0.529144 0.0701272 0.350638 0.210382 0.210383C0.350637 0.0701276 0.529143 0 0.745901 0C0.962659 0 1.14117 0.0701276 1.28142 0.210383L3.5 2.42896L5.69945 0.210383C5.83971 0.0701276 6.01821 0 6.23497 0C6.45173 0 6.63024 0.0701276 6.77049 0.210383C6.9235 0.363388 7 0.545209 7 0.755847C7 0.966484 6.9235 1.14168 6.77049 1.28142L4.55191 3.48087L6.77049 5.69945C6.91075 5.83971 6.98087 6.01822 6.98087 6.23497C6.98087 6.45173 6.91075 6.63024 6.77049 6.77049C6.61749 6.9235 6.43592 7 6.22579 7C6.01566 7 5.84022 6.9235 5.69945 6.77049L3.5 4.55191Z" fill="#A9A9A9"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <div className="bg-light-purple w-full border-1 border-stroke p-3.5 rounded-xl ">
              <div className="flex justify-between">

                <div className="flex items-center gap-4">
                  <div className="p-3.5 border-1 border-stroke rounded-lg bg-white">
                    <img src={file} alt="" className='w-4' />
                  </div>

                  <div className="font-Montserrat text-black">
                    <h3 className='font-bold text-sm'>Buku Ajar 2</h3>
                    <p className='text-xs'>10 MB</p>
                  </div>
                </div>

                <div className="mt-1.5 mr-1">
                  <svg width="10" height="10" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 4.55191L1.28142 6.77049C1.14117 6.91075 0.962659 6.98087 0.745901 6.98087C0.529143 6.98087 0.350637 6.91075 0.210382 6.77049C0.0701272 6.63024 0 6.45173 0 6.23497C0 6.01822 0.0701272 5.83971 0.210382 5.69945L2.42896 3.48087L0.210382 1.28142C0.0701272 1.14117 0 0.96266 0 0.745902C0 0.529144 0.0701272 0.350638 0.210382 0.210383C0.350637 0.0701276 0.529143 0 0.745901 0C0.962659 0 1.14117 0.0701276 1.28142 0.210383L3.5 2.42896L5.69945 0.210383C5.83971 0.0701276 6.01821 0 6.23497 0C6.45173 0 6.63024 0.0701276 6.77049 0.210383C6.9235 0.363388 7 0.545209 7 0.755847C7 0.966484 6.9235 1.14168 6.77049 1.28142L4.55191 3.48087L6.77049 5.69945C6.91075 5.83971 6.98087 6.01822 6.98087 6.23497C6.98087 6.45173 6.91075 6.63024 6.77049 6.77049C6.61749 6.9235 6.43592 7 6.22579 7C6.01566 7 5.84022 6.9235 5.69945 6.77049L3.5 4.55191Z" fill="#A9A9A9"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Modul