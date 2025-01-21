"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection2() {
  const router = useRouter()
  const [exitAnimation, setExitAnimation] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

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

  const handleLearnMoreSec2 = () => {
    // Start exit animations
    setExitAnimation(true)

    // Navigate after animations complete
    setTimeout(() => {
      router.push('/100-regions')
    }, 500)
  }

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-4xl mx-auto">
        {/* Slider container */}
        <div className="relative order-2 md:order-1 -ml-4 md:-ml-20">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[500px] relative">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
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
        <div className="space-y-4 md:space-y-6 order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#7A2631] font-bold relative top-[-5]">
            100 regions
          </h2>
          <p className="text-black leading-relaxed text-base md:text-lg max-w-s mt-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <button onClick={handleLearnMoreSec2} className="bg-[#F8D89A] text-black px-4 md:px-6 py-2 rounded-custom2 hover:bg-[#f6a93d] transition-colors text-sm">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

//nothing to see here