import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { videoAPI } from '../../services/api'

const UploadVideo = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnailFile: null
  })
  const [videoPreview, setVideoPreview] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
      if (!validTypes.includes(file.type)) {
        alert('Format video tidak didukung. Gunakan MP4, WebM, atau MOV.')
        return
      }

      // Validate file size (max 500MB)
      const maxSize = 500 * 1024 * 1024
      if (file.size > maxSize) {
        alert('Ukuran video terlalu besar. Maksimal 500MB.')
        return
      }

      setFormData(prev => ({ ...prev, videoFile: file }))
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
    }
  }

  // Handle thumbnail file selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Format gambar tidak didukung. Gunakan JPG, PNG, atau WebP.')
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        alert('Ukuran gambar terlalu besar. Maksimal 5MB.')
        return
      }

      setFormData(prev => ({ ...prev, thumbnailFile: file }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      setError('Judul video wajib diisi!')
      return
    }

    if (!formData.videoFile) {
      setError('Pilih file video terlebih dahulu!')
      return
    }

    if (!formData.thumbnailFile) {
      setError('Pilih thumbnail terlebih dahulu!')
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setError('')

    try {
      // Prepare FormData for upload
      const uploadData = new FormData()
      uploadData.append('title', formData.title)
      uploadData.append('description', formData.description)
      uploadData.append('video', formData.videoFile)
      uploadData.append('thumbnail', formData.thumbnailFile)

      // Use XMLHttpRequest for real progress tracking
      const xhr = new XMLHttpRequest()
      
      // Setup promise-based XHR
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100)
            setUploadProgress(percentComplete)
          }
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            try {
              const errorData = JSON.parse(xhr.responseText)
              reject(new Error(errorData.message || errorData.error || 'Upload gagal'))
            } catch (e) {
              reject(new Error(`Server error: ${xhr.status}`))
            }
          }
        }

        xhr.onerror = () => reject(new Error('Koneksi jaringan terputus'))
        xhr.onabort = () => reject(new Error('Upload dibatalkan (timeout)'))

        xhr.open('POST', 'http://127.0.0.1:8000/api/videos')
        
        // Use the correct token key 'authToken' from api.js
        const token = localStorage.getItem('authToken')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.setRequestHeader('Accept', 'application/json')
        
        // Set timeout to 10 minutes (600,000ms)
        xhr.timeout = 600000 
        xhr.ontimeout = () => xhr.abort()

        xhr.send(uploadData)
      })

      const result = await uploadPromise
      console.log('Upload success:', result)
      navigate('/simulasi')
    } catch (error) {
      console.error('Upload error:', error)
      setError(error.message || 'Gagal mengupload video. Silakan coba lagi.')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <section className='relative min-h-screen bg-white pb-20'>
      {/* Header */}
      <div className="sticky top-0 bg-white z-50 px-5 pt-15 pb-3">
        <div className="flex items-center relative">
          {/* Back Button */}
          <button
            onClick={() => navigate('/simulasi')}
            className="flex items-center gap-2 rounded-full bg-purple-main p-1.5"
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="8.5" r="8.5" fill="#ffffff"/>
              <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
            </svg>
            <h1 className="font-Montserrat font-bold text-white text-xs">
              Kembali
            </h1>
          </button>

          {/* Title */}
          <h1 className="absolute left-1/2 -translate-x-1/2 font-Montserrat font-bold text-purple-main">
            Upload
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Video Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <input
              type="file"
              id="videoInput"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              onChange={handleVideoChange}
              className="hidden"
            />
            
            {videoPreview ? (
              <div className="space-y-3">
                <video
                  src={videoPreview}
                  controls
                  className="w-full max-h-48 rounded-lg mx-auto"
                />
                <p className="text-sm font-Montserrat text-gray-600">
                  {formData.videoFile?.name}
                </p>
                <button
                  type="button"
                  onClick={() => document.getElementById('videoInput').click()}
                  className="text-purple-main font-Montserrat font-semibold text-sm hover:underline"
                >
                  Ganti Video
                </button>
              </div>
            ) : (
              <label htmlFor="videoInput" className="cursor-pointer block">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"/>
                  <path d="M9 13h2v5a1 1 0 11-2 0v-5z"/>
                </svg>
                <p className="font-Montserrat font-medium text-gray-500 mb-1">Pilih file video</p>
                <p className="font-Montserrat text-xs text-gray-400">MP4, WebM, atau MOV (Maks. 500MB)</p>
              </label>
            )}
          </div>

          {/* Title Input */}
          <div className="border-2 border-gray-300 rounded-2xl p-4 focus-within:border-purple-main transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="title" className="font-Montserrat font-semibold text-sm text-black">
                Judul
              </label>
              <span className="text-xs text-gray-500 font-Montserrat">(Wajib diisi)</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11V8M8 5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul video..."
              className="w-full font-Montserrat text-sm focus:outline-none"
              required
            />
          </div>

          {/* Description Input */}
          <div className="border-2 border-gray-300 rounded-2xl p-4 focus-within:border-purple-main transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="description" className="font-Montserrat font-semibold text-sm text-black">
                Deskripsi
              </label>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tambahkan deskripsi video (opsional)..."
              rows="4"
              className="w-full font-Montserrat text-sm focus:outline-none resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                  <circle cx="10" cy="10" r="9" stroke="#DC2626" strokeWidth="2"/>
                  <path d="M10 6v4M10 14h.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="font-Montserrat text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && uploadProgress > 0 && (
            <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-Montserrat font-semibold text-purple-900 text-sm">
                  Mengupload video...
                </p>
                <p className="font-Montserrat font-bold text-purple-900 text-sm">
                  {uploadProgress}%
                </p>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-main h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="font-Montserrat text-purple-700 text-xs mt-2">
                Mohon tunggu, jangan tutup halaman ini...
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {/* Thumbnail Button */}
            <button
              type="button"
              onClick={() => document.getElementById('thumbnailInput').click()}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-full font-Montserrat font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="7" cy="8.5" r="1.5" fill="currentColor"/>
                <path d="M2 13l4-4 3 3 5-5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tambah Thumbnail
            </button>

            <input
              type="file"
              id="thumbnailInput"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleThumbnailChange}
              className="hidden"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-purple-main text-white font-Montserrat font-bold py-3 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Mengupload...
                </span>
              ) : (
                'Selesai'
              )}
            </button>
          </div>

          {/* Thumbnail Preview */}
          {thumbnailPreview && (
            <div className="mt-4 p-4 border-2 border-gray-200 rounded-2xl">
              <p className="font-Montserrat font-semibold text-sm mb-2">Thumbnail Preview:</p>
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="w-full max-h-40 object-cover rounded-lg"
              />
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default UploadVideo