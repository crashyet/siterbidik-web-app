import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import file from '../../assets/ic_file.png'
import PDFViewer from '../../components/PDFViewer'

const CapaianPembelajaran = () => {
  const navigate = useNavigate()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

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
            <h1 className='font-Montserrat font-bold text-white text-3xl'>Capaian Pembelajaran</h1>
            <p className='font-Montserrat font-normal text-white text-[13px]'>
              Dokumen ini berisi capaian pembelajaran yang menjadi panduan dalam proses belajar mengajar.
            </p>
          </div>
        </div>

        <div className="py-12 w-full min-h-[calc(100vh-50vh)] flex flex-col items-start gap-6.5 bg-white rounded-t-[30px]">
          <div className="px-10 w-full gap-4.5 flex flex-col">
            <h1 className='font-Montserrat font-bold text-purple-secondary'>Dokumen PDF</h1>
            <div className='border-1 border-purple-secondary w-full'></div>
          </div>

          <div onClick={openFullscreen} className="flex flex-col w-full px-5">
            <div className="bg-light-purple w-full border-1 border-stroke py-3.5 px-3.5 rounded-xl ">
              <div className="flex justify-between">

                <div className="flex items-center gap-4">
                  <div className="p-3.5 border-1 border-stroke rounded-lg bg-white">
                    <img src={file} alt="" className='w-4' />
                  </div>

                  <div className="font-Montserrat text-black">
                    <h3 className='font-bold text-sm mb-1'>Capaian Pembelajaran</h3>
                    <p className='text-xs'>PDF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* Toolbar */}
          <div className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
            <button onClick={closeFullscreen} className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H7.83L12.71 6.12C13.1 5.73 13.1 5.09 12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7L4.71 11.29C4.32 11.68 4.32 12.31 4.71 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.83 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill="#333"/>
              </svg>
            </button>
            
            <h1 className="font-Montserrat font-semibold text-gray-800 text-base flex-1 text-center truncate px-4">
              Capaian Pembelajaran
            </h1>

            {/* <div className="flex items-center gap-2">
              <button className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z" fill="#333"/>
                </svg>
              </button>
              <button className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#333"/>
                </svg>
              </button>
              <button className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="#333"/>
                </svg>
              </button>
            </div> */}
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-y-auto w-full bg-gray-100 flex justify-center">
             <div className="w-full max-w-4xl py-4">
                <PDFViewer file="/document/Capaian_Pembelajaran.pdf" />
             </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CapaianPembelajaran
