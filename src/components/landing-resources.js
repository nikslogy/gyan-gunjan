import { useState } from 'react'
import Image from 'next/image'
import { Book, Globe, Video } from 'lucide-react'

export default function LandingResources() {
  const [activeTab, setActiveTab] = useState('thematic')
  const [selectedState, setSelectedState] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const thematicResources = [
    { image: "/images/thematic1.jpg" },
    { image: "/images/thematic2.jpg" },
    { image: "/images/thematic3.jpg" },
    { image: "/images/thematic4.jpg" },
  ]

  const regionalResources = [
    { title: "Upper Assam", image: "/images/assam-upper.jpg", state: "Assam" },
    { title: "Lower Assam", image: "/images/assam-lower.jpg", state: "Assam" },
    { title: "Upper Assam", image: "/images/assam-upper2.jpg", state: "Assam" },
    { title: "Upper Assam", image: "/images/assam-upper3.jpg", state: "Assam" },
    { title: "Upper Assam", image: "/images/assam-upper4.jpg", state: "Assam" },
  ]

  const movieResources = [
    {
      image: "/images/P1.svg",
      video: "/videos/video1.mp4"
    },
    {
      image: "/images/P2.svg",
      video: "/videos/video2.mp4"
    },
    {
      image: "/images/P3.svg",
      video: "/videos/video3.mp4"
    },
    // Add more movies as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movieResources.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movieResources.length) % movieResources.length);
  };

  return (
    <>
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#9B2C2C] mb-8">Resources</h2>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-[#FDF6E9] p-1 rounded-custom">
            {['thematic', 'coffee', 'regional', 'movies'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-custom transition-colors ${activeTab === tab ? 'bg-[#E4A853] text-black' : 'text-gray-700 hover:bg-[#E4A853] hover:text-black'
                  }`}
              >
                {tab === 'thematic' && <Book className="w-4 h-4 inline mr-2" />}
                {tab === 'coffee' && <Book className="w-4 h-4 inline mr-2" />}
                {tab === 'regional' && <Globe className="w-4 h-4 inline mr-2" />}
                {tab === 'movies' && <Video className="w-4 h-4 inline mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab === 'thematic' ? 'Concept Notes' : tab === 'coffee' ? 'Table Books' : tab === 'regional' ? 'Flip Books' : ''}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'thematic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {thematicResources.map((resource, index) => (
              <div
                key={index}
                className="group overflow-hidden border rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="p-2 bg-white">
                  <div className="flex gap-2">
                    <Image
                      src="/images/icon1.png"
                      alt="Icon"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <Image
                      src="/images/icon2.png"
                      alt="Icon"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="p-0">
                  <Image
                    src={resource.image}
                    alt="Thematic concept"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'regional' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full sm:w-[200px] text-black bg-white border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Choose State</option>
                  <option value="assam">Assam</option>
                  <option value="bihar">Bihar</option>
                  <option value="gujarat">Gujarat</option>
                </select>

                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full sm:w-[200px] text-black bg-white border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Choose Region</option>
                  <option value="upper">Upper Region</option>
                  <option value="lower">Lower Region</option>
                  <option value="central">Central Region</option>
                </select>
              </div>

              <button className="text-gray-600 hover:text-gray-900 w-full sm:w-auto text-center sm:text-left font-['EB_Garamond']">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {regionalResources.map((resource, index) => (
                <div
                  key={index}
                  className="group overflow-hidden border rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="p-2 bg-white">
                    <div className="flex gap-2">
                      <Image
                        src="/images/icon1.png"
                        alt="Icon"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <Image
                        src="/images/icon2.png"
                        alt="Icon"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="p-0">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      width={300}
                      height={400}
                      className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

{activeTab === 'movies' && (
  <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4">
    <div className="flex justify-end mb-4 sm:mb-6">
      <button className="text-gray-600 hover:text-gray-900 font-['EB_Garamond'] text-sm sm:text-base">
        View All
      </button>
    </div>

    <div className="relative h-[400px] sm:h-[400px] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {movieResources.map((movie, index) => {
          const position = (index - currentSlide + movieResources.length) % movieResources.length;
          const isCenter = position === 0;
          const isPrev = position === movieResources.length - 1;
          const isNext = position === 1;

          return (
            <div
              key={index}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                transform: isCenter 
                  ? 'translateX(-50%) scale(1)'
                  : isPrev
                  ? 'translateX(-120%) scale(0.6)' // Adjusted for mobile
                  : isNext
                  ? 'translateX(20%) scale(0.6)' // Adjusted for mobile
                  : 'scale(0)',
                left: '50%',
                opacity: isCenter ? 1 : 0.5,
                zIndex: isCenter ? 30 : 10
              }}
            >
              <div className={`relative group ${isCenter ? '' : 'pointer-events-none'}`}>
                <div className="w-[280px] sm:w-[480px] lg:w-[640px] aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={movie.image}
                    alt={`Movie ${index + 1}`}
                    width={800}
                    height={450}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isCenter ? 'group-hover:scale-105' : 'filter blur-sm'
                    }`}
                  />
                  {isCenter && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      {!isPlaying ? (
                        <button 
                          onClick={() => setIsPlaying(true)}
                          className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"
                        >
                          <div className="w-0 h-0 border-t-6 sm:border-t-8 border-t-transparent border-l-10 sm:border-l-12 border-l-[#9B2C2C] border-b-6 sm:border-b-8 border-b-transparent ml-1" />
                        </button>
                      ) : (
                        <>
                          <video 
                            src={movie.video} 
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay 
                            controls={false}
                          />
                          <button 
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-2 right-2 z-50 bg-white/80 rounded-full p-2"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-[#9B2C2C] hover:text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-[#9B2C2C] hover:text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute -bottom-2 sm:bottom-1 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-50">
        {movieResources.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? 'w-6 sm:w-8 bg-[#9B2C2C]' 
                : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
)}
      </div>
    </section>
    </>
  )
}

