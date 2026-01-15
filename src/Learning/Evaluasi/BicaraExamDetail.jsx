import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { examData } from '../../data/examData'

const BicaraExamDetail = () => {
  const navigate = useNavigate()
  const { examId } = useParams()
  const exam = examData[examId]

  const [assignmentStatus, setAssignmentStatus] = useState('Belum Selesai')

  if (!exam) {
    return (
      <section className='relative w-full min-h-screen bg-white p-6'>
        <p>Exam tidak ditemukan</p>
      </section>
    )
  }

  return (
    <section className='relative w-full min-h-screen bg-white'>
      {/* Header */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-4 mt-5">
          {/* Back Button */}
          <button
            onClick={() => navigate('/bicara-exam')}
            className="flex items-center gap-2 rounded-full bg-purple-main p-2 hover:bg-purple-700 transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="8.5" r="8.5" fill="#ffffff"/>
              <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
            </svg>
          </button>

          {/* Three Dots Menu */}
          {/* <button className="p-2">
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" fill="#000000"/>
              <circle cx="2" cy="8" r="2" fill="#000000"/>
              <circle cx="2" cy="14" r="2" fill="#000000"/>
            </svg>
          </button> */}
        </div>

        {/* Title and Info */}
        <h1 className="text-base font-bold text-black mb-2">{exam.title}</h1>
        <p className="text-xs text-gray-600 mb-2">{exam.points} Point</p>
        
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="6" fill="#9CA3AF"/>
          </svg>
          <span>{exam.author}</span>
          <span>•</span>
          <span>{exam.date}</span>
        </div>

        <div className="border border-gray-200 rounded-2xl mb-5"></div>

        {/* Content Box */}
        <div className="rounded-2xl mb-6">
          <p className="text-sm text-black leading-4 whitespace-pre-line">
            {exam.generalInstruction}
            {'\n\n'}
            {exam.situation}
            {'\n\n'}
            {exam.task}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl shadow-2xl">
        <div className="px-10 py-6">
          {/* Assignment Status */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Tugas</span>
            <span className="text-xs text-gray-400">({assignmentStatus})</span>
          </div>

          {/* Upload Button */}
          <button className="w-full max-h-[44px] bg-white border-2 border-purple-main text-purple-main py-3 rounded-2xl font-bold text-sm mb-3 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2">
            + Upload Tugas
          </button>

          {/* Submit Button */}
          <button className="w-full max-h-[44px] bg-purple-main text-white py-3 rounded-2xl font-bold text-sm hover:bg-purple-700 transition-all duration-200">
            Telah Selesai
          </button>
        </div>
      </div>
    </section>
  )
}

export default BicaraExamDetail
