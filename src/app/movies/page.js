"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import MovieSlider from "@/components/movie-slider"
import Image from 'next/image'
import VideoModal from "@/components/video-modal"
import dynamic from 'next/dynamic'

// Dynamically import components that need window object
const DynamicVideoModal = dynamic(() => import('@/components/video-modal'), {
  ssr: false
})

export default function MoviesPage() {
  const [mounted, setMounted] = useState(false)
  const [currentShortMovie, setCurrentShortMovie] = useState(0)
  const [currentRecommendedMovie, setCurrentRecommendedMovie] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const API_BASE_URL = 'http://143.244.132.118';


  const shortMovies = [
    { 
      src: "/images/short1.png", 
      alt: "Short movie 1", 
      title: "Short Movie 1",
      video: "/videos/short1.mp4"
    },
    { 
      src: "/images/short2.png", 
      alt: "Short movie 2", 
      title: "Short Movie 2",
      video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
    },
    { src: "/images/short3.png", alt: "Short movie 3", title: "Short Movie 3" },
    { src: "/images/short1.png", alt: "Short movie 4", title: "Short Movie 4" },
    { src: "/images/short2.png", alt: "Short movie 5", title: "Short Movie 5" },
  ]

  useEffect(() => {
    // Only run client-side code after mounting
    if (typeof window !== 'undefined') {
      setMounted(true)
      // Auto-rotate short movies
      const timer = setInterval(() => {
        setCurrentShortMovie((prev) => (prev + 1) % shortMovies.length)
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [])

  // Calculate visible movies for the slider
  const getVisibleMovies = () => {
    const movies = [...shortMovies]
    const result = []
    for (let i = 0; i < 3; i++) {
      const index = (currentShortMovie + i) % shortMovies.length
      result.push(movies[index])
    }
    return result
  }

  const movieResources = [
    {
      image: '/images/P1.svg',
      video: 'https://www.youtube.com/watch?v=aaNq2NL6D4A',
      title: 'Movie Title 1'
    },
    {
      image: '/images/P2.svg',
      video: '/videos/video1.mp4',
      title: 'Movie Title 2'
    },
    {
      image: '/images/P3.svg',
      video: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_2?autoplay=1&controls=1&rel=0&showinfo=0',
      isYoutube: true,
      title: 'Movie Title 3'
    },
  ];

  const handlePlayClick = (movie) => {
    // video playing logic
  };

  // Update recommended movies section with more movies
  const recommendedMovies = [
    { 
      image: '/images/movie1.png', 
      title: 'Recommended Movie 1',
      video: '/videos/recommended1.mp4'
    },
    { 
      image: '/images/movie2.png', 
      title: 'Recommended Movie 2',
      video: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'
    },
    { image: '/images/movie3.png', title: 'Recommended Movie 3' },
    { image: '/images/movie1.png', title: 'Recommended Movie 4' },
    { image: '/images/movie2.png', title: 'Recommended Movie 5' },
    { image: '/images/movie3.png', title: 'Recommended Movie 6' },
  ];

  // Calculate visible recommended movies for the slider
  const getVisibleRecommendedMovies = () => {
    const movies = [...recommendedMovies]
    const result = []
    for (let i = 0; i < 3; i++) {
      const index = (currentRecommendedMovie + i) % recommendedMovies.length
      result.push(movies[index])
    }
    return result
  }

  const handleWatchNow = (movie) => {
    setSelectedVideo(movie);
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null
  }

  return (
    <main className={`min-h-screen bg-white transition-all duration-1000 ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
    }`}>
      <NavBar />
      
      <div className="container mx-auto px-4 md:px-6 py-8"> {/* Reduced py-12 to py-8 */}
        <div className="max-w-5xl mx-auto space-y-12"> {/* Reduced space-y-24 to space-y-12 */}
          
          {/* Title */}
          <h1 className={`text-4xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
          }`}>
            Movies
          </h1>

          {/* Movie Slider Component */}
          <MovieSlider
            movies={movieResources} 
            onPlayClick={handlePlayClick}
          />

          {/* Recommended Movies Section */}
          <section>
            <div className="inline-block w-full mb-8 mt-10">
              <span className="bg-[#E7B24B] text-black font-bold px-4 md:px-12 py-6 rounded-custom2 transition-colors text-2xl">
                Recommended Movies
              </span>
            </div>

            <div className="relative rounded-lg overflow-hidden mt-8">
              {/* Film strip border - top */}
              <div className="h-8 w-full bg-[#7B7B7B]" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 20px, white 20px, white 48px)',
                }}
              />

              {/* Movies slider */}
              <div className="bg-[#7B7B7B] p-8 relative">
                {/* Previous button */}
                <button 
                  onClick={() => setCurrentRecommendedMovie((prev) => 
                    prev === 0 ? recommendedMovies.length - 1 : prev - 1
                  )}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full shadow-lg transition-all duration-300 ml-4"
                  aria-label="Previous recommended movie"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <span className="text-2xl font-bold">&lt;</span>
                  </div>
                </button>

                {/* Next button */}
                <button 
                  onClick={() => setCurrentRecommendedMovie((prev) => 
                    (prev + 1) % recommendedMovies.length
                  )}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full shadow-lg transition-all duration-300 mr-4"
                  aria-label="Next recommended movie"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <span className="text-2xl font-bold">&gt;</span>
                  </div>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getVisibleRecommendedMovies().map((movie, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-lg">
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        width={400}
                        height={300}
                        className="w-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                        <h3 className="text-white text-xl font-bold mb-4">{movie.title}</h3>
                        <button 
                          onClick={() => handleWatchNow(movie)}
                          className="bg-[#E7B24B] text-black px-6 py-2 rounded-full font-semibold transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        >
                          Watch Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Film strip border - bottom */}
              <div className="h-8 w-full bg-[#7B7B7B]" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 20px, white 20px, white 48px)',
                }}
              />

              {/* Navigation dots */}
              <div className="flex justify-center gap-3 mt-8">
                {recommendedMovies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentRecommendedMovie(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      currentRecommendedMovie === index 
                        ? "bg-[#7A2631] w-6" 
                        : "bg-gray-300 hover:bg-[#E7B24B]"
                    }`}
                    aria-label={`Go to recommended slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Short Movies Section */}
          <section className="pb-12">
            <div className="inline-block w-full mb-8 mt-20">
              <span className="bg-[#E7B24B] text-black font-bold px-4 md:px-12 py-6 rounded-custom2 transition-colors text-2xl">
                Short Movies
              </span>
            </div>

            <div className="relative mt-8">
              {/* Previous button */}
              <button 
                onClick={() => setCurrentShortMovie((prev) => 
                  prev === 0 ? shortMovies.length - 1 : prev - 1
                )}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full shadow-lg transition-all duration-300"
                aria-label="Previous slide"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="text-2xl font-bold">&lt;</span>
                </div>
              </button>

              {/* Next button */}
              <button 
                onClick={() => setCurrentShortMovie((prev) => 
                  (prev + 1) % shortMovies.length
                )}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full shadow-lg transition-all duration-300"
                aria-label="Next slide"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="text-2xl font-bold">&gt;</span>
                </div>
              </button>

              {/* Slider container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getVisibleMovies().map((movie, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-lg">
                    <Image
                      src={movie.src}
                      alt={movie.alt}
                      width={400}
                      height={300}
                      className="w-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      <h3 className="text-white text-xl font-bold mb-4">{movie.title}</h3>
                      <button 
                        onClick={() => handleWatchNow(movie)}
                        className="bg-[#E7B24B] text-black px-6 py-2 rounded-full font-semibold transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-3 mt-8">
                {shortMovies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentShortMovie(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      currentShortMovie === index 
                        ? "bg-[#7A2631] w-6" 
                        : "bg-gray-300 hover:bg-[#E7B24B]"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      {mounted && (
        <DynamicVideoModal 
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoSource={selectedVideo?.video}
          title={selectedVideo?.title}
        />
      )}
    </main>
  )
}