# 📚 Siterbidik Web App

Aplikasi web pembelajaran interaktif yang dirancang untuk membantu pengguna meningkatkan keterampilan berbicara melalui berbagai modul pembelajaran, simulasi, latihan, dan evaluasi.

## 🎯 Tujuan

Siterbidik Web App dikembangkan dengan tujuan untuk:

1. **Meningkatkan Keterampilan Berbicara** - Menyediakan platform pembelajaran yang terstruktur untuk meningkatkan kemampuan komunikasi verbal
2. **Pembelajaran Interaktif** - Memberikan pengalaman belajar yang engaging melalui video, simulasi, dan latihan praktis
3. **Evaluasi Komprehensif** - Memungkinkan pengguna untuk mengevaluasi kemajuan belajar mereka melalui tes dan penilaian tugas
4. **Aksesibilitas** - Menyediakan akses pembelajaran yang mudah dan dapat diakses kapan saja, di mana saja

## ✨ Manfaat

### Untuk Pengguna/Siswa:
- ✅ Belajar dengan kecepatan sendiri melalui modul-modul terstruktur
- ✅ Meningkatkan kepercayaan diri dalam berbicara
- ✅ Mendapatkan feedback melalui evaluasi dan penilaian
- ✅ Akses ke berbagai materi pembelajaran multimedia (video, simulasi)
- ✅ Tracking progress pembelajaran

### Untuk Pengajar/Institusi:
- ✅ Platform pembelajaran yang terorganisir
- ✅ Sistem evaluasi terintegrasi
- ✅ Monitoring progress siswa
- ✅ Materi pembelajaran yang dapat disesuaikan

## 🚀 Fitur Utama

### 1. **Autentikasi & Profil**
- Login dan registrasi pengguna
- Manajemen profil pengguna
- Edit profil dengan foto dan informasi personal

### 2. **Modul Pembelajaran**
- Berbagai modul pembelajaran terstruktur
- Materi pembelajaran multimedia
- Video pembelajaran interaktif

### 3. **Learning Path**
- **Simulasi** - Praktik berbicara dalam skenario simulasi
- **Latihan** - Latihan soal dan praktik berbicara
- **Evaluasi** - Tes keterampilan berbicara dan penilaian tugas akhir

### 4. **Video Player**
- Video pembelajaran dengan kontrol penuh
- Progress tracking
- Navigasi antar video

### 5. **UI/UX Modern**
- Desain responsif dan modern
- Animasi smooth dengan Tailwind CSS
- Navigasi intuitif dengan bottom navbar
- Tema purple yang konsisten

## 🛠️ Teknologi yang Digunakan

- **React 19.1.0** - Library JavaScript untuk membangun user interface
- **Vite 6.3.5** - Build tool yang cepat dan modern
- **React Router DOM 7.6.2** - Routing untuk aplikasi single-page
- **Tailwind CSS 4.1.8** - Utility-first CSS framework
- **ESLint** - Linting untuk kualitas kode

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (versi 16.x atau lebih tinggi)
- **npm** atau **yarn** package manager
- **Git** (opsional, untuk clone repository)

## 📦 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/siterbidik-web-app.git
cd siterbidik-web-app
```

### 2. Install Dependencies

Menggunakan npm:
```bash
npm install
```

Atau menggunakan yarn:
```bash
yarn install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Atau dengan yarn:
```bash
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia)

## 🏗️ Build untuk Production

Untuk membuat build production:

```bash
npm run build
```

Atau dengan yarn:
```bash
yarn build
```

File hasil build akan tersimpan di folder `dist/`

## 👀 Preview Production Build

Untuk melihat preview dari production build:

```bash
npm run preview
```

## 📁 Struktur Folder

```
siterbidik-web-app/
├── public/                 # File statis publik
├── src/
│   ├── Auth/              # Komponen autentikasi
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Splash/        # Splash screens
│   ├── Learning/          # Modul pembelajaran
│   │   ├── Learning.jsx
│   │   ├── Simulasi.jsx
│   │   ├── Latihan.jsx
│   │   ├── Evaluasi.jsx
│   │   └── Videos/        # Video pembelajaran
│   ├── Main/              # Halaman utama
│   │   ├── Home.jsx
│   │   ├── Modul.jsx
│   │   └── Profile/       # Profil pengguna
│   ├── components/        # Komponen reusable
│   │   ├── Header.jsx
│   │   └── Navbar.jsx
│   ├── context/           # React Context (AuthContext)
│   ├── services/          # API services
│   ├── assets/            # Gambar, icon, dll
│   ├── fonts/             # Custom fonts
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Kustomisasi

### Mengubah Warna Tema

Warna utama aplikasi menggunakan purple (`purple-main`). Untuk mengubah tema warna, edit konfigurasi Tailwind CSS atau file CSS yang relevan.

### Menambah Font Custom

Font custom (Montserrat) sudah dikonfigurasi. Untuk menambah font lain:
1. Tambahkan file font ke folder `src/fonts/`
2. Import di file CSS utama
3. Konfigurasi di Tailwind (jika diperlukan)

## 🔧 Konfigurasi

### Environment Variables

Buat file `.env` di root folder untuk konfigurasi environment:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Siterbidik
```

## 📱 Fitur Responsif

Aplikasi ini didesain untuk bekerja optimal di berbagai ukuran layar:
- 📱 Mobile (320px - 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (1024px+)

## 🧪 Testing

Untuk menjalankan linting:

```bash
npm run lint
```

## 🤝 Kontribusi

Kontribusi selalu diterima! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Project ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

## 👥 Tim Pengembang

- **Developer** - Adhit
- **Project** - Siterbidik Web Application

## 📞 Kontak & Dukungan

Jika Anda memiliki pertanyaan atau membutuhkan bantuan:
- 📧 Email: support@siterbidik.com
- 🐛 Issues: [GitHub Issues](https://github.com/username/siterbidik-web-app/issues)

## 🔄 Changelog

### Version 0.0.0 (Current)
- ✨ Initial release
- ✅ Implementasi autentikasi (Login/Register)
- ✅ Modul pembelajaran (Simulasi, Latihan, Evaluasi)
- ✅ Video player interaktif
- ✅ Manajemen profil pengguna
- ✅ UI/UX modern dengan Tailwind CSS

## 🙏 Acknowledgments

- React Team untuk library yang luar biasa
- Vite untuk build tool yang super cepat
- Tailwind CSS untuk styling yang efisien
- Semua kontributor open source

---

**Made with ❤️ by Siterbidik Team**
