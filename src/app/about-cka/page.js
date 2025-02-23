"use client"

import { useState, useEffect, Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"

function AboutCKAContent() {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Demo data
  const ckaData = {
    title: "About CKA (Centre for Knowledge Alternatives)",
    images: [
      {
        id: 1,
        image: "/images/About-The-Centre-for-Knowledge-Alternatives.jpg",
        alt_text: "CKA Building"
      },
      {
        id: 2,
        image: "/images/About-the-Centre1.png",
        alt_text: "CKA Activities"
      },
    ],
    description_left: `
      <h3 class="text-xl font-bold mb-4 text-[#7A2631]">Our Foundation</h3>
      <ul class="space-y-4">
        <li>A unique research initiative to understand India through experiences rather than theories</li>
        <li>Inspired by the paradoxes and complexities of Indian society</li>
        <li>Focused on documenting and mapping local cultures</li>
        <li>Creating decentralized chronicles of India</li>
      </ul>
    `,
    description_right: `
      <h3 class="text-xl font-bold mb-4 text-[#7A2631]">Our Philosophy</h3>
      <ul class="space-y-4">
        <li>Understanding India through lived experiences</li>
        <li>Embracing complexity without seeking unified theories</li>
        <li>Inspired by Heisenberg's approach to quantum reality</li>
        <li>Symbolized by the story of blind men and elephant</li>
      </ul>
    `,
    vision: `
      <div class="space-y-4">
        <p>Like Werner Heisenberg's approach to quantum physics, we believe in observing reality without preconceived notions. India, with its apparent contradictions and complexities, demands a unique approach to understanding:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Documenting India's diverse cultural landscape without theoretical constraints</li>
          <li>Understanding the coexistence of seeming contradictions in Indian society</li>
          <li>Mapping local cultures and creating decentralized narratives</li>
          <li>Bridging the gap between external perceptions and lived experiences</li>
        </ul>
      </div>
    `,
    mission: `
      <div class="space-y-4">
        <p>Our mission is to:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Document and understand India through its experiences rather than theoretical frameworks</li>
          <li>Create comprehensive mappings of local level cultures and traditions</li>
          <li>Develop decentralized chronicles that capture India's diverse realities</li>
          <li>Bridge the gap between perceived paradoxes and everyday Indian life</li>
          <li>Preserve and study the unique aspects of Indian civilization</li>
        </ul>
      </div>
    `
  }

  // Mount animation
  useEffect(() => {
    setMounted(true)
  }, [])

  // Slider animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === ckaData.images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page-wrapper bg-white min-h-screen">
      <div className="navbar-wrapper">
        <NavBar />
      </div>
      <main className="content-wrapper">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-16">
            
            {/* Page Title */}
            <h1 className={`mt-10 text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              {ckaData.title}
            </h1>

            {/* Image Slider */}
            <div className={`transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="rounded-lg overflow-hidden relative h-[300px] md:h-[550px] shadow-xl">
                {ckaData.images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                    <Image
                      src={image.image}
                      alt={image.alt_text}
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
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      currentSlide === index ? "bg-[#7A2631] w-4" : "bg-gray-300"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-lg shadow-md">
                <div className="text-black">
                  <div dangerouslySetInnerHTML={{ __html: ckaData.description_left }} />
                </div>
                <div className="text-black">
                  <div dangerouslySetInnerHTML={{ __html: ckaData.description_right }} />
                </div>
              </div>
            </div>

            {/* Vision Section */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#E7B24B] text-black font-bold font-philosopher px-8 py-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-105 duration-300 text-2xl inline-block">
                  Our Vision
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md text-black">
                <div dangerouslySetInnerHTML={{ __html: ckaData.vision }} />
              </div>
            </div>

            {/* Mission Section */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#E7B24B] text-black font-bold font-philosopher px-8 py-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-105 duration-300 text-2xl inline-block">
                  Our Mission
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md text-black">
                <div dangerouslySetInnerHTML={{ __html: ckaData.mission }} />
              </div>
            </div>

            {/* External Link Section */}
            <div className="space-y-6 text-center">
              <a 
                href="https://www.flame.edu.in/cka/about-the-centre.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block group"
              >
                <span className="bg-[#7A2631] text-white font-bold font-philosopher 
                  px-8 py-4 rounded-lg shadow-md transition-all duration-300 
                  hover:shadow-lg hover:bg-[#8B3641] hover:scale-105 
                  flex items-center gap-2"
                >
                  Learn More at FLAME CKA
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

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Main component with Suspense boundary
export default function AboutCKA() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-[#7A2631]">Loading...</div>
      </div>
    }>
      <AboutCKAContent />
    </Suspense>
  )
}