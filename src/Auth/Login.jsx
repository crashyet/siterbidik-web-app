import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logoApp.svg'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Clear error when user starts typing
    if (error) setError('')
    
    // Validasi NISN hanya angka
    // if (name === 'nisn') {
    //   // Hanya izinkan angka
    //   const numericValue = value.replace(/\D/g, '')
    //   setFormData({
    //     ...formData,
    //     [name]: numericValue
    //   })
    // } else {
      setFormData({
        ...formData,
        [name]: value
      })
    // }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(formData.login, formData.password)
      
      if (result.success) {
        // Login berhasil, redirect ke home
        navigate('/home')
      } else {
        // Login gagal, tampilkan error
        setError(result.error || 'NISN/Email atau password salah')
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='relative bg-purple-main min-h-screen flex items-center justify-center px-6'>
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex gap-3 items-center">
            <img src={logo} alt="" className='w-10'/>
            <h1 className='font-Coolvetica text-3xl text-white'>Siterbidik</h1>
          </div>
          <p className='font-Montserrat text-white text-xs font-semibold mt-4'>Aplikasi Terampil Berbicara Di Depan Publik</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h2 className='font-Montserrat font-bold text-Text text-xl mb-6 text-center'>Masuk</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Login Input (NISN or Email) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="login" className='font-Montserrat font-semibold text-Text text-sm'>
                NISN / Email
              </label>
              <input
                type="text"
                id="login"
                name="login"
                value={formData.login}
                onChange={handleChange}
                placeholder="Masukkan NISN atau Email"
                required
                className='w-full px-4 py-3 border-2 border-stroke rounded-xl font-Montserrat text-sm focus:outline-none focus:border-purple-main transition-colors'
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className='font-Montserrat font-semibold text-Text text-sm'>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password Anda"
                  required
                  className='w-full px-4 py-3 border-2 border-stroke rounded-xl font-Montserrat text-sm focus:outline-none focus:border-purple-main transition-colors pr-12'
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-start gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="#DC2626"/>
                </svg>
                <p className='font-Montserrat text-sm text-red-600'>{error}</p>
              </div>
            )}

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {/* TODO: Implement forgot password */}}
                className='font-Montserrat font-medium text-purple-main text-xs hover:underline'
              >
                Lupa Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className='w-full bg-purple-main text-white py-3.5 rounded-full font-Montserrat font-bold text-sm hover:bg-purple-700 transition-colors shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-stroke"></div>
            <span className='font-Montserrat text-xs text-gray-400'>atau</span>
            <div className="flex-1 h-px bg-stroke"></div>
          </div> */}

          {/* Social Login Buttons */}
          {/* <div className="flex flex-col gap-3">
            <button className='w-full flex items-center justify-center gap-3 py-3 border-2 border-stroke rounded-full font-Montserrat font-semibold text-sm hover:bg-gray-50 transition-colors'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
              </svg>
              Masuk dengan Google
            </button>
          </div> */}

          {/* Register Link */}
          {/* <div className="text-center mt-6">
            <p className='font-Montserrat text-sm text-gray-600'>
              Belum punya akun?{' '}
              <button
                onClick={() => navigate('/register')}
                className='font-semibold text-purple-main hover:underline'
              >
                Daftar
              </button>
            </p>
          </div> */}
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-8">
          <p className='font-Montserrat text-white text-xs'>
            Made with love © SMKN1CILACAP
          </p>
        </div> */}
      </div>
    </section>
  )
}

export default Login
