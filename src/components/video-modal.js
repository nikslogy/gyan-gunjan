'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoModal({ isOpen, onClose, videoSource, title }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const speedMenuRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const isYouTubeVideo = videoSource?.includes('youtube.com') || videoSource?.includes('youtu.be');
  const API_BASE_URL = 'http://143.244.132.118';

  

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Add a small delay to ensure the modal is rendered
      setTimeout(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
          const viewportHeight = window.innerHeight;
          const modalRect = modalElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Calculate the target scroll position to center the modal
          const targetScrollPosition = scrollTop + modalRect.top - (viewportHeight - modalRect.height) / 2;
          
          window.scrollTo({
            top: targetScrollPosition,
            behavior: 'smooth'
          });
        }
      }, 100);

      // Auto-play when modal opens
      const playVideo = async () => {
        try {
          if (videoRef.current && !isYouTubeVideo) {
            videoRef.current.muted = false;
            await videoRef.current.play();
            setIsPlaying(true);
          }
        } catch (error) {
          console.log('Autoplay requires user interaction');
        }
      };
      playVideo();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isYouTubeVideo]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'f':
          handleFullscreen();
          break;
        case 'm':
          handleMute();
          break;
        case 'arrowleft':
        case 'j':
          handleSeekBackward();
          break;
        case 'arrowright':
        case 'l':
          handleSeekForward();
          break;
        case 'escape':
          onClose();
          break;
        case 'p':
          e.preventDefault();
          togglePictureInPicture();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      if (videoRef.current) {
        videoRef.current.style.objectFit = isCurrentlyFullscreen ? 'cover' : 'contain';
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target)) {
        setShowSpeedMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isYouTubeVideo) {
      // Handle YouTube player state changes
      window.onYouTubePlayerStateChange = (event) => {
        if (event.data === 1) { // Playing
          setIsPlaying(true);
        } else if (event.data === 2) { // Paused
          setIsPlaying(false);
        }
      };

      // Add message listener for YouTube iframe API
      const handleMessage = (event) => {
        if (event.data && typeof event.data === 'string') {
          try {
            const data = JSON.parse(event.data);
            if (data.event === 'onStateChange') {
              window.onYouTubePlayerStateChange(data);
            }
          } catch (e) {
            // Not a JSON message
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [isYouTubeVideo]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return hours > 0 
      ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const handlePlayPause = async () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      await videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = () => setVolume(v => {
    const newVolume = v === 0 ? 1 : 0;
    if (videoRef.current) videoRef.current.muted = newVolume === 0;
    return newVolume;
  });

  const handleSeekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  };

  const handleSeekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, currentTime + 10);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Picture-in-Picture error:', error);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.buffered.length > 0) {
        setBuffered((videoRef.current.buffered.end(0) / duration) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekTime = (e.target.value / 100) * duration;
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const handlePlaybackRateChange = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSpeedMenu(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
      ref={modalRef}
      tabIndex="-1"
    >
      <div className={`relative ${isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl mx-4'}`}>
        <div className="absolute -top-12 left-0 right-0 flex justify-between items-center text-white">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="hover:text-gray-300 transition-colors"
            aria-label="Close video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div 
          className={`relative ${isFullscreen ? 'h-screen' : 'aspect-video'} bg-black overflow-hidden`}
          onMouseMove={() => {
            setShowControls(true);
            clearTimeout(window.controlsTimeout);
            window.controlsTimeout = setTimeout(() => setShowControls(false), 3000);
          }}
        >
          {isYouTubeVideo ? (
            <iframe
              src={`${getYouTubeEmbedUrl(videoSource)}?autoplay=1&modestbranding=1&rel=0`}
              className="absolute w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                </div>
              )}
              
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={handlePlayPause}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                autoPlay
                muted={volume === 0}
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                <div className="relative w-full h-1.5 bg-gray-600 rounded-full cursor-pointer group">
                  <div 
                    className="absolute h-full bg-gray-400 rounded-full"
                    style={{ width: `${buffered}%` }}
                  />
                  <div 
                    className="absolute h-full bg-[#E7B24B] rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                  <input
                    type="range"
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                  />
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatTime(currentTime)}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handlePlayPause} 
                      className="text-white hover:text-[#E7B24B] transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleSeekBackward} 
                        className="text-white hover:text-[#E7B24B] transition-colors"
                        aria-label="Seek backward"
                      >
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11 16.07V7.93c0-.81-.91-1.28-1.58-.82l-4.56 3.06c-.62.42-.62 1.24 0 1.66l4.56 3.06c.67.47 1.58 0 1.58-.81zm1.66-3.25l4.56 3.06c.67.47 1.58 0 1.58-.81V7.93c0-.81-.91-1.28-1.58-.82l-4.56 3.06c-.62.42-.62 1.24 0 1.66z"/>
                        </svg>
                      </button>

                      <button 
                        onClick={handleSeekForward} 
                        className="text-white hover:text-[#E7B24B] transition-colors"
                        aria-label="Seek forward"
                      >
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L5.58 7.11C4.91 6.65 4 7.12 4 7.87v8.26c0 .75.91 1.22 1.58.76zM13 7.87v8.26c0 .75.91 1.22 1.58.76l5.77-4.07c.56-.4.56-1.24 0-1.63l-5.77-4.07c-.67-.47-1.58 0-1.58.76z"/>
                        </svg>
                      </button>
                    </div>

                    <span className="text-white text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    <div className="flex items-center gap-2 group relative">
                      <button 
                        onClick={handleMute} 
                        className="text-white hover:text-[#E7B24B] transition-colors p-2"
                        aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          {volume === 0 ? (
                            <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4v6h3l5 5v-6.71l4.84 4.84a.996.996 0 101.41-1.41L4.63 3.63a.996.996 0 00-1.41 0zM12 4L9.91 6.09 12 8.18V4zm0 16.91l-2.09-2.09L12 16.73v4.18zm4.71-4.07l-2.83-2.83c.37-.28.74-.57 1.09-.88.42-.36.74-.79.97-1.27.24-.48.36-.99.36-1.52s-.12-1.04-.36-1.52c-.23-.48-.55-.91-.97-1.27-.85-.74-1.86-1.34-3.02-1.81a.996.996 0 10-.72 1.86c.8.33 1.53.76 2.18 1.29.35.3.62.66.79 1.07.17.41.25.84.25 1.28s-.08.87-.25 1.28c-.17.41-.44.77-.79 1.07-.65.53-1.38.96-2.18 1.29a.996.996 0 00.72 1.86c1.16-.47 2.17-1.07 3.02-1.81z"/>
                          ) : volume <= 0.5 ? (
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                          ) : (
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                          )}
                        </svg>
                      </button>
                      
                      <div className="absolute left-full ml-2 bg-black/80 rounded-lg px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-32">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer volume-slider"
                          aria-label="Volume control"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <button 
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        className="text-white hover:text-[#E7B24B] transition-colors text-sm font-medium"
                        aria-label="Playback speed"
                      >
                        {playbackRate}x
                      </button>
                      <div 
                        ref={speedMenuRef}
                        className={`absolute bottom-full right-0 mb-2 ${showSpeedMenu ? 'block' : 'hidden'} bg-black/90 rounded-lg overflow-hidden shadow-xl`}
                      >
                        {[0.5, 1, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => handlePlaybackRateChange(rate)}
                            className={`block w-full px-4 py-2.5 text-sm text-white hover:bg-[#E7B24B] hover:text-black transition-colors ${
                              playbackRate === rate ? 'bg-[#E7B24B] text-black' : ''
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={togglePictureInPicture}
                      className="text-white hover:text-[#E7B24B] transition-colors"
                      aria-label="Picture in Picture"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7h-8v6h10V7zm-2 4h-6V9h6v2zm4-8H3c-1.1 0-2 .9-2 2v12c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 14.01H3V4.98h18v14.03z"/>
                      </svg>
                    </button>

                    <button 
                      onClick={handleFullscreen}
                      className="text-white hover:text-[#E7B24B] transition-colors"
                      aria-label="Fullscreen"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        {isFullscreen ? (
                          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                        ) : (
                          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: #E7B24B;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #E7B24B;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: transform 0.2s;
        }

        .volume-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }

        .volume-slider::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #E7B24B ${props => props.volume * 100}%, #4B5563 ${props => props.volume * 100}%);
          border-radius: 9999px;
        }

        .volume-slider::-moz-range-track {
          background: linear-gradient(to right, #E7B24B ${props => props.volume * 100}%, #4B5563 ${props => props.volume * 100}%);
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}

function getYouTubeEmbedUrl(url) {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/);
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : '';
}