// Centralized video data configuration
import avatar from "../assets/profil.jpeg"
export const videosData = [
  {
    id: 1,
    title: "Tema 1.1 Orientasi",
    thumbnail: "/thumbnail/1-1-orientasi.png",
    videoUrl: "/video/Tema-1.1-Orientasi.mp4",
    views: 36,
    uploadDate: "3 Hari yang lalu",
    duration: "0:39",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar // atau path ke avatar jika ada
    },
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla libero a turpis viverra vehicula. Sed ac pellentesque ligula, ac pharetra justo. Donec ut erat vitae tortor accumsan convallis...",
    comments: [
      {
        id: 1,
        username: "@Arofah Aziz",
        date: "3 Hari yang lalu",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla libero a turpis viverra vehicula. Sed ac pellentesque ligula, ac pharetra justo. Donec ut erat vitae tortor accumsan convallis. Aenean ornare commodo porttitor. Mauris in condimentum. Etiam sed sagittis ex, in tempus lacus. Cras iaculis ante et purus molestie lacinia. Mauris id dolor et velit tempus imperdiet sit amet vel arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
      }
    ],
    backRoute: "/simulasi"
  },
  {
    id: 2,
    title: "Tema 1.2 Pengajuan",
    thumbnail: "/thumbnail/1-2-pengajuan.png",
    videoUrl: "/video/Tema-1.2-Pengajuan.mp4",
    views: 28,
    uploadDate: "5 Hari yang lalu",
    duration: "0:34",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Materi pembelajaran tentang pengajuan dalam berbicara...",
    comments: [],
    backRoute: "/simulasi"
  },
  {
    id: 3,
    title: "Tema 1.3 Penawaran",
    thumbnail: "/thumbnail/1-3-penawaran.png",
    videoUrl: "/video/Tema-1.3-Penawaran.mp4",
    views: 42,
    uploadDate: "1 Minggu yang lalu",
    duration: "0:41",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Pembelajaran tentang penawaran dalam keterampilan berbicara...",
    comments: [],
    backRoute: "/simulasi"
  },
  {
    id: 4,
    title: "Tema 1.4 Persetujuan",
    thumbnail: "/thumbnail/1-4-persetujuan.png",
    videoUrl: "/video/Tema-1.4-Persetujuan.mp4",
    views: 55,
    uploadDate: "2 Minggu yang lalu",
    duration: "0:31",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Pembelajaran tentang persetujuan dalam keterampilan berbicara...",
    comments: [],
    backRoute: "/simulasi"
  },
  {
    id: 5,
    title: "Tema 1.5 Penutup",
    thumbnail: "/thumbnail/1-5-penutup.png",
    videoUrl: "/video/Tema-1.5-Penutup.mp4",
    views: 31,
    uploadDate: "2 Minggu yang lalu",
    duration: "0:28",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Belajar tentang intonasi yang baik dalam berbicara...",
    comments: [],
    backRoute: "/simulasi"
  },
  {
    id: 6,
    title: "Tema 2.1 Orientasi",
    thumbnail: "/thumbnail/2-1-orientasi.png",
    videoUrl: "/video/Tema-2.1-Orientasi.mp4",
    views: 47,
    uploadDate: "3 Minggu yang lalu",
    duration: "0:22",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Pentingnya orientasi dalam komunikasi verbal...",
    comments: [],
    backRoute: "/simulasi"
  },
  {
    id: 7,
    title: "Tema 2.2 Pengajuan",
    thumbnail: "/thumbnail/2-2-pengajuan.png",
    videoUrl: "/video/Tema-2.2-Pengajuan.mp4",
    views: 39,
    uploadDate: "3 Minggu yang lalu",
    duration: "0:27",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Pembelajaran tentang pengajuan dalam keterampilan berbicara...",
    comments: [],
    backRoute: "/simulasi"
  },
  {
    id: 8,
    title: "Tema 2.3 Penawaran",
    thumbnail: "/thumbnail/2-3-penawaran.png",
    videoUrl: "/video/Tema-2.3-Penawaran.mp4",
    views: 63,
    uploadDate: "1 Bulan yang lalu",
    duration: "0:41",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Pembelajaran tentang penawaran dalam keterampilan berbicara...",
    comments: [],
    backRoute: "/simulasi"
  },
  {
    id: 9,
    title: "Tema 2.4 Persetujuan",
    thumbnail: "/thumbnail/2-4-persetujuan.png",  
    videoUrl: "/video/Tema-2.4-Persetujuan.mp4",
    views: 71,
    uploadDate: "1 Bulan yang lalu",
    duration: "0:22",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Pembelajaran tentang persetujuan dalam keterampilan berbicara...",
    comments: [],
    backRoute: "/simulasi"
  },
  {
    id: 10,
    title: "Tema 2.5 Penutup",
    thumbnail: "/thumbnail/2-5-penutup.png",
    videoUrl: "/video/Tema-2.5-Penutup.mp4",
    views: 25,
    uploadDate: "1 Bulan yang lalu",
    duration: "0:25",
    author: {
      name: "Pipit Dwi Komariah",
      avatar: avatar
    },
    description: "Pembelajaran tentang penutup dalam keterampilan berbicara...",
    comments: [],
    backRoute: "/simulasi"
  }
];

// Helper function to get video by ID
export const getVideoById = (id) => {
  return videosData.find(video => video.id === parseInt(id));
};

// Helper function to get all videos
export const getAllVideos = () => {
  return videosData;
};
