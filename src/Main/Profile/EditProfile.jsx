import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'
import profil from '../../assets/img_profil.jpeg'

const EditProfile = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  
  // UI states
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [originalData, setOriginalData] = useState({}) // Store original data to compare changes

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true)
        
        // Try to get fresh data from API
        const response = await authAPI.getProfile()
        const userData = response.data || response.user || response
        
        // Prepare user data
        const userDataObj = {
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || userData.no_hp || '',
        }
        
        // Set form data from API response
        setFormData({
          ...userDataObj,
          password: '',
        })
        
        // Store original data for comparison
        setOriginalData(userDataObj)
        
      } catch (err) {
        console.error('Error loading profile:', err)
        
        // Fallback to user from context if API fails
        if (user) {
          const userDataObj = {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || user.no_hp || '',
          }
          
          setFormData({
            ...userDataObj,
            password: '',
          })
          
          setOriginalData(userDataObj)
        }
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [user])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Clear messages when user types
    if (error) setError('')
    if (success) setSuccess('')
      
      // Phone number validation (only numbers)
      if (name === 'phone') {
        const numericValue = value.replace(/\D/g, '')
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }
    }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      // Prepare data to send - only include changed fields
      const dataToSend = {}
      
      // Only include name if changed
      if (formData.name !== originalData.name) {
        dataToSend.name = formData.name
      }
      
      // Only include email if changed
      if (formData.email !== originalData.email) {
        dataToSend.email = formData.email
      }
      
      // Only include phone if changed
      if (formData.phone !== originalData.phone) {
        dataToSend.phone = formData.phone
      }

      // Only include password if it's filled
      if (formData.password && formData.password.trim() !== '') {
        dataToSend.password = formData.password
      }

      // Check if there are any changes
      if (Object.keys(dataToSend).length === 0) {
        setError('Tidak ada perubahan yang perlu disimpan.')
        setSaving(false)
        return
      }

      // Call API
      const response = await authAPI.completeProfile(dataToSend)
      
      // Update user context with new data
      const updatedUser = response.data || response.user || response
      if (updatedUser) {
        updateUser(updatedUser)
      }

      // Show success message
      setSuccess('Profil berhasil diperbarui!')
      
      // Update original data with new values
      setOriginalData({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      })
      
      // Clear password field
      setFormData(prev => ({ ...prev, password: '' }))

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/profile')
      }, 1500)

    } catch (err) {
      console.error('Error updating profile:', err)
      
      // Handle specific validation errors from backend
      if (err.errors) {
        // If there are specific field errors, show them
        const errorMessages = []
        
        if (err.errors.email) {
          errorMessages.push(`Email: ${err.errors.email[0]}`)
        }
        if (err.errors.phone) {
          errorMessages.push(`Telepon: ${err.errors.phone[0]}`)
        }
        if (err.errors.name) {
          errorMessages.push(`Nama: ${err.errors.name[0]}`)
        }
        if (err.errors.password) {
          errorMessages.push(`Password: ${err.errors.password[0]}`)
        }
        
        if (errorMessages.length > 0) {
          setError(errorMessages.join('. '))
        } else {
          setError(err.message || 'Gagal memperbarui profil. Silakan coba lagi.')
        }
      } else {
        setError(err.message || 'Gagal memperbarui profil. Silakan coba lagi.')
      }
    } finally {
      setSaving(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <section className='relative w-full min-h-screen flex items-center justify-center'>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-main border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-Montserrat">Memuat data...</p>
        </div>
      </section>
    )
  }

  return (
    <section className='relative w-full min-h-screen flex flex-col justify-center p-11'>
      <div className="mb-6">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 rounded-full bg-purple-main p-2 hover:bg-purple-700 transition-colors"
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <circle cx="8.5" cy="8.5" r="8.5" fill="#ffffff"/>
            <path d="M12.5652 7.47346V9.5266H7.94565L9.74215 11.3231L8.5 12.5652L4.43478 8.50003L8.5 4.43481L9.74215 5.67696L7.94565 7.47346H12.5652Z" fill="#9747FF"/>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="border border-[#A9A9A9] w-full rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center">
        <h2 className='font-Montserrat font-bold text-purple-main text-xl mb-7 text-center'>Edit Profil</h2>
        
        {/* Profile Image */}
        <div className="w-20 h-20 rounded-full mb-6 overflow-hidden bg-purple-secondary">
          <img src={profil} alt="Profile" className='w-full h-full object-cover' />
        </div>

        {/* Success Message */}
        {success && (
          <div className="w-full bg-green-50 border-2 border-green-200 rounded-xl p-3 flex items-start gap-2 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z" fill="#16A34A"/>
            </svg>
            <p className='font-Montserrat text-sm text-green-600'>{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-start gap-2 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="#DC2626"/>
            </svg>
            <p className='font-Montserrat text-sm text-red-600'>{error}</p>
          </div>
        )}

        {/* Name Input */}
        <div className="px-4 py-3 w-full flex flex-col border-2 border-stroke rounded-xl gap-2 mb-2 focus-within:border-purple-main transition-colors">
          <label htmlFor="name" className='font-Montserrat text-black/50 text-xs'>Nama</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            required
            className='w-full font-Montserrat text-base font-medium focus:outline-none transition-colors' 
          />
        </div>

        {/* Email Input */}
        <div className="px-4 py-3 w-full flex flex-col border-2 border-stroke rounded-xl gap-2 mb-2 focus-within:border-purple-main transition-colors">
          <label htmlFor="email" className='font-Montserrat text-black/50 text-xs'>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            required
            className='w-full font-Montserrat text-base font-medium focus:outline-none transition-colors' 
          />
        </div>

        {/* Phone Input */}
        <div className="px-4 py-3 w-full flex flex-col border-2 border-stroke rounded-xl gap-2 mb-2 focus-within:border-purple-main transition-colors">
          <label htmlFor="phone" className='font-Montserrat text-black/50 text-xs'>Nomor Telepon</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            placeholder="08123456789"
            pattern="[0-9]*"
            inputMode="numeric"
            className='w-full font-Montserrat text-base font-medium focus:outline-none transition-colors' 
          />
        </div>

        {/* Password Input */}
        <div className="px-4 py-3 w-full flex flex-col border-2 border-stroke rounded-xl gap-2 mb-2 focus-within:border-purple-main transition-colors">
          <label htmlFor="password" className='font-Montserrat text-black/50 text-xs'>Password Baru (Opsional)</label>
          <div className="flex items-center justify-between gap-2">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password" 
              value={formData.password}
              placeholder='Kosongkan jika tidak ingin mengubah' 
              onChange={handleChange}
              className='w-full font-Montserrat text-base font-medium focus:outline-none transition-colors placeholder:text-sm placeholder:text-gray-400' 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="flex-shrink-0"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4C5 4 1.73 7.11 1 10c.73 2.89 4 6 9 6s8.27-3.11 9-6c-.73-2.89-4-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="#A9A9A9"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l2.95 2.95c1.23-1.14 2.18-2.51 2.79-4.41-.98-3.86-4.69-6.5-9.5-6.5-1.43 0-2.8.26-4.07.74l2.18 2.18c.46-.14.95-.24 1.46-.24zM1 2.27l2.28 2.28.46.46C2.08 6.15 1.12 7.52.5 9.5c.98 3.86 4.69 6.5 9.5 6.5 1.55 0 3.03-.3 4.38-.84l.42.42L17.73 18 19 16.73 2.27 1 1 2.27zM6.53 7.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="#A9A9A9"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={saving}
          className="w-full bg-purple-main text-white font-Montserrat font-semibold py-3 rounded-xl mt-6 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menyimpan...
            </>
          ) : (
            'Simpan'
          )}
        </button>
      </form>
    </section>
  )
}

export default EditProfile