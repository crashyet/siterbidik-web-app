import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authAPI, assignmentAPI, getStorageUrl } from '../../services/api'
import profil from '../../assets/tl.webp'

const TugasAkhirDetail = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [profileData, setProfileData] = useState(null)
  const exam = { id: 'tugas_akhir_01', title: 'Terampil Bernegosiasi di Dunia Kerja' }

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Try to get fresh data from API
        const response = await authAPI.getProfile().catch(err => {
          console.warn('Silent profile fetch error:', err)
          return null
        })
        
        if (response) {
          const userData = response.data || response.user || response
          setProfileData(userData)
        }
      } catch (err) {
        console.error('Error loading profile:', err)
        // Fallback to user from context if API fails
        if (user) {
          setProfileData(user)
        }
      }
    }

    loadUserData()
  }, [user])

  const displayUser = profileData || user

  // Debug role detection
  useEffect(() => {
    if (displayUser) {
      console.log('=== ROLE DETECTION ===');
      console.log('User Role:', displayUser.role);
      console.log('Full User Object:', displayUser);
    }
  }, [displayUser])

  const [assignmentStatus, setAssignmentStatus] = useState('Belum Selesai')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('petunjuk') // 'petunjuk' or 'tugas'
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false)
  const [currentSubmission, setCurrentSubmission] = useState(null)
  const [mySubmission, setMySubmission] = useState(null)
  
  // Grading states
  const [score, setScore] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSavingGrade, setIsSavingGrade] = useState(false)

  const fileInputRef = useRef(null)

  // Submissions state (initialized as empty)
  const [submissions, setSubmissions] = useState([])

  // Fetch submissions for Guru
  const fetchSubmissions = async () => {
    try {
      const response = await assignmentAPI.getSubmissions('tugas_akhir', exam.id)
      // Map backend data to frontend format
      const mappedSubmissions = response.data.map(item => ({
        id: item.id,
        name: item.user.name,
        class: item.user.class,
        date: new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        avatar: item.user.photo ? getStorageUrl(item.user.photo) : profil,
        status: item.status,
        score: item.score,
        feedback: item.feedback,
        fileUrl: item.file_full_url
      }))
      setSubmissions(mappedSubmissions)
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    }
  }

  // Fetch current student's submission
  const fetchMySubmission = async () => {
    try {
      const response = await assignmentAPI.getMySubmission('tugas_akhir', exam.id)
      if (response.data) {
        setMySubmission(response.data)
        setAssignmentStatus('Selesai')
        setIsSubmitted(true)
        if (response.data.file_path) {
          setUploadedFile({ name: response.data.file_path.split('/').pop() })
        }
      }
    } catch (error) {
      console.error('Failed to fetch my submission:', error)
    }
  }

  useEffect(() => {
    if (displayUser?.role === 'guru' && activeTab === 'tugas' && exam?.id) {
      fetchSubmissions()
    } else if (displayUser?.role === 'siswa' && exam?.id) {
      fetchMySubmission()
    }
  }, [displayUser, activeTab, exam?.id])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
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
        const formData = new FormData()
        formData.append('type', 'tugas_akhir')
        formData.append('assignment_id', exam.id)
        formData.append('file', uploadedFile)

        const response = await assignmentAPI.uploadSubmission(formData)
        
        setMySubmission(response.data)
        setAssignmentStatus('Selesai')
        setIsSubmitted(true)
      } catch (error) {
        console.error('Upload failed:', error)
        alert(error.message || 'Gagal mengupload tugas. Pastikan file tidak terlalu besar.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSaveGrade = async () => {
    if (!score) return

    setIsSavingGrade(true)
    try {
      await assignmentAPI.gradeSubmission(currentSubmission.id, parseInt(score), feedback)
      
      // Refresh list
      await fetchSubmissions()
      
      setIsGradingModalOpen(false)
      setIsPreviewModalOpen(false)
      // Reset inputs
      setScore('')
      setFeedback('')
    } catch (error) {
      console.error('Save grade failed:', error)
      alert(error.message || 'Gagal menyimpan nilai')
    } finally {
      setIsSavingGrade(false)
    }
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
      <div className="px-8 pt-6 pb-45">
        <div className="flex items-center justify-between mb-4 mt-5">
          {/* Back Button */}
          <button
            onClick={() => navigate('/tugas-akhir')}
            className="flex items-center gap-2 rounded-full bg-purple-main p-2 hover:bg-purple-700 transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="8.5" r="8.5" fill="#ffffff"/>
              <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
            </svg>
          </button>
        </div>

        {/* Tabs for Guru */}
        {displayUser?.role === 'guru' && (
          <div className="flex justify-around border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('petunjuk')}
              className={`py-2 px-4 text-sm font-bold transition-colors ${
                activeTab === 'petunjuk' 
                  ? 'text-purple-main border-b-2 border-purple-main' 
                  : 'text-gray-400'
              }`}
            >
              Petunjuk
            </button>
            <button
              onClick={() => setActiveTab('tugas')}
              className={`py-2 px-4 text-sm font-bold transition-colors ${
                activeTab === 'tugas' 
                  ? 'text-purple-main border-b-2 border-purple-main' 
                  : 'text-gray-400'
              }`}
            >
              Tugas Siswa
            </button>
          </div>
        )}

        {/* Petunjuk Tab Content */}
        {activeTab === 'petunjuk' && (
          <>
            {/* Title and Info */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <h1 className="text-base font-bold text-black">Terampil Bernegosiasi di Dunia Kerja</h1>
              <button className="p-1">
                <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2" cy="2" r="2" fill="#000000"/>
                  <circle cx="2" cy="8" r="2" fill="#000000"/>
                  <circle cx="2" cy="14" r="2" fill="#000000"/>
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-2">100 Point</p>
            
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="6" fill="#9CA3AF"/>
              </svg>
              <span>Pipit Dwi Komariah</span>
              <span>•</span>
              <span>15 Januari 2026</span>
            </div>

            <div className="border border-gray-200 rounded-2xl mb-5"></div>

            {/* Content Box */}
            <div className="rounded-2xl mb-32">
              <div className="space-y-4">
                {/* Tujuan */}
                <div>
                  <h2 className="text-sm font-bold text-black mb-2">Tujuan</h2>
                  <ol className="list-decimal list-inside text-sm text-black leading-4 space-y-1">
                    <li>Mengasah keterampilan berbicara secara aktif, kreatif, dan kontekstual dalam dunia kerja</li>
                    <li>Meningkatkan kemampuan siswa dalam berkolaborasi atau bekerja sama dalam tim</li>
                  </ol>
                </div>

                {/* Sifat Proyek */}
                <div>
                  <h2 className="text-sm font-bold text-black mb-2">Sifat Proyek</h2>
                  <p className="text-sm text-black leading-4">Kelompok (3 - 4 orang)</p>
                </div>

                {/* Waktu */}
                <div>
                  <h2 className="text-sm font-bold text-black mb-2">Waktu</h2>
                  <p className="text-sm text-black leading-4">1 minggu</p>
                </div>

                {/* Petunjuk */}
                <div>
                  <h2 className="text-sm font-bold text-black mb-3">Petunjuk</h2>
                  <p className="text-sm text-black leading-4 mb-3">Sebelum Anda menyelesaikan proyek ini, pahami dan ikuti hal-hal berikut ini.</p>
                  <ol className="list-decimal list-inside text-sm text-black leading-4 space-y-2">
                    <li>Pilihlah topik negosiasi yang akan Anda praktikkan bersama tim. Topik harus selaras dengan konsentrasi keahlian Anda dan relevan dengan dunia kerja.</li>
                    <li>Susunlah teks negosiasi sesuai struktur dan kaidah kebahasaan teks negosiasi.</li>
                    <li>Tentukan pembagian peran.</li>
                    <li>Lakukan latihan agar proses pengambilan video berjalan lancar.</li>
                    <li>Jika persiapan sudah selesai, lakukan perekaman video. Anda bisa menggunakan kamera telepon atau kamera biasa.</li>
                    <li>Unggahlah video yang telah tim Anda buat ke dalam Siterbidik.</li>
                  </ol>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Display Grade for Students */}
        {displayUser?.role === 'siswa' && isSubmitted && mySubmission?.score !== null && (
          <div className="bg-purple-50 rounded-3xl p-6 mb-8 border border-purple-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-black">Hasil Penilaian</h2>
              <div className="bg-purple-main text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                Nilai: {mySubmission.score}
              </div>
            </div>
            {mySubmission.feedback && (
              <div className="bg-white/60 rounded-2xl p-4 border border-purple-100">
                <p className="text-[10px] text-purple-600 font-bold mb-1">Feedback Guru:</p>
                <p className="text-xs text-gray-700 leading-relaxed italic">"{mySubmission.feedback}"</p>
              </div>
            )}
          </div>
        )}

        {/* Tugas Siswa Tab Content */}
        {activeTab === 'tugas' && (
          <div className="space-y-4 mb-20 animate-fadeIn">
            {submissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={submission.avatar} alt={submission.name} className="w-10 h-10 rounded-full object-cover border border-purple-100" />
                  <div>
                    <h3 className="text-sm font-bold text-black">{submission.name}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-gray-500">{submission.date}</p>
                      {submission.score !== null && (
                        <>
                          <span className="text-[10px] text-gray-300">•</span>
                          <span className="text-[10px] font-bold text-purple-main">Nilai: {submission.score}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setCurrentSubmission(submission)
                    setIsPreviewModalOpen(true)
                  }}
                  className="bg-purple-main/10 text-purple-main text-[10px] font-bold py-1.5 px-4 rounded-full hover:bg-purple-main hover:text-white transition-colors"
                >
                  {submission.score !== null ? 'Lihat/Edit' : 'Nilai'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section - Only for Students or Petunjuk Tab */}
      {displayUser?.role === 'siswa' && activeTab === 'petunjuk' && (
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
      )}
      {/* Video Preview Modal */}
      {isPreviewModalOpen && currentSubmission && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl">
            {/* Modal Header */}
            <div className="bg-purple-main p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={currentSubmission.avatar} alt="" className="w-9 h-9 rounded-full border-2 border-white/30" />
                <div>
                  <h3 className="font-bold text-sm leading-tight">{currentSubmission.name}</h3>
                  <p className="text-[10px] opacity-80">{currentSubmission.class} • {currentSubmission.date}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPreviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12.8334 1.16666L1.16675 12.8333M1.16675 1.16666L12.8334 12.8333" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Modal Content - Video Player */}
            <div className="bg-black aspect-video w-full flex items-center justify-center">
              <video 
                controls 
                autoPlay 
                className="w-full h-full"
                src={currentSubmission.fileUrl}
              >
                Your browser does not support the video element.
              </video>
            </div>

            {/* Modal Info & Actions */}
            <div className="p-6">
              <h4 className="text-black font-bold text-sm mb-4">Video Tugas Akhir Siswa</h4>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-600 font-bold text-xs py-3 rounded-2xl hover:bg-gray-200 transition-all"
                >
                  Tutup
                </button>
                <button 
                  onClick={() => {
                    setScore(currentSubmission.score || '')
                    setFeedback(currentSubmission.feedback || '')
                    setIsGradingModalOpen(true)
                  }}
                  className="flex-1 bg-purple-main text-white font-bold text-xs py-3 rounded-2xl hover:bg-purple-700 transition-all shadow-lg"
                >
                  {currentSubmission.score !== null ? 'Edit Nilai' : 'Beri Nilai'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grading Modal */}
      {isGradingModalOpen && currentSubmission && (
        <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden relative shadow-2xl">
            {/* Modal Header */}
            <div className="bg-purple-main p-6 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Penilaian Tugas Akhir</h3>
              <button 
                onClick={() => setIsGradingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12.8334 1.16666L1.16675 12.8333M1.16675 1.16666L12.8334 12.8333" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <img src={currentSubmission.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-purple-100" />
                <div>
                  <h4 className="font-bold text-black text-sm">{currentSubmission.name}</h4>
                  <p className="text-[10px] text-gray-500">{currentSubmission.class}</p>
                </div>
              </div>

              {/* Score Input */}
              <div className="mb-6">
                <label className="block text-black font-bold text-xs mb-2">Nilai (0-100)</label>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Masukkan nilai..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-purple-main transition-colors"
                />
              </div>

              {/* Feedback Input */}
              <div className="mb-6">
                <label className="block text-black font-bold text-xs mb-2">Feedback (Opsional)</label>
                <textarea 
                  rows="3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Masukkan feedback untuk siswa..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-purple-main transition-colors resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => setIsGradingModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-600 font-bold text-xs py-4 rounded-2xl hover:bg-gray-200 transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={handleSaveGrade}
                  disabled={!score || isSavingGrade}
                  className={`flex-1 font-bold text-xs py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                    !score || isSavingGrade 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-purple-main text-white hover:bg-purple-700'
                  }`}
                >
                  {isSavingGrade ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : 'Simpan Nilai'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default TugasAkhirDetail



