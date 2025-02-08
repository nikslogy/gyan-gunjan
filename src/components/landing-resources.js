import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Book, BookOpen, Notebook, Video } from 'lucide-react';
import MovieSlider from './movie-slider';
import { useRouter } from 'next/navigation';


export default function LandingResources() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('thematic');
  const [selectedState, setSelectedState] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  
  // API Data States
  const [thematicData, setThematicData] = useState([]);
  const [coffeeData, setCoffeeData] = useState([]);
  const [regionalData, setRegionalData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [states, setStates] = useState([]);
  const [regions, setRegions] = useState([]);

  // Fetch API Data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch Thematic Data
        const thematicRes = await fetch('http://127.0.0.1:8000/api/thematic/');
        const thematicJson = await thematicRes.json();
        setThematicData(thematicJson);

        // Fetch Coffee Table Books
        const coffeeRes = await fetch('http://127.0.0.1:8000/api/coffee-table-books/');
        const coffeeJson = await coffeeRes.json();
        setCoffeeData(coffeeJson);

        // Fetch Flipbooks
        const flipbookRes = await fetch('http://127.0.0.1:8000/api/flipbooks/');
        const flipbookJson = await flipbookRes.json();
        setRegionalData(flipbookJson);

        // Fetch States
        const stateRes = await fetch('http://127.0.0.1:8000/api/states/');
        const stateJson = await stateRes.json();
        setStates(stateJson);

        // Fetch All Regions
        const regionRes = await fetch('http://127.0.0.1:8000/api/regions/');
        const regionJson = await regionRes.json();
        setRegions(regionJson);

        // Fetch Movies
        const movieRes = await fetch('http://127.0.0.1:8000/api/movies/');
        const movieJson = await movieRes.json();
        setMovieData(movieJson);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchInitialData();
  }, []);

  // Filter regions based on selected state
  const filteredRegions = regions.filter(region => 
    region.state.id.toString() === selectedState
  );

  // Filter flipbooks based on selections
  const filteredFlipbooks = regionalData.filter(flipbook => {
    const stateMatch = !selectedState || flipbook.state.id.toString() === selectedState;
    const regionMatch = !selectedRegion || flipbook.region?.id.toString() === selectedRegion;
    return stateMatch && regionMatch;
  });

  // Transform movie data for slider
  const transformedMovies = movieData.map(movie => ({
    image: movie.movie_thumbnail,
    video: movie.youtube_link || movie.uploaded_movie,
    isYoutube: !!movie.youtube_link,
    title: movie.name
  }));

  const handlePlayClick = (movie) => {
    // video playing logic here
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header remains exactly the same */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#7A2631]">Resources</h2>
          <button 
            onClick={() => router.push('/resources')}
            className="text-black hover:text-gray-900 text-sm sm:text-base border border-black px-4 py-2 rounded-custom2 hover:bg-gray-50 transition-colors"
          >
            View All
          </button>
        </div>

        {/* Tab navigation remains exactly the same */}
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
                {tab === 'thematic' && <Notebook className="w-4 h-4 inline mr-2" />}
                {tab === 'coffee' && <Book className="w-4 h-4 inline mr-2" />}
                {tab === 'regional' && <BookOpen className="w-4 h-4 inline mr-2" />}
                {tab === 'movies' && <Video className="w-4 h-4 inline mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
                {tab === 'thematic' ? 'Concept Notes' : tab === 'coffee' ? 'Table Books' : tab === 'regional' ? 'Flip Books' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Thematic Section with API Data */}
        {activeTab === 'thematic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {thematicData.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  router.push('/resources');
                  localStorage.setItem('selectedResourceType', 'Thematic Concept Notes');
                  window.dispatchEvent(new CustomEvent('navResourceChange', { 
                    detail: 'Thematic Concept Notes' 
                  }));
                }}
                className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="p-0">
                  <Image
                    src={item.cover_picture}
                    alt={item.headline}
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coffee Table Books Section with API Data */}
        {activeTab === 'coffee' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {coffeeData.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  router.push('/resources');
                  localStorage.setItem('selectedResourceType', 'Coffee Table Books');
                  window.dispatchEvent(new CustomEvent('navResourceChange', { 
                    detail: 'Coffee Table Books' 
                  }));
                }}
                className="group overflow-hidden border rounded-custom4 transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="p-0">
                  <Image
                    src={item.cover_image}
                    alt={item.coffee_table_book_name}
                    width={200}
                    height={300}
                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regional Flipbooks Section with API Data */}
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
                  {states.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>

                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full sm:w-[200px] text-black bg-white border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Choose Region</option>
                  {filteredRegions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={() => {
                  router.push('/resources');
                  localStorage.setItem('selectedResourceType', 'Regional Flip Books');
                  window.dispatchEvent(new CustomEvent('navResourceChange', { 
                    detail: 'Regional Flip Books' 
                  }));
                }}
                className="text-gray-600 hover:text-gray-900 w-full sm:w-auto text-center sm:text-left"
              >
                View All

              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {filteredFlipbooks.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden border rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="p-0">
                    <Image
                      src="/images/default-flipbook.png" // Add default image
                      alt={item.title}
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

        {/* Movies Section with API Data */}
        {activeTab === 'movies' && (
          <>
            <div className="flex justify-end mb-4 sm:mb-6">
              <button 
                onClick={() => {
                  router.push('/resources');
                  localStorage.setItem('selectedResourceType', 'Movies');
                  window.dispatchEvent(new CustomEvent('navResourceChange', { 
                    detail: 'Movies' 
                  }));
                }}
                className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
              >
                View All

              </button>
            </div>
            <MovieSlider 
              movies={transformedMovies} 
              onPlayClick={handlePlayClick}
            />
          </>
        )}
      </div>
    </section>
  );
}