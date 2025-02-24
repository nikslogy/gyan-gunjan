"use client"

import { useState, useEffect, Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

function AboutIKSDivisionContent() {
  const [mounted, setMounted] = useState(false)

  const iksData = {
    title: "About Indian Knowledge Systems Division",
    subtitle: "Ministry of Education",
    introduction: `The Indian Knowledge System comprises of Gyan (ज्ञान), Vigyan (विज्ञान), 
      and Jeevan Darshan (जीवन दर्शशन) of the people of Bharat continuously arising out of deep experience, 
      observation, experimentation and rigorous analysis...`,
    
    vision: `The vision of the IKS Division is to completely decolonize the Indian mind by generating interest 
      and healthy critical reverence for the unbroken knowledge traditions of Bharat, for the welfare of the world.`,
    
    mission: `The IKS Division's mission, vision and objectives are focused on the Panch Pran (पंंच प्राणी) in totality. 
      Three of the five pledges (Panch Pran) are focused on removing any trace of the colonial mindset and taking 
      pride in our legacy while strengthening our unity.`,

    principles: [
      {
        title: "Parampara (परम्परा)",
        description: "Embracing the rich heritage and lineage of Indian Knowledge Systems, the IKS division aims to uphold and carry forward the wisdom that has been passed down through generations. The goal is to highlight and nurture the continuous unbroken knowledge traditions of Bharat since time immemorial."
      },
      {
        title: "Drishti (दृष्टी)",
        description: "The unique perspectives provided make this knowledge system 'Indian' and valuable to the world. Indian Knowledge Systems offer a unique perspective that holds immense value in addressing contemporary and emerging challenges. By combining traditional wisdom with modern knowledge, we can find holistic solutions that transcend the limitations of either approach."
      },
      {
        title: "Prayojan (प्रयोजन)",
        description: "The practical utility of the Indian Knowledge System to solve current and emerging problems of Indian and the world. To ensure the practicality and impact of IKS projects, emphasis is placed on developing knowledge systems that are relevant to the present. By focusing on areas of societal importance, such as health, technology, and social well-being, IKS projects strive to make a tangible difference."
      }
    ],

    activities: `The IKS Division supports and funds the establishment of IKS centres, and
interdisciplinary and transdisciplinary research in IKS. The IKS Division
specially conducts internship programs for undergraduate students in
addition to conducting Faculty-Development Programs, Workshops, Text
Mining and Documentation Projects, and many outreach activities in
partnership with other institutions.`
  }

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
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Title Section */}
            <div className={`text-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}>
              <h1 className="text-3xl md:text-4xl font-bold text-[#7A2631] mb-2">{iksData.title}</h1>
              <h2 className="text-xl text-gray-600">{iksData.subtitle}</h2>
            </div>

            {/* Introduction */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-800 leading-relaxed">{iksData.introduction}</p>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#7A2631]">
                <h3 className="text-xl font-bold text-[#7A2631] mb-4">Our Vision</h3>
                <p className="text-gray-800">{iksData.vision}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#7A2631]">
                <h3 className="text-xl font-bold text-[#7A2631] mb-4">Our Mission</h3>
                <p className="text-gray-800">{iksData.mission}</p>
              </div>
            </div>

            {/* Principles */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#7A2631]">Fundamental Principles</h3>
              <div className="grid grid-cols-1 gap-6">
                {iksData.principles.map((principle, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold text-[#7A2631] mb-2">{principle.title}</h4>
                    <p className="text-gray-800">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#7A2631] mb-4">Our Activities</h3>
              <p className="text-gray-800 leading-relaxed">{iksData.activities}</p>
            </div>

            {/* External Link Section */}
            <div className="space-y-6 text-center">
              <a 
                href="https://iksindia.org/about.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block group"
              >
                <span className="bg-[#7A2631] text-white font-bold font-philosopher 
                  px-8 py-4 rounded-lg shadow-md transition-all duration-300 
                  hover:shadow-lg hover:bg-[#8B3641] hover:scale-105 
                  flex items-center gap-2"
                >
                  Visit Official IKS Website
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

export default function AboutIKSDivision() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-[#7A2631]">Loading...</div>
      </div>
    }>
      <AboutIKSDivisionContent />
    </Suspense>
  )
}