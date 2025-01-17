"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Share2, ChevronDown } from 'lucide-react'
import Link from "next/link"

export default function JeevanDarshan() {
    const searchParams = useSearchParams()
    const [currentSlide, setCurrentSlide] = useState(
        parseInt(searchParams.get("currentSlide") || "0")
    )
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const images = [
        { src: "/images/Bohag_Bihu.png", alt: "Traditional dancers in red attire" },
        { src: "/images/Arecanut_01.png", alt: "Second Image" },
        { src: "/images/lahaul_hp.jpg", alt: "Third Image" },
        { src: "/images/Sindoor_Play.jpeg", alt: "Fourth Image" }
    ]

    const philoMenuItems = [
        'Family & Community',
        'Knowledge & Learning',
        'Art & Craft',
        'Village Governance'
    ]

    const resourceMenuItems = [
        'Regional Flip Books',
        'Movies',
        'Thematic Concept Notes'
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
        <main className={`min-h-screen bg-white transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
            <NavBar />

            {/* Main container with padding */}
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-5xl mx-auto space-y-10">

                    {/* Page title */}
                    <h1 className={`text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
                        }`}>
                        Jeevan Darshan
                    </h1>

                    {/* Dropdown Menu */}
                    <div className="w-full sm:w-[300px] mb-8">
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-block w-full text-left font-bold bg-[#E7B24B] text-black px-4 md:px-8 py-6 rounded-custom2 text-base md:text-xl flex items-center justify-between transition-all duration-300 hover:bg-[#f4a93d]"
                            >
                                <span>Nature & Agriculture</span>
                                <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                    <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                                </div>
                            </button>

                            <div className={`absolute top-full left-0 w-full overflow-hidden text-black bg-[#F6B352] rounded-b-lg mt-1 z-10 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="py-2">
                                    {philoMenuItems.map((item, index) => (
                                        <button
                                            key={item}
                                            className="w-full text-left px-4 md:px-8 py-2 font-philosopher md:py-3 hover:bg-[#f4a93d] text-base md:text-xl transition-colors"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image slider section */}
                    <div className={`transition-all duration-700 delay-500 relative ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        {/* Share button */}
                        <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                            <Share2 className="h-5 w-5 text-gray-700" />
                        </button>

                        {/* Image slider container */}
                        <div className="rounded-custom4 overflow-hidden relative 
      h-[250px] w-[400px]
      sm:h-[350px] sm:w-[500px]
      md:h-[400px] md:w-[700px]
      lg:h-[450px] lg:w-[900px]
      mx-auto">
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
                                    className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? "bg-[#9B2C2C]" : "bg-gray-300"}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="mt-12 w-[400px] sm:w-[500px] md:w-[700px] lg:w-[900px] mx-auto">
                        <div className="grid md:grid-cols-2 text-black gap-8">
                            <div className="prose prose-lg max-w-full">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                                </p>
                            </div>
                            <div className="prose prose-lg max-w-full">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Replace Resources component with View All Resources button */}
                    <div className="flex justify-center mt-12">
                        <Link href="/resources">
                            <button className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-[#7A2631] rounded-custom2 overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#9B2C2C] to-[#7A2631] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                                <span className="relative flex items-center gap-2">
                                    View All Resources
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    >
                                        <path d="M5 12h14"/>
                                        <path d="m12 5 7 7-7 7"/>
                                    </svg>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

