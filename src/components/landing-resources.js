import { useState } from 'react';
import Image from 'next/image';
import { Book, Globe, Video } from 'lucide-react';
import MovieSlider from './movie-slider';
import { useRouter } from 'next/navigation';

export default function LandingResources() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('thematic');
  const [selectedState, setSelectedState] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const thematicResources = [
    { image: '/images/CompandiumsP1.png' },
    { image: '/images/CompandiumsP4.png' },
    { image: '/images/CompandiumsP1.png' },
    { image: '/images/CompandiumsP4.png' },
    { image: '/images/CompandiumsP1.png' },
  ];

  const coffeeResources = [
    { image: '/images/ct1.png' },
    { image: '/images/ct2.png' },
    { image: '/images/ct3.png' },
    { image: '/images/ct4.png' },
    { image: '/images/ct5.png' },
  ];

  const regionalResources = [
    { title: 'Upper Assam', image: '/images/1.png', state: 'Assam' },
    { title: 'Lower Assam', image: '/images/17.png', state: 'Assam' },
    { title: 'Upper Assam', image: '/images/1.png', state: 'Assam' },
    { title: 'Upper Assam', image: '/images/17.png', state: 'Assam' },
    { title: 'Upper Assam', image: '/images/1.png', state: 'Assam' },
  ];

  const movieResources = [
    {
      image: '/images/P1.svg',
      video: 'https://www.youtube.com/embed/aaNq2NL6D4A?si=EAlQ0lhfW8_IPXfs',
      isYoutube: true
    },
    {
      image: '/images/P2.svg',
      video: '/videos/video1.mp4',
      isYoutube: false
    },
    {
      image: '/images/P3.svg',
      video: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_2?autoplay=1&controls=1&rel=0&showinfo=0',
      isYoutube: true
    },
  ];

  const handlePlayClick = (movie) => {
    //video playing logic here
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#7A2631]">Resources</h2>
          <button 
            onClick={() => router.push('/resources')}
            className="text-black hover:text-gray-900 text-sm sm:text-base border border-black px-4 py-2 rounded-custom2 hover:bg-gray-50 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-[#FAF3E0] p-1 rounded-custom2">
            {['thematic', 'coffee', 'regional', 'movies'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-custom2 transition-colors ${
                  activeTab === tab ? 'bg-[#E4A853] text-black' : 'text-gray-700 hover:bg-[#E4A853] hover:text-black'
                }`}
              >
                {tab === 'thematic' && <Book className="w-4 h-4 inline mr-2" />}
                {tab === 'coffee' && <Book className="w-4 h-4 inline mr-2" />}
                {tab === 'regional' && <Book className="w-4 h-4 inline mr-2" />}
                {tab === 'movies' && <Video className="w-4 h-4 inline mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
                {tab === 'thematic' ? 'Concept Notes' : tab === 'coffee' ? 'Table Books' : tab === 'regional' ? 'Flip Books' : ''}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'thematic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {thematicResources.map((resource, index) => (
              <div
                key={index}
                className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="p-0">
                  <Image
                    src={resource.image}
                    alt="Thematic concept"
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'coffee' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {coffeeResources.map((resource, index) => (
              <div
                key={index}
                className="group overflow-hidden border rounded-custom4 transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="p-0">
                  <Image
                    src={resource.image}
                    alt="Coffee Table Book"
                    width={200}
                    height={300}
                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
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

              <button className="text-gray-600 hover:text-gray-900 w-full sm:w-auto text-center sm:text-left"
              onClick={() => router.push('/resources')}
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {regionalResources.map((resource, index) => (
                <div
                  key={index}
                  className="group overflow-hidden border rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
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
          <>
        <div className="flex justify-end mb-4 sm:mb-6">
          <button 
            onClick={() => router.push('/movies')}
            className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
          >
            View All
          </button>
        </div>
          <MovieSlider 
            movies={movieResources} 
            onPlayClick={handlePlayClick}
          />
          </>
        )}
      </div>
    </section>
  );
}