"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection3() {
  const router = useRouter()
  const [exitAnimation, setExitAnimation] = useState(false)
  const [currentTile, setCurrentTile] = useState(0)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch data from Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/jeevan-darshan/')
        const data = await response.json()
        setSections(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Tile positions and styles
  const tileConfigurations = [
    { position: "absolute right-[8%] bottom-[12%] w-[40%] rotate-[-7deg]", shape: "rounded-custom5", titleRotation: "rotate-[8deg]" },
    { position: "absolute right-[6%] top-[10%] w-[40%] rotate-[6deg]", shape: "rounded-custom4", titleRotation: "rotate-[-6deg]" },
    { position: "absolute left-[39%] top-[2%] -translate-x-1/2 w-[40%] rotate-[25deg]", shape: "rounded-custom3", titleRotation: "rotate-[-25deg]" },
    { position: "absolute left-[-3%] top-[25%] w-[40%] rotate-[-34deg]", shape: "rounded-custom7", titleRotation: "rotate-[34deg]" },
    { position: "absolute left-[19%] top-[55%] bottom-[4%] w-[40%] rotate-[-30deg]", shape: "rounded-custom6", titleRotation: "rotate-[30deg]" }
  ]

  const handleTileClick = (index) => {
    setExitAnimation(true)
    setTimeout(() => {
      localStorage.setItem('selectedCategory', sections[index].title)
      router.push('/jeevan-darshan')
    }, 500)
  }

  const handleLearnMore = () => {
    setExitAnimation(true)
    setTimeout(() => {
      localStorage.setItem('selectedCategory', sections[currentTile].title)
      router.push('/jeevan-darshan')
    }, 500)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTile(prev => (prev + 1) % 5)
    }, 2000)
    return () => clearInterval(timer)
  }, [sections])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (!sections.length) return <div className="text-center py-10">No data available</div>

  const currentSection = sections[currentTile]

  return (
    <section className="py-2 md:py-6 lg:py-6">
      <div className="grid md:grid-cols-2 gap-10 md:gap-18 items-start max-w-5xl mx-auto">
        {/* Left Column: Title and Pattern Grid */}
        <div className={`space-y-6 transition-all duration-700 ${exitAnimation ? 'translate-x-[-100px] opacity-0' : 'translate-x-0 opacity-100'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#7A2631] font-bold relative top-[-5] mb-20">
            Jeevan Darshan
          </h2>

          {/* Pattern Grid */}
          <div className="relative w-full aspect-square max-w-[550px] mx-auto">
            <div className="relative h-full w-full">
              {sections.map((section, index) => (
                <div
                  key={section.title}
                  onClick={() => handleTileClick(index)}
                  className={`group cursor-pointer aspect-square overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-10 
                    ${tileConfigurations[index].position} 
                    ${tileConfigurations[index].shape}
                    ${currentTile === index ? 'ring-2 ring-white z-10 scale-105' : 'ring-4 ring-white'}`}
                >
                  {/* Decorative Frame */}
                  <div className="absolute inset-0 border-20 border-white rounded-lg border-opacity-100">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#9B2C2C] rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#9B2C2C] rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#9B2C2C] rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#9B2C2C] rounded-br-lg"></div>
                  </div>

                  {/* Section Image */}
                  <div className="relative w-full h-full overflow-hidden">
                    {section.images[0] && (
                      <Image
                        src={section.images[0].image_url}
                        alt={section.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />
                    )}
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 flex flex-col justify-center items-center text-white p-4 text-center transition-opacity duration-300 ${currentTile === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <h3 className={`text-lg font-semibold mb-2 ${tileConfigurations[index].titleRotation}`}>
                        {section.title}
                      </h3>
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
                <div className="absolute inset-[-8px] border-2 border-[#F6B352] rounded-full"></div>
                <div className="absolute inset-[-16px] border-2 border-[#9B2C2C] rounded-full opacity-20"></div>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-30">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTile(index)}
                    className={`h-3 rounded-full transition-all duration-300 ease-in-out ${currentTile === index ? 'w-8 bg-[#9B2C2C]' : 'w-3 bg-[#F6B352]'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Section Description */}
        <div className="space-y-6 md:mt-48">
          <p className="text-black leading-relaxed text-base md:text-lg max-w-lg">
            {currentSection.short_description}

          </p>
          <button 
            onClick={handleLearnMore} 
            className="bg-[#F8D89A] text-black px-4 md:px-6 py-2 rounded-custom2 hover:bg-[#f6a93d] transition-colors text-sm"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}