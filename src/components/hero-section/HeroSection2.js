"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection2() {
  const router = useRouter()
  const [exitAnimation, setExitAnimation] = useState(false)

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
        {/* Move the image container to the left */}
        <div className="relative order-2 md:order-1 -ml-4 md:-ml-20">
          <Image
            src="/images/map.png"
            alt="Map of India showing 100 regions"
            width={700}
            height={600}
            className="w-full object-contain max-h-[600px]"
          />
        </div>
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