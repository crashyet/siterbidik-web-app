import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { examData } from '../../data/examData'

const BicaraExamDetail = () => {
  const navigate = useNavigate()
  const { examId } = useParams()
  const exam = examData[examId]

  const [assignmentStatus, setAssignmentStatus] = useState('Belum Selesai')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    if (uploadedFile && !isSubmitted) {
      setIsLoading(true)
      try {
        // TODO: Add actual upload logic here
        // Example: await uploadToBackend(uploadedFile)
        await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated delay
        
        setAssignmentStatus('Selesai')
        setIsSubmitted(true)
      } catch (error) {
        console.error('Upload failed:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!exam) {
    return (
      <section className='relative w-full min-h-screen bg-white p-6'>
        <p>Exam tidak ditemukan</p>
      </section>
    )
  }

  return (
    <section className='relative w-full min-h-screen bg-white'>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-purple-main border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-gray-700">Mengirim tugas...</span>
          </div>
        </div>
      )}
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

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*,audio/*,.pdf,.doc,.docx"
            className="hidden"
          />

          {/* File Preview or Upload Button */}
          {uploadedFile ? (
            <div className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 mb-3 flex items-center justify-between">
              {/* File Icon */}
              <div className="flex items-center gap-3">
                <div className="bg-black rounded-lg p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="white"/>
                    <path d="M14 2V8H20" fill="white"/>
                    <path d="M14 2L20 8" stroke="white" strokeWidth="1"/>
                  </svg>
                </div>
                {/* File Name */}
                <span className="text-sm text-black font-medium truncate max-w-[180px]">
                  {uploadedFile.name}
                </span>
              </div>
              {/* Delete Button - Hidden after submission */}
              {!isSubmitted && (
                <button 
                  onClick={handleRemoveFile}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#9CA3AF"/>
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <button 
              onClick={handleUploadClick}
              className="w-full max-h-[44px] bg-white border-2 border-purple-main text-purple-main py-3 rounded-2xl font-bold text-sm mb-3 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              + Upload Tugas
            </button>
          )}

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            disabled={!uploadedFile || isSubmitted}
            className={`w-full max-h-[44px] py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
              isSubmitted
                ? 'bg-green-500 text-white cursor-default'
                : uploadedFile 
                  ? 'bg-purple-main text-white hover:bg-purple-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitted ? 'Tugas telah dikirim' : 'Kirim'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default BicaraExamDetail
