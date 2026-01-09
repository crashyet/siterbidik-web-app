import React from 'react'

/**
 * Logout Confirmation Modal
 * 
 * @param {boolean} isOpen - Modal visibility state
 * @param {function} onClose - Function to close modal
 * @param {function} onConfirm - Function to execute on logout confirmation
 */
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-3xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex justify-center pt-8 pb-4">
            <div className="bg-red-100 rounded-full p-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 7L7 17M7 7L17 17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="#DC2626" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-6 text-center">
            <h2 className="font-Montserrat font-bold text-xl text-Text mb-2">
              Keluar dari Akun?
            </h2>
            <p className="font-Montserrat text-sm text-gray-500">
              Apakah Anda yakin ingin keluar dari akun Anda? Anda perlu login kembali untuk mengakses aplikasi.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 px-6 pb-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-Montserrat font-semibold text-sm rounded-full transition-colors duration-200"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-Montserrat font-semibold text-sm rounded-full transition-colors duration-200 shadow-lg"
            >
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  )
}

export default LogoutModal
