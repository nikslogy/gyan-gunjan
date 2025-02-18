"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { API_BASE_URL, getImageUrl } from '@/utils/api'

// Create a client component that uses useSearchParams
function AboutProjectContent() {
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const API_BASE_URL = 'http://143.244.132.118';


  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/about-project/`)
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
    <div className="page-wrapper">
      <div className="navbar-wrapper">
        <NavBar />
      </div>
      <main className="content-wrapper">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-16">

            {/* Page Title - Now Dynamic */}
            <h1 className={`mt-10 text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
              }`}>
              {aboutData.title || "About the Project"}
            </h1>

            {/* Image Slider - Now Dynamic */}
            <div className={`transition-all duration-700 delay-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
              <div className="rounded-custom overflow-hidden relative h-[550px]">
                {aboutData.images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"
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
                    className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? "bg-[#9B2C2C]" : "bg-gray-300"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Section - Now Dynamic */}
            <div className={`prose prose-lg mx-auto transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
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

            {/* Logo Section */}
            <div className="inline-block w-full">
              <span className="bg-[#E7B24B] text-black font-bold px-4 md:px-20 py-6 rounded-custom2 transition-colors text-2xl">
                Gyan Gunjan Logo Concept
              </span>
            </div>
            <Image
              src={"/images/gyangunjannewlogo.png"}
              alt="Gyan Gunjan Logo Concept"
              width={800}
              height={400}
              className="object-contain w-full max-w-xl mx-auto"
              sizes="(max-width: 768px) 100vw, 800px"
            />

            {/* Logo Description Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="prose prose-lg text-black max-w-none">
                <p className="text-justify">{aboutData.first_discripton || "..."}</p>
              </div>
              <div className="relative aspect-[4/3] w-full max-w-md mx-auto">
                <Image
                  src={aboutData.logo_detail_image || "/images/mulgyangunjan.png"}
                  alt="Logo Details"
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <p className="text-black text-justify">{aboutData.long_discripton || "..."}</p>

            {/* Repeated sections with consistent styling */}
            {[
              { img: "/images/Nature Logo 1 Cover.png", desc: aboutData.second_description },
              { img: "/images/Family.png", desc: aboutData.third_description },
              { img: "/images/Knowledge_Learning.png", desc: aboutData.fourth_description },
              { img: "/images/Art - Devi Black.png", desc: aboutData.fifth_description },
              { img: "/images/Village Gov.png", desc: aboutData.sixth_description }
            ].map((section, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[4/3] w-full max-w-md mx-auto order-1 md:order-none">
                  <Image
                    src={aboutData.logo_detail_image || section.img}
                    alt="Logo Details"
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="prose prose-lg text-black max-w-none">
                  <p className="text-justify">{section.desc || "..."}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Main component with Suspense boundary
export default function AboutProject() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        Loading...
      </div>
    }>
      <AboutProjectContent />
    </Suspense>
  )
}