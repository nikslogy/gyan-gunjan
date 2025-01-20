"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection1() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  const [exitAnimation, setExitAnimation] = useState(false)

  const images = [
    { src: "/images/Bohag_Bihu.png", alt: "Traditional dancers in red attire" },
    { src: "/images/Arecanut_01.png", alt: "Second Image" },
    { src: "/images/lahaul_hp.jpg", alt: "Third Image" },
    { src: "/images/Sindoor_Play.jpeg", alt: "Fourth Image" }
  ];

  // Slider logic 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  const handleLearnMoreSec1 = () => {
    // Start exit animations
    setExitAnimation(true)

    // Navigate after animations complete
    setTimeout(() => {
      router.push('/about-project')
    }, 1000)
  }

  return (
    <section className="py-2 md:py-6 lg:py-6">
      <div className="grid md:grid-cols-2 gap-10 md:gap-18 items-start max-w-5xl mx-auto">
        <div className={`space-y-6 transition-all duration-700 ${exitAnimation ? 'translate-x-[-100px] opacity-0' : 'translate-x-0 opacity-100'
          }`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#7A2631] font-bold relative top-[-5]">
            Iks Gyan Gunjan
          </h2>
          <p className="text-black leading-relaxed text-base md:text-lg max-w-s mt-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.             
          </p>
          <button onClick={handleLearnMoreSec1} className="bg-[#F8D89A] font-inter text-black px-4 md:px-6 py-2 rounded-custom2 hover:bg-[#f6a93d] transition-colors text-sm">
            Learn More
          </button>
        </div>

        <div className={`transition-all duration-700 ${exitAnimation ? 'translate-x-[100px] opacity-0' : 'translate-x-0 opacity-100'
          }`}>
          <div className="relative h-[350px] md:h-[400px] lg:h-[350px] w-full">
            <div className="rounded-custom overflow-hidden relative h-full">
              {images.map((image, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}>
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
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${currentSlide === index ? "bg-[#9B2C2C]" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}