"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection3() {
  const router = useRouter()
  const [exitAnimation, setExitAnimation] = useState(false)
  const [currentTile, setCurrentTile] = useState(0)

  const handleLearnMoreSec3 = () => {
    // Start exit animations
    setExitAnimation(true)

    // Navigate after animations complete
    setTimeout(() => {
      router.push('/jeevan-darshan')
    }, 500)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTile((prev) => (prev + 1) % 5)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const handlePetalClick = () => {
    router.push('/resources?type=Coffee Table Books')
  }

  return (
    <section className="py-2 md:py-6 lg:py-6">
      <div className="grid md:grid-cols-2 gap-10 md:gap-18 items-start max-w-5xl mx-auto">
        {/* Left Column: Title and Pattern Grid */}
        <div className={`space-y-6 transition-all duration-700 ${exitAnimation ? 'translate-x-[-100px] opacity-0' : 'translate-x-0 opacity-100'}`}>
          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#7A2631] font-bold relative top-[-5] mb-20">
            Jeevan Darshan
          </h2>

          {/* Pattern Grid */}
          <div className="relative w-full aspect-square max-w-[550px] mx-auto">
            {/* Tiles Container */}
            <div className="relative h-full w-full">
              {[
                {
                  image: "/images/P2.svg",
                  title: "Lorem ipsum 3",
                  description: "",
                  position: "absolute right-[8%] bottom-[12%] w-[40%] rotate-[-7deg]",
                  shape: "rounded-custom5",
                  titleRotation: "rotate-[9deg]",
                },
                {
                  image: "/images/P1.svg",
                  title: "Lorem ipsum 2",
                  description: "",
                  position: "absolute right-[6%] top-[10%] w-[40%] rotate-[6deg]",
                  shape: "rounded-custom4",
                  titleRotation: "rotate-[-7deg]",
                },
                {
                  image: "/images/P5.svg",
                  title: "Lorem ipsum 1",
                  description: "",
                  position: "absolute left-[39%] top-[2%] -translate-x-1/2 w-[40%] rotate-[25deg]",
                  shape: "rounded-custom3",
                  titleRotation: "rotate-[-25deg]",
                },
                {
                  image: "/images/P4.svg",
                  title: "Lorem ipsum 5",
                  description: "",
                  position: "absolute left-[-3%] top-[25%] w-[40%] rotate-[-34deg]",
                  shape: "rounded-custom7",
                  titleRotation: "rotate-[35deg]",
                },
                {
                  image: "/images/P3.svg",
                  title: "Lorem ipsum 4",
                  description: "",
                  position: "absolute left-[17%] top-[55%] bottom-[4%] w-[40%] rotate-[-25deg]",
                  shape: "rounded-custom6",
                  titleRotation: "rotate-[30deg]",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={handlePetalClick} // Add the click handler here
                  className={`group cursor-pointer aspect-square overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-10 ${item.position} ${item.shape}
                    ${currentTile === index ? 'ring-2 ring-white z-10 scale-105' : 'ring-4 ring-white'}`}
                >
                  {/* Decorative Frame */}
                  <div className="absolute inset-0 border-20 border-white rounded-lg border-opacity-100">
                    {/* Corner Designs */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#9B2C2C] rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#9B2C2C] rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#9B2C2C] rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#9B2C2C] rounded-br-lg"></div>
                  </div>

                  {/* Image */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    {/* Overlay with text */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 
                        flex flex-col justify-center items-center text-white p-4 text-center
                        transition-opacity duration-300
                        ${currentTile === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      <h3
                        className={`text-lg font-semibold mb-2 ${item.titleRotation || "rotate-0"}`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Center Logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center z-20">
                <div className="relative w-20 h-20">
                  <Image
                    src="/images/GyanGunjan-Logo.png"
                    alt="Gyan Gunjan Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Decorative Ring around logo */}
                <div className="absolute inset-[-8px] border-2 border-[#F6B352] rounded-full"></div>
                <div className="absolute inset-[-16px] border-2 border-[#9B2C2C] rounded-full opacity-20"></div>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-30">
                {[0, 1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTile(index)}
                    className={`h-3 rounded-full transition-all duration-300 ease-in-out
                      ${currentTile === index
                        ? 'w-8 bg-[#9B2C2C]'
                        : 'w-3 bg-[#F6B352] hover:bg-[#9B2C2C/70]'
                      }`}
                    aria-label={`View tile ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Paragraph and Button */}
        <div className="space-y-6 md:mt-48">
          <p className="text-black leading-relaxed text-base md:text-lg max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button onClick={handleLearnMoreSec3} className="bg-[#F8D89A] text-black px-4 md:px-6 py-2 rounded-custom2 hover:bg-[#f6a93d] transition-colors text-sm">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}