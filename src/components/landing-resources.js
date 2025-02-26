  import { useState, useEffect } from 'react';
  import Image from 'next/image';
  import { Book, BookOpen, Notebook, Video } from 'lucide-react';
  import MovieSlider from './movie-slider';
  import { useRouter } from 'next/navigation';
  import { API_BASE_URL, getImageUrl } from '@/utils/api';
  import { Resources } from './resources';

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

    const [showPdfModal, setShowPdfModal] = useState(false);
    const [selectedPdfData, setSelectedPdfData] = useState(null);
    const API_BASE_URL = 'https://admin.iksgyangunjan.in';
    // const API_BASE_URL = 'http://127.0.0.1:8000';


    // Fetch API Data
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [thematicRes, coffeeRes, movieRes, statesRes, regionsRes, flipbooksRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/thematic/`),
            fetch(`${API_BASE_URL}/api/coffee-table-books/`),
            fetch(`${API_BASE_URL}/api/movies/`),
            fetch(`${API_BASE_URL}/api/states/`),
            fetch(`${API_BASE_URL}/api/regions/`),
            fetch(`${API_BASE_URL}/api/flipbooks/`)
          ]);

          const thematicJson = await thematicRes.json();
          setThematicData(thematicJson);

          const coffeeJson = await coffeeRes.json();
          setCoffeeData(coffeeJson);

          const flipbookJson = await flipbooksRes.json();
          setRegionalData(flipbookJson);

          const stateJson = await statesRes.json();
          setStates(stateJson);

          const regionJson = await regionsRes.json();
          setRegions(regionJson);

          const movieJson = await movieRes.json();
          setMovieData(movieJson);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
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

    // Add fullscreen handler
    const handleFullscreen = (element) => {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
      }
    };

    // Add exit fullscreen handler
    const exitFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    };

    // Update the book click handler
    const handleBookClick = (item, type) => {
      if (item.book_pdf) {
        setSelectedPdfData({
          pdf: item.book_pdf,
          title: type === 'thematic' ? item.headline : 
                type === 'coffee' ? item.coffee_table_book_name : 
                item.title
        });
        setShowPdfModal(true);
        // Request fullscreen after a short delay to ensure modal is rendered
        setTimeout(() => {
          const pdfContainer = document.getElementById('pdf-fullscreen-container');
          if (pdfContainer) {
            handleFullscreen(pdfContainer);
          }
        }, 100);
      }
    };

    useEffect(() => {
      // Handle ESC key press
      const handleEscKey = (event) => {
        if (event.key === 'Escape' && showPdfModal) {
          handleCloseModal();
        }
      };

      // Handle fullscreen change
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement && 
            showPdfModal) {
          handleCloseModal();
        }
      };

      // Add event listeners
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('msfullscreenchange', handleFullscreenChange);

      // Cleanup event listeners
      return () => {
        document.removeEventListener('keydown', handleEscKey);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      };
    }, [showPdfModal]); // Add showPdfModal to dependency array

    // Update the close handler
    const handleCloseModal = () => {
      // First exit fullscreen if we're in fullscreen mode
      if (document.fullscreenElement || 
          document.webkitFullscreenElement || 
          document.msFullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }

      // Clear the PDF container
      const container = document.querySelector('#flipbook-wrapper');
      if (container) {
        container.innerHTML = '';
      }

      // Reset states
      setShowPdfModal(false);
      setSelectedPdfData(null);

      // Force cleanup of any remaining PDF resources
      const pdfElements = document.querySelectorAll('.solid-container');
      pdfElements.forEach(element => element.remove());
    };

    return (
      <>
        <section className="py-8 md:py-12 lg:py-16 bg-white resources-content">
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
                    className={`px-6 py-3 rounded-custom2 transition-colors ${activeTab === tab ? 'bg-[#E4A853] text-black' : 'text-gray-700 hover:bg-[#E4A853] hover:text-black'
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

            <div className="min-h-[400px]">
              {/* Thematic Section with API Data */}
              {activeTab === 'thematic' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {thematicData.map((item) => {
                    const isPdfAvailable = item.book_pdf !== null;
                    return (
                      <div
                        key={item.id}
                        onClick={() => isPdfAvailable && handleBookClick(item, 'thematic')}
                        className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer relative"
                      >
                        <div className="p-0">
                          <Image
                            src={item.cover_picture}
                            alt={item.headline}
                            width={300}
                            height={400}
                            className={`w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90 ${
                              !isPdfAvailable ? 'filter blur-sm' : ''
                            }`}
                          />
                        </div>
                        {!isPdfAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                            <span className="text-white text-lg font-bold">Coming Soon</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Coffee Table Books Section with API Data */}
              {activeTab === 'coffee' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {coffeeData.map((item) => {
                    const isPdfAvailable = item.book_pdf !== null;
                    return (
                      <div
                        key={item.id}
                        onClick={() => isPdfAvailable && handleBookClick(item, 'coffee')}
                        className="group overflow-hidden border rounded-custom4 transition-transform duration-300 hover:scale-105 cursor-pointer relative"
                      >
                        <div className="p-0">
                          <Image
                            src={item.cover_image}
                            alt={item.coffee_table_book_name}
                            width={200}
                            height={300}
                            className={`w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90 ${
                              !isPdfAvailable ? 'filter blur-sm' : ''
                            }`}
                          />
                        </div>
                        {!isPdfAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                            <span className="text-white text-lg font-bold">Coming Soon</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                    {filteredFlipbooks.map((item) => {
                      const isPdfAvailable = item.book_pdf !== null;
                      return (
                        <div
                          key={item.id}
                          onClick={() => isPdfAvailable && handleBookClick(item, 'regional')}
                          className="group overflow-hidden border rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer relative"
                        >
                          <div className="p-0">
                            <Image
                              src={item.cover_image} // Add default image
                              alt={item.title}
                              width={300}
                              height={400}
                              className={`w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90 ${
                                !isPdfAvailable ? 'filter blur-sm' : ''
                              }`}
                            />
                          </div>
                          {!isPdfAvailable && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                              <span className="text-white text-lg font-bold">Coming Soon</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
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

                  {transformedMovies.length > 0 ? (
                    <MovieSlider
                      movies={transformedMovies}
                      onPlayClick={handlePlayClick}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#f5f5f5] rounded-lg mt-8 space-y-4">
                      <h3 className="text-3xl font-bold text-[#7A2631]">Movies Coming Soon!</h3>
                      <p className="text-gray-600 text-lg text-center max-w-lg">
                          We're preparing an exciting collection of movies. If you have interesting films to share about India's transformation, we'd love to feature them!
                      </p>
                      <a 
                          href="/lets-collaborate" 
                          className="mt-4 px-6 py-3 bg-[#E7B24B] text-black rounded-custom2 hover:bg-[#F6B352] transition-colors"
                      >
                          Share Your Films →
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Update Modal */}
        {showPdfModal && (
          <div 
            id="pdf-fullscreen-container"
            className="fixed inset-0 bg-white w-full h-full overflow-y-auto z-50"
          >
            <button
              onClick={handleCloseModal}
              className="fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              aria-label="Close PDF viewer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="min-h-screen ">
              <div className="text-center">
                <Resources
                  selectedPdf={selectedPdfData?.pdf}
                  selectedTitle={selectedPdfData?.title}
                  onClose={handleCloseModal}  // Pass close handler to Resources component
                />
              </div>
            </div>

            <style jsx global>{`
              body {
                overflow: ${showPdfModal ? 'hidden' : 'auto'};
              }
              .download-modal {
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                z-index: 100000 !important;
                max-height: 90vh !important;
                overflow-y: auto !important;
              }
              .download-modal-overlay {
                z-index: 99999 !important;
              }
            `}</style>
          </div>
        )}
      </>
    );
  }