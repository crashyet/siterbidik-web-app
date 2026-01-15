import React from 'react'
import { useNavigate } from 'react-router-dom'

import file from '../../assets/ic_file.png'

const Materi = () => {
  const navigate = useNavigate()

  // Data materi yang tersedia
  const materiList = [
    {
      id: 1,
      title: 'Teks Negosiasi',
      description: 'Materi lengkap tentang teks negosiasi',
      totalPages: 14,
      path: '/materi/teks-negosiasi'
    }
    // Bisa ditambahkan materi lain di sini
  ]

  return (
    <>
      <section className='bg-purple-main w-full min-h-screen flex flex-col'>
        <div className="px-13 py-18 flex flex-col items-start justify-center gap-8">
          <button onClick={() => navigate('/modul')} className="flex items-center gap-2 rounded-full border border-purple-secondary p-1.5">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.5" cy="8.5" r="8.5" fill="#D9D9D9"/>
              <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
            </svg>
            <h1 className='font-Montserrat font-bold text-stroke text-xs'>Kembali</h1>
          </button>

          <div className="flex flex-col gap-4">
            <h1 className='font-Montserrat font-bold text-white text-3xl'>Materi Pembelajaran</h1>
            <p className='font-Montserrat font-normal text-white text-[13px]'>
              Pilih materi yang ingin dipelajari dengan tampilan flipbook interaktif.
            </p>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col items-start gap-6.5 bg-white rounded-t-[30px] py-12">
          <div className="px-10 w-full gap-4.5 flex flex-col">
            <h1 className='font-Montserrat font-bold text-purple-secondary'>Daftar Materi</h1>
            <div className='border-1 border-purple-secondary w-full'></div>
          </div>

          <div className="flex flex-col w-full px-5 gap-4">
            {materiList.map((materi) => (
              <div 
                key={materi.id}
                onClick={() => navigate(materi.path)}
                className="bg-light-purple w-full border-1 border-stroke py-3.5 px-3.5 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 border-1 border-stroke rounded-lg bg-white">
                      <img src={file} alt="" className='w-4' />
                    </div>

                    <div className="font-Montserrat text-black">
                      <h3 className='font-bold text-sm mb-1'>{materi.title}</h3>
                      <p className='text-xs text-gray-500'>{materi.description}</p>
                      <p className='text-xs text-purple-main mt-1'>{materi.totalPages} Halaman</p>
                    </div>
                  </div>

                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1L6.5 6L1.5 11" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Materi