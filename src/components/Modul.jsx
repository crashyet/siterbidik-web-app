import React from 'react'

import book from '../assets/ic_book.png'
import file from '../assets/ic_file.png'

const Modul = () => {
  return (
    <section className='relative' id='modul'>
      <div className="w-[85%] flex flex-col items-center mx-auto">
        <div className="grid grid-cols-2 gap-6 mt-10">
          <button onClick={() => window.location.href = '/modul/#'}>
            <div className="bg-light-purple pl-10 pr-7 pt-12 pb-8 rounded-2xl relative">
              <div className="absolute bg-white text-purple-main top-0 left-0 w-24 py-1.5 rounded-br-2xl font-Montserrat font-bold text-sm">
                Silabus
              </div>
              <img src={book} alt="" className='h-12'/>
            </div>
          </button>

          <button onClick={() => window.location.href = '/modul/#'}>
            <div className="bg-light-purple pl-10 pr-7 pt-12 pb-8 rounded-2xl relative">
              <div className="absolute bg-white text-purple-main top-0 left-0 w-24 py-1.5 rounded-br-2xl font-Montserrat font-bold text-sm">
                RPP
              </div>
              <img src={book} alt="" className='h-12'/>
            </div>
          </button>

          <button onClick={() => window.location.href = '/modul/#'}>
            <div className="bg-light-purple pl-10 pr-7 pt-12 pb-8 rounded-2xl relative">
              <div className="absolute bg-white text-purple-main top-0 left-0 w-24 py-1.5 rounded-br-2xl font-Montserrat font-bold text-sm">
                Buku Ajar
              </div>
              <img src={book} alt="" className='h-12'/>
            </div>
          </button>

          <button onClick={() => window.location.href = '/modul/#'}>
            <div className="bg-light-purple pl-10 pr-7 pt-12 pb-8 rounded-2xl relative">
              <div className="absolute bg-white text-purple-main top-0 left-0 w-24 py-1.5 rounded-br-2xl font-Montserrat font-bold text-sm">
                Panduan
              </div>
              <img src={book} alt="" className='h-12'/>
            </div>
          </button>
        </div>

        <div className="">
          <h1>Unduhan</h1>
          <div className="">
            <div className="">

            </div>
            <div className="">

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Modul