import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home.jsx'
import Modul from './components/Modul.jsx'
import Profile from './components/Profile.jsx'

import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Splash from './components/Splash.jsx'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="-mt-8">
        <Navbar />
      </div>

      <Routes>
        <Route index element={<Home />} />
        <Route path="/modul" element={<Modul />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>

    // <>
    //   <Home />
    // </>
  )
}

export default App
