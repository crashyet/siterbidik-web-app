const Update = () => {
  const updateLink = 'https://www.mediafire.com/file/l0d8jg0e2lee0tl/Siterbidik-v3.1.apk/file';

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-main to-purple-700 flex flex-col items-center justify-center px-6 py-8">
      {/* Icon */}
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
        <svg className="w-10 h-10 text-purple-main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-white font-Montserrat mb-3 text-center">
        Pembaruan Tersedia
      </h1>

      {/* Description */}
      <p className="text-white/80 text-center font-Montserrat text-sm mb-6 max-w-xs">
        Versi terbaru SITERBIDIK sudah tersedia. Silakan update untuk mendapatkan fitur dan perbaikan terbaru.
      </p>

      {/* Version */}
      <div className="bg-white/20 rounded-full px-4 py-1.5 mb-6">
        <span className="text-white text-sm font-Montserrat font-semibold">Versi 2.0</span>
      </div>

      {/* Warning */}
      <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-xl p-4 mb-6 max-w-xs">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          <p className="text-white/90 text-xs font-Montserrat">
            Update ini wajib dilakukan untuk melanjutkan penggunaan aplikasi.
          </p>
        </div>
      </div>

      {/* Update Button */}
      <a 
        href={updateLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full max-w-xs bg-white text-purple-main font-Montserrat font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        Update Sekarang
      </a>

      {/* Footer */}
      <p className="text-white/50 text-xs font-Montserrat mt-4">
        File akan diunduh dari MediaFire
      </p>
    </div>
  );
};

export default Update;
