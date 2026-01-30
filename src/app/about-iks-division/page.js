"use client"

import { useState, useEffect, Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

function AboutIKSDivisionContent() {
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
            
            {/* Title Section */}
            <h1 className={`mt-10 text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              IKS Division, Ministry of Education
            </h1>

            {/* Main Content - Flowing Text */}
            <div className={`prose prose-lg max-w-none text-black transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              <p className="text-lg leading-relaxed mb-6">
                The Indian Knowledge System comprises of Gyan (ज्ञान), Vigyan (विज्ञान), and Jeevan Darshan (जीवन दर्शन) of the people of Bharat continuously arising out of deep experience, observation, experimentation and rigorous analysis, with a tradition of validating and putting into practice in several areas including education, arts, administration, law, justice, health, manufacturing, and commerce, documented in classical and other languages of Bharat, and transmitted through textual, oral and artistic traditions.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                The IKS Division of the Ministry of Education was established with a vision to promote interdisciplinary and transdisciplinary research on all aspects of IKS, preserve and disseminate IKS knowledge for further research, and societal applications. IKS Division’s mission, vision and objectives are focused on the Panch Pran (पंच प्राण) in totality. Three of the five pledges (Panch Pran) are focused on removing any trace of the colonial mindset and taking pride in our legacy while strengthening our unity. IKS Division’s mission is completely focused on these three pledges while enhancing a sense of duty among the citizens for the goal of developed India.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                The primary goal of the IKS division is to bridge the gap between the traditional Indian knowledge systems and contemporary knowledge systems. The vision of the IKS Division is to completely decolonize the Indian mind by generating interest and healthy critical reverence to the unbroken knowledge traditions of Bharat for the welfare of the world. The objective of the IKS division is to rejuvenate and Indian knowledge systems for the contemporary world.
              </p>

              <p className="text-lg leading-relaxed mb-4">
                The IKS division focuses on three fundamental principles when undertaking any activity:
              </p>
              
              <ul className="list-disc pl-6 space-y-4 mb-6 text-lg text-black marker:text-[#7A2631]">
                <li>
                  <span className="font-bold text-[#7A2631]">Paramapara (परम्परा)</span> - Embracing the rich heritage and lineage of Indian Knowledge Systems, the IKS division aims to uphold and carry forward the wisdom that has been passed down through generations. The goal is to highlight and nurture the continuous, unbroken knowledge traditions of Bharat since time immemorial.
                </li>
                <li>
                  <span className="font-bold text-[#7A2631]">Drishti (दृष्टि)</span> - The unique perspectives provided make this knowledge system ‘Indian’ and valuable to the world. Indian knowledge systems offer a unique perspective that holds immense value in addressing contemporary and emerging challenges. By combining traditional wisdom with modern knowledge, we can find holistic solutions that transcend the limitations of either approach.
                </li>
                <li>
                  <span className="font-bold text-[#7A2631]">Prayojana (प्रयोजन)</span> - The practical utility of the Indian knowledge system to solve current and emerging problems of India and the world. To ensure the practicality and impact of IKS projects, emphasis is placed on developing knowledge systems that are relevant to the present. By focusing on areas of societal importance, such as health, technology, and social well-being, IKS projects strive to make a tangible difference.
                </li>
              </ul>

              <p className="text-lg leading-relaxed mb-6">
                The IKS division supports and funds the establishment of IKS centres and interdisciplinary and transdisciplinary research in IKS. The IKS Division conducts internship programs for undergraduate students in addition to conducting Faculty-Development Programs, workshops, text mining and documentation projects, and many outreach activities in partnership with other institutions.
              </p>
            </div>

            {/* External Link Section */}
            <div className={`pt-8 text-center transition-all duration-700 delay-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              <a 
                href="https://iksindia.org/about.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block group"
              >
                <span className="bg-[#7A2631] text-white font-bold font-philosopher 
                  px-8 py-4 rounded-custom2 shadow-md transition-all duration-300 
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