import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LogoutModal from '../../components/LogoutModal'

import ic_chat from '../../assets/ic_chat.png'
import ic_logout from '../../assets/ic_logout.png'
import ic_edit from '../../assets/ic_pencil.png'
import ic_more from '../../assets/ic_more.png'
// import profil from '../../assets/img_profil.jpeg'
import profil from '../../assets/profil.jpeg'
import thumb from '../../assets/thumb.jpg'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isActive, setIsActive] = useState("video")
  const [showLogoutModal, setShowLogoutModal] = useState(false)

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
      <div className="w-[90%] mx-auto">
        <div className="flex items-center justify-between mt-10 p-5 border-1 border-purple-secondary rounded-3xl">

          <div className="flex gap-4 items-center">
            <div className="bg-purple-secondary h-16 w-16 p-1 rounded-full relative overflow-hidden">
              <img src={profil} alt="" className='object-cover w-full h-full rounded-full' />
            </div>

            <div className="flex flex-col font-Montserrat text-black">
              <h1 className='font-bold text-[13px]'>{user?.name || 'Pipit Dwi Komariah'}</h1>
              <h2 className='font-semibold text-[12px] opacity-25'>{user?.role || 'Siswa'}</h2>
              <p className='text-[11px] opacity-25'>NISN: {user?.nisn || '1234567890'}</p>
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