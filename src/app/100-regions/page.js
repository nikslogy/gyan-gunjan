"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"

function RegionsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  const images = [
    { src: "/images/map.png", alt: "Map of India showing 100 regions" },
    { src: "/images/map.png", alt: "Second Map of India" },
    { src: "/images/map.png", alt: "Third Map of India" },
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
    <main className={`min-h-screen bg-white transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}>
      <NavBar />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Page title */}
          <h1 className={`text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}>
            100 Regions
          </h1>

          {/* Content section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Slider */}
            <div className={`transition-all duration-700 delay-500 relative ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              {/* Image slider container */}
              <div className="rounded-lg overflow-hidden relative h-[400px] lg:h-[500px]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
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
                    className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? "bg-[#7A2631]" : "bg-gray-300"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Text content */}
            <div className="space-y-6">
              <p className="text-justify text-black text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <p className="text-justify text-black text-lg leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default RegionsPage