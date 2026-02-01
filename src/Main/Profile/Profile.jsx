import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'
import LogoutModal from '../../components/LogoutModal'

import ic_chat from '../../assets/ic_chat.png'
import ic_logout from '../../assets/ic_logout.png'
import ic_edit from '../../assets/ic_pencil.png'
import ic_more from '../../assets/ic_more.png'
// import profil from '../../assets/img_profil.jpeg'
import profil from '../../assets/tl.webp'
import thumb from '../../assets/thumb.jpg'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isActive, setIsActive] = useState("video")
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState(null)

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true)
        
        // Try to get fresh data from API
        const response = await authAPI.getProfile()
        const userData = response.data || response.user || response
        
        // Set profile data
        setProfileData(userData)
        
      } catch (err) {
        console.error('Error loading profile:', err)
        
        // Fallback to user from context if API fails
        if (user) {
          setProfileData(user)
        }
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [user])

  // Use profileData if available, otherwise fallback to context user
  const displayUser = profileData || user

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false)
    await logout()
    navigate('/login')
  }

  const handleLogoutCancel = () => {
    setShowLogoutModal(false)
  }

  return (
    <section className='relative' id='profile'>
      {/* Loading State */}
      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-main border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-Montserrat">Memuat profil...</p>
          </div>
        </div>
      ) : (
        <div className="w-[90%] mx-auto">
          <div className="flex items-center justify-between mt-10 p-5 border-1 border-purple-secondary rounded-3xl">

            <div className="flex gap-4 items-center">
              <div className="bg-purple-secondary h-16 w-16 p-1 rounded-full relative overflow-hidden">
                <img src={displayUser?.photo_url || profil} alt="" className='object-cover w-full h-full rounded-full' />
              </div>

              <div className="flex flex-col gap-0.5 font-Montserrat text-black">
                <h1 className='font-bold text-sm'>{displayUser?.name || 'Memuat...'}</h1>
                <h2 className='font-semibold text-xs opacity-50'>{displayUser?.role || ''}</h2>
                <p className='text-xs opacity-50'>{displayUser?.role === 'siswa' ? `NISN: ${displayUser?.nisn}` : `Email: ${displayUser?.email || 'undefined'}`}</p>
              </div>
            </div>

          <button onClick={() => navigate('/profile/edit')} className="">
            <img src={ic_edit} alt="" className='w-8' />
          </button>
        </div>

        <div className="flex items-center justify-between mt-8 px-3">
          <div className="flex gap-5 font-Montserrat font-bold text-sm text-purple-main">
            <button onClick={() => setIsActive("video")} className={isActive === "video" ? "border-b-2 border-purple-main" : ""}>Video</button>
            <button onClick={() => setIsActive("komentar")} className={isActive === "komentar" ? "border-b-2 border-purple-main" : ""}>Komentar</button>
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate('/profile/#')} className='bg-white p-3 shadow-lg rounded-xl'>
              <img src={ic_chat} alt="" className='w-4' />
            </button>
            <button onClick={handleLogoutClick} className='bg-white p-3 shadow-lg rounded-xl hover:bg-red-50 transition-colors'>
              <img src={ic_logout} alt="" className='w-4' />
            </button>
          </div>
        </div>

        {/* <div className="mt-8 mb-10">
          {isActive === "video" && (
            <div className='flex flex-col gap-6'>
              <button className="w-full rounded-2xl shadow-md">
                <div className="rounded-t-2xl h-36 overflow-hidden">
                  <img src={thumb} className='object-cover w-full h-full' />
                </div>

                <div className="flex items-start justify-between px-5.5 py-4">
                  <div className="text-start font-Montserrat">
                    <h1 className='font-bold text-sm text-black'>Penilaian Praktik 2</h1>
                    <div className="flex justify-between text-nowrap text-[#A9A9A9] font-medium text-xs mt-1 gap-2">
                      <div className="flex">
                        <p>36</p>
                        <p>&nbsp;x ditonton</p>
                      </div>

                      <p>•</p>

                      <div className="flex">
                        <p>10</p>
                        <p>&nbsp;Hari yang lalu</p>
                      </div>
                    </div>
                  </div>

                  <button>
                    <img src={ic_more} alt="" className='w-1' />
                  </button>
                </div>
              </button>

              <button className="w-full rounded-2xl shadow-md">
                <div className="rounded-t-2xl h-36 overflow-hidden">
                  <img src={thumb} className='object-cover w-full h-full' />
                </div>

                <div className="flex items-start justify-between px-5.5 py-4">
                  <div className="text-start font-Montserrat">
                    <h1 className='font-bold text-sm text-black'>Latihan Tugas</h1>
                    <div className="flex justify-between text-nowrap text-[#A9A9A9] font-medium text-xs mt-1 gap-2">
                      <div className="flex">
                        <p>1,9 jt</p>
                        <p>&nbsp;x ditonton</p>
                      </div>

                      <p>•</p>

                      <div className="flex">
                        <p>10</p>
                        <p>&nbsp;Bulan yang lalu</p>
                      </div>
                    </div>
                  </div>

                  <button>
                    <img src={ic_more} alt="" className='w-1' />
                  </button>
                </div>
              </button>
            </div>
          )}

          {isActive === "komentar" && (
            <div className="h-40">
              <h1>Komentar</h1>
            </div>
          )}
        </div> */}

        </div>
      )}

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </section>
  )
}

export default Profile