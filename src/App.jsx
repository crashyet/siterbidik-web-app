import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Splash from './Auth/Splash/Splash1.jsx'
import Splash2 from './Auth/Splash/Splash2.jsx'

import Home from './Main/Home.jsx'
import Modul from './Main/Modul.jsx'
import Profile from './Main/Profile/Profile.jsx'

import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'

import EditProfile from './Main/Profile/EditProfile.jsx'
import Learning from './Learning/Learning.jsx'
import Simulasi from './Learning/Simulasi.jsx'
import Latihan from './Learning/Latihan.jsx'

import Video1 from './Learning/Videos/Video1.jsx'

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
        <Route path="/home" element={<Home />} />
        <Route path="/modul" element={<Modul />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<EditProfile />} />
        <Route path='/learning' element={<Learning />} />
        <Route path='/simulasi' element={<Simulasi />} />
        <Route path='/latihan' element={<Latihan />} />
        <Route path='/video1' element={<Video1 />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
