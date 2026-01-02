import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Video1() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1); // 1 = 100%, 0 = 0%
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const hideControlsTimeoutRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Auto-play when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Auto-play prevented:", err);
      });
    }
  }, []);

  // Auto-hide controls when playing
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing timeout
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      
      // Set timeout to hide controls after 3 seconds
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      // Show controls when paused
      setShowControls(true);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    }

    // Cleanup timeout on unmount
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoClick = () => {
    // Show controls when video is clicked
    setShowControls(true);
    
    // If playing, reset the hide timer
    if (isPlaying && hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleVideoEnded = () => {
    setHasEnded(true);
    setIsPlaying(false);
    setShowControls(true);
  };

  const handleReload = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setHasEnded(false);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        // Unmute and restore previous volume
        videoRef.current.muted = false;
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        // Mute
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      // Auto unmute if volume is changed while muted
      if (isMuted && newVolume > 0) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      // Auto mute if volume is set to 0
      if (newVolume === 0) {
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Video Player Container */}
      <div ref={playerContainerRef} className="relative w-full bg-black">
        {/* VIDEO */}
        <video
          ref={videoRef}
          src="/video/Tema-1.1-Orientasi.mov"
          className="w-full aspect-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnded}
          onClick={handleVideoClick}
        />

        {/* CLOSE BUTTON */}
        <button 
          onClick={() => navigate('/simulasi')}
          className="absolute -top-1 -left-1 bg-purple-main text-white rounded-br-2xl p-2.5 w-11.5 h-9 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* SETTINGS BUTTON */}
        <button className="absolute top-3 right-3 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
            <path d="M12 3V5M12 19V21M21 12H19M5 12H3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* CENTER CONTROLS */}
        {showControls && (
          <div className="absolute inset-0 flex items-center justify-center gap-8 pointer-events-none">
            <button className="text-white pointer-events-auto">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8933 14.52L6.2 9.09333C5.45333 8.56 5.45333 7.44 6.2 6.92L13.8933 1.48C14.7867 0.866667 16 1.49333 16 2.57333V13.4267C16 14.5067 14.7867 15.1333 13.8933 14.52ZM2.66667 1.33333V14.6667C2.66667 15.4 2.06667 16 1.33333 16C0.599999 16 0 15.4 0 14.6667V1.33333C0 0.6 0.599999 0 1.33333 0C2.06667 0 2.66667 0.6 2.66667 1.33333Z" fill="white"/>
              </svg>
            </button>

            <button
              onClick={hasEnded ? handleReload : togglePlay}
              className="rounded-full w-16 h-16 flex items-center justify-center pointer-events-auto"
            >
              {hasEnded ? (
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.3947 6.5C17.7105 4.3 15.1842 1.5 10.7632 1.5C5.5 1.5 1.5 5.5 1.5 10.5C1.5 15.5 5.71053 19.5 10.7632 19.5C13.5 19.5 16.0263 18.3 17.7105 16.5M21.5 1.5V7.5C21.5 8.1 21.0789 8.5 20.4474 8.5H14.1316" stroke="white" stroke-width="3" stroke-linecap="round"/>
                </svg>

              ) : isPlaying ? (
                <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 0C2.44928 0 1.60143 0.346172 0.976311 0.962363C0.351189 1.57855 0 2.41429 0 3.28571V19.7143C0 20.5857 0.351189 21.4214 0.976311 22.0376C1.60143 22.6538 2.44928 23 3.33333 23H5C5.88405 23 6.7319 22.6538 7.35702 22.0376C7.98214 21.4214 8.33333 20.5857 8.33333 19.7143V3.28571C8.33333 2.41429 7.98214 1.57855 7.35702 0.962363C6.7319 0.346172 5.88405 0 5 0H3.33333ZM15 0C14.1159 0 13.2681 0.346172 12.643 0.962363C12.0179 1.57855 11.6667 2.41429 11.6667 3.28571V19.7143C11.6667 20.5857 12.0179 21.4214 12.643 22.0376C13.2681 22.6538 14.1159 23 15 23H16.6667C17.5507 23 18.3986 22.6538 19.0237 22.0376C19.6488 21.4214 20 20.5857 20 19.7143V3.28571C20 2.41429 19.6488 1.57855 19.0237 0.962363C18.3986 0.346172 17.5507 0 16.6667 0H15Z" fill="white"/>
                </svg>

              ) : (
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.96646e-06 1.94153V22.0557C3.96646e-06 23.5896 1.71509 24.5215 3.03591 23.6866L19.0829 13.6295C19.3638 13.4544 19.5952 13.2122 19.7556 12.9253C19.9159 12.6385 20 12.3164 20 11.9889C20 11.6615 19.9159 11.3394 19.7556 11.0525C19.5952 10.7657 19.3638 10.5234 19.0829 10.3483L3.03591 0.310652C2.73857 0.121245 2.39483 0.0143882 2.04096 0.00135396C1.68708 -0.0116803 1.3362 0.0695911 1.02532 0.236595C0.71444 0.403599 0.455091 0.650143 0.274631 0.950218C0.0941719 1.25029 -0.000707 1.59278 3.96646e-06 1.94153Z" fill="white"/>
                </svg>

              )}
            </button>

            <button className="text-white pointer-events-auto">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.10667 14.52L9.8 9.09333C10.5467 8.56 10.5467 7.44 9.8 6.92L2.10667 1.48C1.21333 0.866667 0 1.49333 0 2.57333V13.4267C0 14.5067 1.21333 15.1333 2.10667 14.52ZM13.3333 1.33333V14.6667C13.3333 15.4 13.9333 16 14.6667 16C15.4 16 16 15.4 16 14.6667V1.33333C16 0.6 15.4 0 14.6667 0C13.9333 0 13.3333 0.6 13.3333 1.33333Z" fill="white"/>
              </svg>
            </button>
          </div>
        )}

        {/* BOTTOM CONTROLS */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4">
          <div className="flex items-center gap-3 mb-2">
            {/* Time Display */}
            <span className="text-white text-xs font-semibold font-Montserrat">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Progress Bar - Custom Implementation */}
            <div 
              className="flex-1 relative h-1 bg-gray-600 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                const newTime = percentage * duration;
                if (videoRef.current) {
                  videoRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                  // Reset hasEnded if seeking before the end
                  if (newTime < duration - 0.5) {
                    setHasEnded(false);
                  }
                }
              }}
            >
              {/* Progress Fill */}
              <div 
                className="absolute top-0 left-0 h-full bg-purple-main rounded-full pointer-events-none"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              
              {/* Thumb */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-main rounded-full shadow-md cursor-grab active:cursor-grabbing"
                style={{ 
                  left: `calc(${(currentTime / duration) * 100}% - 8px)`,
                  border: '3px solid #9747FF'
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  const progressBar = e.currentTarget.parentElement;
                  
                  const handleMouseMove = (moveEvent) => {
                    const rect = progressBar.getBoundingClientRect();
                    const moveX = moveEvent.clientX - rect.left;
                    const percentage = Math.max(0, Math.min(1, moveX / rect.width));
                    const newTime = percentage * duration;
                    if (videoRef.current) {
                      videoRef.current.currentTime = newTime;
                      setCurrentTime(newTime);
                      // Reset hasEnded if seeking before the end
                      if (newTime < duration - 0.5) {
                        setHasEnded(false);
                      }
                    }
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  
                  const progressBar = e.currentTarget.parentElement;
                  
                  const handleTouchMove = (moveEvent) => {
                    const rect = progressBar.getBoundingClientRect();
                    const touch = moveEvent.touches[0];
                    const moveX = touch.clientX - rect.left;
                    const percentage = Math.max(0, Math.min(1, moveX / rect.width));
                    const newTime = percentage * duration;
                    if (videoRef.current) {
                      videoRef.current.currentTime = newTime;
                      setCurrentTime(newTime);
                      // Reset hasEnded if seeking before the end
                      if (newTime < duration - 0.5) {
                        setHasEnded(false);
                      }
                    }
                  };
                  
                  const handleTouchEnd = () => {
                    document.removeEventListener('touchmove', handleTouchMove);
                    document.removeEventListener('touchend', handleTouchEnd);
                  };
                  
                  document.addEventListener('touchmove', handleTouchMove);
                  document.addEventListener('touchend', handleTouchEnd);
                }}
              />
            </div>

            {/* Volume & Fullscreen */}
            <div className="flex items-center gap-3">
              {/* Volume Control */}
              <div className="relative flex items-center">
                {/* Volume Slider - Vertical */}
                {showVolumeSlider && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 rounded-lg p-2 flex flex-col items-center">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="h-24 w-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-main"
                      style={{
                        writingMode: 'bt-lr',
                        WebkitAppearance: 'slider-vertical',
                        background: `linear-gradient(to top, #9747FF ${volume * 100}%, #4B5563 ${volume * 100}%)`
                      }}
                    />
                  </div>
                )}
                
                <button 
                  onClick={() => setShowVolumeSlider(!showVolumeSlider)} 
                  className="text-white"
                >
                  {isMuted || volume === 0 ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                      <path d="M9 5L5 8H2v4h3l4 3V5z"/>
                      <line x1="12" y1="7" x2="18" y2="13" stroke="white" strokeWidth="2"/>
                      <line x1="18" y1="7" x2="12" y2="13" stroke="white" strokeWidth="2"/>
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                      <path d="M9 5L5 8H2v4h3l4 3V5zM12 10c0-0.8-0.5-1.5-1-1.8v3.6c0.5-.3 1-1 1-1.8z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                      <path d="M9 5L5 8H2v4h3l4 3V5zM14 10c0-1.5-1-2.5-2-3v6c1-.5 2-1.5 2-3z"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Fullscreen Button */}
              <button onClick={toggleFullscreen} className="text-white">
                {isFullscreen ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                    <path d="M7 3v4H3M13 3v4h4M7 17v-4H3M13 17v-4h4"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                    <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Information Section */}
      <div className="bg-white px-5 py-4">
        {/* Title and Stats */}
        <h2 className="font-Montserrat font-bold text-black text-base">
          Tema 1.1 Orientasi
        </h2>
        <p className="font-Montserrat text-gray-600 text-xs mt-1">
          36 x ditonton • 3 Hari yang lalu
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mt-5">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div>
            <p className="font-Montserrat font-semibold text-black text-xs">
              Pipit Dwi Komariah
            </p>
          </div>
        </div>

        {/* Description Box */}
        <div className="mt-4 bg-stroke rounded-2xl px-6 py-4">
          <h3 className="font-Montserrat font-bold text-black text-xs mb-2">
            Deskripsi
          </h3>
          <p className="font-Montserrat text-gray-700 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla libero a turpis viverra vehicula. Sed ac pellentesque ligula, ac pharetra justo. Donec ut erat vitae tortor accumsan convallis... <span className="font-Montserrat font-semibold text-black text-xs">Selengkapnya</span>
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="font-Montserrat font-bold text-black text-base mb-4">
            2 Komentar
          </h3>

          {/* Add Comment Input */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
            <input
              type="text"
              placeholder="Tambahkan Komentar..."
              className="flex-1 font-Montserrat text-sm text-gray-500 border-b border-gray-300 pb-2 outline-none focus:border-purple-main"
            />
          </div>

          {/* Comment 1 */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-Montserrat font-semibold text-black text-sm">
                  @Arofah Aziz
                </p>
                <span className="font-Montserrat text-gray-500 text-xs">
                  3 Hari yang lalu
                </span>
              </div>
              <p className="font-Montserrat text-gray-700 text-xs mt-1 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla libero a turpis viverra vehicula. Sed ac pellentesque ligula, ac pharetra justo. Donec ut erat vitae tortor accumsan convallis. Aenean ornare commodo porttitor. Mauris in condimentum. Etiam sed sagittis ex, in tempus lacus. Cras iaculis ante et purus molestie lacinia. Mauris id dolor et velit tempus imperdiet sit amet vel arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

