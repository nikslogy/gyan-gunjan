"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"

export default function AboutProject() {
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Utility function to handle image URLs
  const getImageUrl = (path) => {
    if (!path) return '';
    try {
      new URL(path) // Check if already absolute URL
      return path
    } catch {
      return `http://127.0.0.1:8000${path.startsWith('/') ? path : `/${path}`}`
    }
  }

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/about-project/')
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        
        if (data.length > 0) {
          const firstItem = data[0]
          setAboutData({
            ...firstItem,
            images: firstItem.images.map(img => ({
              ...img,
              image: getImageUrl(img.image)
            })),
            logo_image: getImageUrl(firstItem.logo_image)
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

  // Slider animation effect
  useEffect(() => {
    if (!aboutData?.images) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === aboutData.images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [aboutData?.images])

  // Mount animation
  useEffect(() => {
    setMounted(true)
  }, [])

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen bg-white flex items-center justify-center text-red-500">Error: {error}</div>
  if (!aboutData) return null

  return (
    <main className={`min-h-screen bg-white transition-all duration-1000 ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
    }`}>
      <NavBar />
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Page Title - Now Dynamic */}
          <h1 className={`text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
          }`}>
            {aboutData.title || "About the Project"}
          </h1>

          {/* Project Tag - Now Dynamic */}
          <div className="inline-block w-full">
            <span className="bg-[#E7B24B] text-black font-bold px-2 md:px-12 py-6 rounded-custom2 transition-colors text-2xl">
              {aboutData.tag || "Iks Gyan Gunjan"}
            </span>
          </div>
          
          {/* Image Slider - Now Dynamic */}
          <div className={`transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="rounded-custom overflow-hidden relative h-[550px]">
              {aboutData.images.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.image}
                    alt={image.alt_text || "Project image"}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>

            {/* Slider Dots - Now Dynamic */}
            <div className="flex justify-center gap-3 mt-6">
              {aboutData.images.map((_, index) => (
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

          {/* Content Section - Now Dynamic */}
          <div className={`prose prose-lg mx-auto transition-all duration-700 delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-black whitespace-pre-line">
                <p>{aboutData.description_left}</p>
              </div>
              <div className="text-black whitespace-pre-line">
                <p>{aboutData.description_right}</p>
              </div>
            </div>
          </div>

          {/* Logo Section - Now Dynamic */}
          <div className="inline-block w-full">
            <span className="bg-[#E7B24B] text-black font-bold px-4 md:px-20 py-6 rounded-custom2 transition-colors text-2xl">
              Gyan Gunjan Logo Concept
            </span>
          </div>
          <Image 
            src={aboutData.logo_image} 
            alt="Gyan Gunjan Logo Concept" 
            width={800} 
            height={400} 
            className="object-contain w-full"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}