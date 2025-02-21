"use client"

import { useState, useEffect, Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { API_BASE_URL, getImageUrl } from '@/utils/api'

function AboutCKAContent() {
  const [mounted, setMounted] = useState(false)
  const [ckaData, setCkaData] = useState({
    title: '',
    images: [],
    description_left: '',
    description_right: '',
    vision: '',
    mission: '',
    external_link: {
      url: 'https://www.flame.edu.in/cka/about-the-centre.php',
      text: 'Learn More at FLAME CKA'
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about-cka/`)
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()

        if (data.length > 0) {
          const firstItem = data[0]
          setCkaData({
            ...firstItem,
            images: firstItem.images.map(img => ({
              ...img,
              image: getImageUrl(img.image)
            }))
          })
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Mount animation
  useEffect(() => {
    setMounted(true)
  }, [])

  // Slider animation
  useEffect(() => {
    if (!ckaData?.images) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === ckaData.images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [ckaData?.images])

  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <div className="navbar-wrapper">
        <NavBar />
      </div>
      <main className="content-wrapper flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-16">
            {loading ? (
              <div className="flex items-center justify-center py-12">Loading...</div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 text-red-500">Error: {error}</div>
            ) : ckaData ? (
              <>
                {/* Page Title */}
                <h1 className={`mt-10 text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
                }`}>
                  {ckaData.title || "About CKA"}
                </h1>

                {/* Image Slider */}
                <div className={`transition-all duration-700 delay-500 ${
                  mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <div className="rounded-custom overflow-hidden relative h-[300px] md:h-[550px]">
                    {ckaData.images.map((image, index) => (
                      <div
                        key={image.id}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          currentSlide === index ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={image.image}
                          alt={image.alt_text || "CKA image"}
                          fill
                          className="object-cover"
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Slider Dots */}
                  <div className="flex justify-center gap-3 mt-6">
                    {ckaData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          currentSlide === index ? "bg-[#9B2C2C]" : "bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Main Content Section */}
                <div className={`mx-auto transition-all duration-700 delay-700 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="text-black text-left list-inside list-disc">
                      <p dangerouslySetInnerHTML={{ __html: ckaData.description_left }} />
                    </div>
                    {/* Right Column */}
                    <div className="text-black text-left list-inside list-disc">
                      <p dangerouslySetInnerHTML={{ __html: ckaData.description_right }} />
                    </div>
                  </div>
                </div>

                {/* Vision Section */}
                <div className="inline-block w-full">
                  <span className="bg-[#E7B24B] text-black font-bold font-philosopher px-4 md:px-20 py-6 rounded-custom2 transition-colors text-2xl">
                    Our Vision
                  </span>
                </div>
                <div className="text-black text-justify">
                  <p dangerouslySetInnerHTML={{ __html: ckaData.vision }} />
                </div>

                {/* Mission Section */}
                <div className="inline-block w-full">
                  <span className="bg-[#E7B24B] text-black font-bold font-philosopher px-4 md:px-20 py-6 rounded-custom2 transition-colors text-2xl">
                    Our Mission
                  </span>
                </div>
                <div className="text-black text-justify">
                  <p dangerouslySetInnerHTML={{ __html: ckaData.mission }} />
                </div>

                {/* External Link Section */}
                <div className="space-y-6 text-center">
                  <a 
                    href={ckaData.external_link?.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block group"
                  >
                    <span className="bg-[#7A2631] text-white font-bold font-philosopher 
                      px-8 py-4 rounded-lg shadow-md transition-all duration-300 
                      hover:shadow-lg hover:bg-[#8B3641] hover:scale-105 
                      flex items-center gap-2"
                    >
                      {ckaData.external_link?.text}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-12">No data available</div>
            )}
          </div>
        </div>
      </main>
      <div className="mt-auto mb-0">
        <Footer />
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function AboutCKA() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        Loading...
      </div>
    }>
      <AboutCKAContent />
    </Suspense>
  )
}