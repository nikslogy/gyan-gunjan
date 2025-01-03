"use client"

import { useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
return (
    <main className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* First Section */}
        <section className="py-8 md:py-12 lg:py-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-4xl mx-auto">
                <div className="space-y-4 md:space-y-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#9B2C2C]">
                        Iks Gyan Gunjan
                    </h1>
                    <p className="text-gray-700 leading-relaxed font-['EB_Garamond'] text-sm md:text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <button className="bg-[#F6B352] text-black px-4 md:px-6 py-2 rounded-custom hover:bg-[#f6a93d] transition-colors text-sm">
                        Learn More
                    </button>
                </div>
                <div className="relative mt-6 md:mt-0">
                    <div className="rounded-custom overflow-hidden">
                        <Image
                            src="/next.svg"
                            alt="Traditional dancers in red attire"
                            width={600}
                            height={450}
                            className="w-full object-cover"
                            priority
                        />
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                    currentSlide === index ? "bg-[#9B2C2C]" : "bg-gray-300"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Second Section */}
        <section className="py-8 md:py-12 lg:py-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-4xl mx-auto">
                <div className="relative order-2 md:order-1">
                    <Image
                        src="/placeholder.svg"
                        alt="Map of India showing 100 regions"
                        width={600}
                        height={600}
                        className="w-full object-contain max-h-[400px]"
                    />
                </div>
                <div className="space-y-4 md:space-y-6 order-1 md:order-2">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#9B2C2C]">
                        100 regions
                    </h2>
                    <p className="text-gray-700 leading-relaxed font-['EB_Garamond'] text-sm md:text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <button className="bg-[#F6B352] text-black px-4 md:px-6 py-2 rounded-custom hover:bg-[#f6a93d] transition-colors text-sm">
                        Learn More
                    </button>
                </div>
            </div>
        </section>

        {/* Third Section */}
        <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#9B2C2C] text-center mb-12">
        Jeevan Darshan
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative w-full aspect-square max-w-[600px] mx-auto">
          {/* Center Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-30">
            <div className="w-12 h-12 bg-white rounded-full p-2 shadow-lg">
              <svg viewBox="0 0 48 48" className="w-full h-full fill-[#1a365d]">
                <path d="M24 4c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                <path d="M34 16c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                <path d="M14 16c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                <path d="M24 28c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
              </svg>
            </div>
          </div>

          {/* Petals Container */}
          <div className="absolute w-full h-full">
            {/* Top Petal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] aspect-[3/4] -translate-y-[10%] transition-all duration-300 hover:scale-110 hover:z-20 z-[1]">
              <div className="w-full h-full overflow-hidden border-4 border-white shadow-lg" 
                   style={{
                     clipPath: "path('M50 0C80 20 80 80 50 100C20 80 20 20 50 0')"
                   }}>
                <Image
                  src="/images/P1.svg"
                  alt="Community gathering"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Top Right Petal */}
            <div className="absolute top-[15%] right-[5%] w-[40%] aspect-[3/4] rotate-72 transition-all duration-300 hover:scale-110 hover:z-20 z-[1]">
              <div className="w-full h-full overflow-hidden border-4 border-white shadow-lg"
                   style={{
                     clipPath: "path('M50 0C80 20 80 80 50 100C20 80 20 20 50 0')"
                   }}>
                <Image
                  src="/images/P2.svg"
                  alt="Rural landscape"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bottom Right Petal */}
            <div className="absolute bottom-[15%] right-[5%] w-[40%] aspect-[3/4] rotate-144 transition-all duration-300 hover:scale-110 hover:z-20 z-[1]">
              <div className="w-full h-full overflow-hidden border-4 border-white shadow-lg"
                   style={{
                     clipPath: "path('M50 0C80 20 80 80 50 100C20 80 20 20 50 0')"
                   }}>
                <Image
                  src="/images/P3.svg"
                  alt="Family portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bottom Left Petal */}
            <div className="absolute bottom-[15%] left-[5%] w-[40%] aspect-[3/4] -rotate-144 transition-all duration-300 hover:scale-110 hover:z-20 z-[1]">
              <div className="w-full h-full overflow-hidden border-4 border-white shadow-lg"
                   style={{
                     clipPath: "path('M50 0C80 20 80 80 50 100C20 80 20 20 50 0')"
                   }}>
                <Image
                  src="/images/P4.svg"
                  alt="Reading scripture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Top Left Petal */}
            <div className="absolute top-[15%] left-[5%] w-[40%] aspect-[3/4] -rotate-72 transition-all duration-300 hover:scale-110 hover:z-20 z-[1]">
              <div className="w-full h-full overflow-hidden border-4 border-white shadow-lg"
                   style={{
                     clipPath: "path('M50 0C80 20 80 80 50 100C20 80 20 20 50 0')"
                   }}>
                <Image
                  src="/images/P5.svg"
                  alt="Cultural artifacts"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed font-['EB_Garamond'] text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <button className="bg-[#F6B352] text-black px-4 md:px-6 py-2 rounded-full hover:bg-[#f6a93d] transition-colors text-sm md:text-base">
            Learn More
          </button>
        </div>
      </div>
    </section>
        </main>
    )
}

