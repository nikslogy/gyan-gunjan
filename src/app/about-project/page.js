"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"

export default function AboutProject() {
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(
    parseInt(searchParams.get("currentSlide") || "0")
  )
  const [mounted, setMounted] = useState(false)

  const images = [
    { src: "/images/Bohag_Bihu.png", alt: "Traditional dancers in red attire" },
    { src: "/images/Arecanut_01.png", alt: "Second Image" },
    { src: "/images/lahaul_hp.jpg", alt: "Third Image" },
    { src: "/images/Sindoor_Play.jpeg", alt: "Fourth Image" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  useEffect(() => {
    // Trigger mount animation
    setMounted(true)
  }, [])

  return (
    <main className={`min-h-screen bg-white transition-all duration-1000 ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
    }`}>
      <NavBar />
      
      {/* Main container with padding */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Page title */}
          <h1 className={`text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
          }`}>
            About the Project
          </h1>

          {/* Project tag */}
          <div className="inline-block w-full">
            <span className="bg-[#E7B24B] text-black font-bold px-2 md:px-12 py-6 rounded-custom2 transition-colors text-2xl">
              Iks Gyan Gunjan
            </span>
          </div>
          
          {/* Image slider section */}
          <div className={`transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="rounded-custom overflow-hidden relative h-[550px]">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Slider navigation dots */}
            <div className="flex justify-center gap-3 mt-6">
              {images.map((_, index) => (
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

          {/* Content section */}
          <div className={`prose prose-lg mx-auto transition-all duration-700 delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-black">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

                </p>
              </div>
              <div className="text-black">
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </div>
          <div className="inline-block w-full">
            <span className="bg-[#E7B24B] text-black font-bold px-4 md:px-20 py-6 rounded-custom2 transition-colors text-2xl">
              Gyan Gunjan Logo Concept
            </span>
          </div>
          <Image src="/images/GyanGunjan-Logo-concept.png" alt="Gyan Gunjan Logo Concept" width={800} height={400} className="object-contain w-full" />
        </div>
      </div>
    <Footer />
    </main>
  )
}

