"use client"

import { useState, useEffect, Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"

function AboutCKAContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="page-wrapper bg-white min-h-screen">
      <div className="navbar-wrapper">
        <NavBar />
      </div>
      <main className="content-wrapper">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Page Title */}
            <h1 className={`mt-10 text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              About Centre for Knowledge Alternatives
            </h1>

            {/* Main Content - Flowing Text */}
            <div className={`prose prose-lg max-w-none text-black transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              <p className="text-lg leading-relaxed mb-6">
                The Centre for Knowledge Alternatives at FLAME University, Pune, leads research at the intersection of public policy, data, and cultures. It focuses on creating grounded, decentralised knowledge about Bharat by foregrounding lived experience rather than abstract theory.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Its flagship Districts Project documents district‑level cultures and statistics across Bharat, presenting local cultural attributes alongside developmental challenges and opportunities on an open, continuously evolving website—an emerging working encyclopedia of Bharat's districts. The first full state, Maharashtra, was completed in November 2025 (<a href="https://www.indiandistricts.in" target="_blank" rel="noopener noreferrer" className="text-[#7A2631]  hover:underline">www.indiandistricts.in</a>).
              </p>

              <p className="text-lg leading-relaxed mb-6">
                A core strand of the project curates local cultures through the eyes and voices of communities themselves, deliberately avoiding the imposition of pre‑set theoretical frames. As the parable of the blind men and the elephant—echoed in the Centre's logo—suggests, each perspective reveals a different facet of reality, and the Centre treats this plurality as a strength rather than a problem to be solved.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                More broadly, the Centre for Knowledge Alternatives is a fresh attempt to understand Bharat through its everyday experiences, without assuming that a single grand theory of the country lies waiting to be discovered. It takes seriously the apparent contrast between the "enigmatic" image of Bharat in intellectual discourse and the effortlessness with which Bharatiyas navigate daily life.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Beyond the Districts Project, the Centre also conceives and curates global indices, including a Democracy Index and a Sustainability Index currently in development. By drawing on large‑scale global datasets and designing more holistic measures, it seeks to offer alternatives to conventional world rankings whose methodologies are often narrow or contestable.
              </p>
            </div>

            {/* External Link Section */}
            <div className={`pt-8 text-center transition-all duration-700 delay-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              <a 
                href="https://www.flame.edu.in/cka/about-the-centre.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block group"
              >
                <span className="bg-[#7A2631] text-white font-bold font-philosopher 
                  px-8 py-4 rounded-custom2 shadow-md transition-all duration-300 
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