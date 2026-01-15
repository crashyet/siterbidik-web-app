import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Splash from './Auth/Splash/Splash1.jsx'
import Splash2 from './Auth/Splash/Splash2.jsx'
import Login from './Auth/Login.jsx'

import Home from './Main/Home.jsx'
import Modul from './Main/Modul.jsx'
import Profile from './Main/Profile/Profile.jsx'

import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'

import EditProfile from './Main/Profile/EditProfile.jsx'

import Learning from './Learning/Learning.jsx'
import Simulasi from './Learning/Simulasi.jsx'
import Latihan from './Learning/Latihan.jsx'
import Evaluasi from './Learning/Evaluasi.jsx'
import CapaianPembelajaran from './Main/Modul/CapaianPembelajaran.jsx'
import Quiz from './Learning/Questions/Quiz.jsx'
import BicaraExam from './Learning/Evaluasi/BicaraExam.jsx'
import BicaraExamDetail from './Learning/Evaluasi/BicaraExamDetail.jsx'
import BukuAjar from './Main/Modul/BukuAjar.jsx'
import Panduan from './Main/Modul/Panduan.jsx'
import Materi from './Main/Modul/Materi.jsx'
import MateriFlipbook from './Main/Modul/MateriFlipbook.jsx'
import MateriFlipbookTurnJS from './Main/Modul/MateriFlipbookTurnJS.jsx'

import Video1 from './Learning/Videos/Video1.jsx'
import VideoPlayer from './Learning/Videos/VideoPlayer.jsx'

function AppContent() {
  const location = useLocation()
  
  // Daftar path yang MENAMPILKAN Header dan Navbar (whitelist)
  const showHeaderNavbar = ['/home', '/modul', '/profile']
  const shouldShowHeaderNavbar = showHeaderNavbar.includes(location.pathname)

  return (
    <>
      {shouldShowHeaderNavbar && <Header />}
      {shouldShowHeaderNavbar && (
        <div className="-mt-8">
          <Navbar />
        </div>
      )}

      <Routes>
        <Route index element={<Splash />} />
        <Route path='/splash2' element={<Splash2 />} />
        <Route path='/login' element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/modul" element={<Modul />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<EditProfile />} />
        <Route path='/learning' element={<Learning />} />
        <Route path='/simulasi' element={<Simulasi />} />
        <Route path='/latihan' element={<Latihan />} />
        <Route path='/evaluasi' element={<Evaluasi />} />
        <Route path='/capaian-pembelajaran' element={<CapaianPembelajaran />} />
        <Route path='/video1' element={<Video1 />} />
        <Route path='/video/:videoId' element={<VideoPlayer />} />
        <Route path='/quiz/:quizId' element={<Quiz />} />
        <Route path='/bicara-exam' element={<BicaraExam />} />
        <Route path='/bicara-exam/:examId' element={<BicaraExamDetail />} />
        <Route path='/buku-ajar' element={<BukuAjar />} />
        <Route path='/panduan' element={<Panduan />} />
        <Route path='/materi' element={<Materi />} />
        <Route path='/materi/teks-negosiasi' element={<MateriFlipbook />} />
        <Route path='/materi/teks-negosiasi-turnjs' element={<MateriFlipbookTurnJS />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
