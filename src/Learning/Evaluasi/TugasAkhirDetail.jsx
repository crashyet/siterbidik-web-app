import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TugasAkhirDetail = () => {
  const navigate = useNavigate()
  const [assignmentStatus, setAssignmentStatus] = useState('Belum Selesai')

  return (
    <section className='relative w-full min-h-screen bg-white'>
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

        {/* Title and Info */}
        <h1 className="text-base font-bold text-black mb-2">Terampil Bernegosiasi di Dunia Kerja</h1>
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
        <div className="rounded-2xl mb-6">
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
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl shadow-2xl">
        <div className="px-10 py-6">
          {/* Assignment Status */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Tugas</span>
            <span className="text-xs text-gray-400">({assignmentStatus})</span>
          </div>

          {/* Upload Button */}
          <button className="w-full max-h-[44px] bg-white border-2 border-purple-main text-purple-main py-3 rounded-2xl font-bold text-sm mb-3 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2">
            + Upload Tugas
          </button>

          {/* Submit Button */}
          <button className="w-full max-h-[44px] bg-purple-main text-white py-3 rounded-2xl font-bold text-sm hover:bg-purple-700 transition-all duration-200">
            Telah Selesai
          </button>
        </div>
      </div>
    </section>
  )
}

export default TugasAkhirDetail
