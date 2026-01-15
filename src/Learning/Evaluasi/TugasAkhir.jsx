import React from 'react'
import { useNavigate } from 'react-router-dom'
import { examData } from '../../data/examData'

const TugasAkhir = () => {
  const navigate = useNavigate()

  // Convert examData object to array for mapping
  const exams = Object.values(examData)

  return (
    <section className='relative w-full min-h-screen bg-white py-6 px-8'>
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 mt-5">
        {/* Back Button */}
        <button
          onClick={() => navigate('/evaluasi')}
          className="flex items-center gap-2 rounded-full bg-purple-main p-2 hover:bg-purple-700 transition-colors"
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <circle cx="8.5" cy="8.5" r="8.5" fill="#ffffff"/>
            <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
          </svg>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-center text-purple-main font-Montserrat">Penilaian Tugas<br/>Akhir</h1>
      </div>

      {/* Exam List */}
      <div className="space-y-4">
        <div
          onClick={() => navigate('/tugas-akhir/detail')}
          className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="#9747FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-sm mb-1">Terampil Bernegosiasi di Dunia Kerja</h3>
              <p className="text-xs text-gray-400">Pipit Dwi Komariah</p>
            </div>

            {/* Status */}
            <div className="flex-shrink-0">
              <span className={`text-xs font-normal text-gray-400`}>
                (Belum selesai)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TugasAkhir