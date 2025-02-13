"use client";

import { useState, useEffect, useRef } from "react";
import { Notebook, Book, BookOpen, Video } from "lucide-react";
import Image from "next/image";
import { Resources } from "@/components/resources";
import MovieSlider from "@/components/movie-slider";
import VideoModal from "@/components/video-modal";

export function ResourcesContent({ initialCategory = 'Movies' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedState, setSelectedState] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [currentShortMovie, setCurrentShortMovie] = useState(0);
    const [currentRecommendedMovie, setCurrentRecommendedMovie] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // API Data States
    const [coffeeBooks, setCoffeeBooks] = useState([]);
    const [thematics, setThematics] = useState([]);
    const [movies, setMovies] = useState([]);
    const [flipBooks, setFlipBooks] = useState([]);
    const [states, setStates] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Movie Data
    const movieResources = movies.map(movie => ({
        image: movie.movie_thumbnail || "/images/default-thumbnail.jpg",
        video: movie.youtube_link || movie.uploaded_movie || "#",
        title: movie.name || "Untitled Movie"
    }));

    const recommendedMovies = movies.map(movie => ({
        image: movie.movie_thumbnail || "/images/default-thumbnail.jpg",
        title: movie.name || "Untitled Movie",
        video: movie.youtube_link || movie.uploaded_movie || "#"
    }));

    const shortMovies = movies.map(movie => ({
        src: movie.movie_thumbnail || "/images/default-thumbnail.jpg",
        alt: movie.name || "Untitled Movie",
        title: movie.name || "Untitled Movie",
        video: movie.youtube_link || movie.uploaded_movie || "#"
    }));

    // Add new state to control Resources component visibility
    const [showResources, setShowResources] = useState(true);

    // Replace dropdown-related state and ref
    const [activeTab, setActiveTab] = useState('Thematic Concept Notes');

    useEffect(() => {
        // Handle category changes from navbar
        const handleNavResourceChange = (event) => {
            setSelectedCategory(event.detail);
            // Reset states when changing categories
            setSelectedPdf(null);
            setSelectedTitle('');
            setShowResources(event.detail !== 'Movies');
        };

        window.addEventListener('navResourceChange', handleNavResourceChange);
        return () => {
            window.removeEventListener('navResourceChange', handleNavResourceChange);
        };
    }, []);

    useEffect(() => {
        setSelectedCategory(initialCategory);
        // Reset states when initialCategory changes
        setSelectedPdf(null);
        setSelectedTitle('');
        setShowResources(initialCategory !== 'Movies');
        fetchInitialData();
    }, [initialCategory]);

    const resourceMenuItems = [
        'Coffee Table Books',
        'Thematic Concept Notes',
        'Regional Flip Books',
        'Movies'
    ];

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [statesRes, coffeeRes, thematicRes, movieRes] = await Promise.all([
                fetch('http://127.0.0.1:8000/api/states/'),
                fetch('http://127.0.0.1:8000/api/coffee-table-books/'),
                fetch('http://127.0.0.1:8000/api/thematic/'),
                fetch('http://127.0.0.1:8000/api/movies/')
            ]);

            setStates(await statesRes.json());
            setCoffeeBooks(await coffeeRes.json());
            setThematics(await thematicRes.json());
            setMovies(await movieRes.json());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFlipBooks = async (stateId, regionId) => {
        try {
            setLoading(true);
            let url = 'http://127.0.0.1:8000/api/flipbooks/';
            const params = new URLSearchParams();
            if (stateId) params.append('state', stateId);
            if (regionId) params.append('region', regionId);

            if (stateId || regionId) {
                url += `?${params.toString()}`;
            }

            const res = await fetch(url);
            setFlipBooks(await res.json());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchRegions = async (stateId) => {
        if (!stateId) return;
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/regions/?state=${stateId}`);
            setRegions(await res.json());
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (selectedCategory === 'Regional Flip Books') {
            fetchFlipBooks(selectedState, selectedRegion);
        }
    }, [selectedState, selectedRegion]);

    // Replace handleCategoryChange and replace with handleTabChange
    const handleTabChange = (category) => {
        setSelectedCategory(category);
        if (category === 'Regional Flip Books') {
            fetchFlipBooks();
        }
        // Reset selected PDF and hide Resources component when switching to Movies
        if (category === 'Movies') {
            setSelectedPdf(null);
            setSelectedTitle('');
            setShowResources(false);
        } else {
            setShowResources(true);
        }
    };

    const handleStateChange = async (e) => {
        const stateId = e.target.value;
        setSelectedState(stateId);
        setSelectedRegion('');
        await fetchRegions(stateId);
    };

    const handleBookSelect = (resource) => {
        const pdfUrl = resource.file || resource.book_pdf || resource.cover_image;
        const title = resource.title || resource.name || resource.coffee_table_book_name;

        setSelectedPdf(pdfUrl);
        setSelectedTitle(title);

        setTimeout(() => {
            const element = document.getElementById('flipbook-wrapper');
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    };

    const getResourceData = () => {
        switch (selectedCategory) {
            case 'Coffee Table Books':
                return coffeeBooks;
            case 'Regional Flip Books':
                return flipBooks;
            case 'Thematic Concept Notes':
                return thematics;
            case 'Movies':
                return movies;
            default:
                return [];
        }
    };

    const getImageSource = (resource) => {
        if (resource.movie_thumbnail) return resource.movie_thumbnail;
        if (resource.cover_image) return resource.cover_image;
        if (resource.cover_picture) return resource.cover_picture;
        return "/images/default-thumbnail.jpg";
    };

    const getVisibleMovies = () => {
        if (!shortMovies || shortMovies.length === 0) return [];
        return shortMovies.slice(currentShortMovie, currentShortMovie + Math.min(3, shortMovies.length));
    };

    const getVisibleRecommendedMovies = () => {
        if (!recommendedMovies || recommendedMovies.length === 0) return [];
        return recommendedMovies.slice(currentRecommendedMovie, currentRecommendedMovie + Math.min(3, recommendedMovies.length));
    };

    const handleWatchNow = (movie) => {
        setSelectedVideo(movie);
    };

    if (error) return <div className="text-red-500 p-4">Error loading resources: {error}</div>;
    if (loading) return <div className="p-4">Loading resources...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300">
                Resources
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            {/* Replace dropdown with tabs */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2 bg-[#FAF3E0] p-1 rounded-custom2 w-fit">
                    {resourceMenuItems.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-3 rounded-custom2 transition-colors ${
                                selectedCategory === tab 
                                    ? 'bg-[#E4A853] text-black' 
                                    : 'text-gray-700 hover:bg-[#E4A853] hover:text-black'
                            }`}
                        >
                            {tab === 'Thematic Concept Notes' && <Notebook className="w-4 h-4 inline mr-2" />}
                            {tab === 'Coffee Table Books' && <Book className="w-4 h-4 inline mr-2" />}
                            {tab === 'Regional Flip Books' && <BookOpen className="w-4 h-4 inline mr-2" />}
                            {tab === 'Movies' && <Video className="w-4 h-4 inline mr-2" />}
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rest of the content - Lower z-index */}
            <div className="relative z-0">
                {selectedCategory === 'Movies' ? (
                    // Movies Content
                    <div className="space-y-12">
                        {/* Movie Slider - Added conditional rendering */}
                        {movieResources.length > 0 ? (
                            <MovieSlider
                                movies={movieResources}
                                onPlayClick={handleWatchNow}
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

                        {/* Recommended Movies Section */}
                        <section>
                            <div className="inline-block w-full mb-8 mt-10">
                                <span className="bg-[#E7B24B] text-black font-bold px-4 md:px-12 py-6 rounded-custom2 transition-colors text-2xl">
                                    Recommended Movies
                                </span>
                            </div>

                            <div className="relative rounded-lg overflow-hidden mt-8">
                                {/* Film strip border - top */}
                                <div className="h-8 w-full bg-[#7B7B7B]"
                                    style={{
                                        backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 20px, white 20px, white 48px)',
                                    }}
                                />

                                <div className="bg-[#7B7B7B] p-8 relative">
                                    {recommendedMovies.length > 0 ? (
                                        <>
                                            {/* Previous button */}
                                            <button
                                                onClick={() => setCurrentRecommendedMovie((prev) =>
                                                    prev === 0 ? 0 : prev - 1
                                                )}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full shadow-lg transition-all duration-300 ml-4"
                                                aria-label="Previous recommended movie"
                                            >
                                                <div className="w-10 h-10 flex items-center justify-center">
                                                    <span className="text-2xl font-bold">&lt;</span>
                                                </div>
                                            </button>

                                            {/* Next button */}
                                            <button
                                                onClick={() => setCurrentRecommendedMovie((prev) =>
                                                    prev + 3 >= recommendedMovies.length ? prev : prev + 1
                                                )}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full shadow-lg transition-all duration-300 mr-4"
                                                aria-label="Next recommended movie"
                                            >
                                                <div className="w-10 h-10 flex items-center justify-center">
                                                    <span className="text-2xl font-bold">&gt;</span>
                                                </div>
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {getVisibleRecommendedMovies().map((movie, index) => (
                                                    <div key={index} className="relative group overflow-hidden rounded-lg aspect-video bg-gray-200">
                                                        <Image
                                                            src={movie.image}
                                                            alt={movie.title}
                                                            width={400}
                                                            height={300}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                                            <h3 className="text-white text-xl font-bold mb-4">{movie.title}</h3>
                                                            <button
                                                                onClick={() => handleWatchNow(movie)}
                                                                className="bg-[#E7B24B] text-black px-6 py-2 rounded-full font-semibold transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                                            >
                                                                Watch Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 bg-[#E7B24B] rounded-lg space-y-4">
                                            <h3 className="text-black text-2xl font-bold">Fresh Picks Coming Soon!</h3>
                                            <p className="text-black/80 text-center max-w-lg">
                                                We're curating a collection of recommended movies. Have a film that showcases India's stories? We'd love to see it!
                                            </p>
                                            <a
                                                href="/lets-collaborate"
                                                className="mt-2 px-6 py-3 bg-white text-black rounded-custom2 hover:bg-gray-100 transition-colors"
                                            >
                                                Share Your Films →
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Film strip border - bottom */}
                                <div className="h-8 w-full bg-[#7B7B7B]"
                                    style={{
                                        backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 20px, white 20px, white 48px)',
                                    }}
                                />

                                {recommendedMovies.length > 0 && (
                                    <div className="flex justify-center gap-3 mt-8">
                                        {recommendedMovies.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentRecommendedMovie(index)}
                                                className={`h-3 w-3 rounded-full transition-all duration-300 ${currentRecommendedMovie === index
                                                    ? "bg-[#7A2631] w-6"
                                                    : "bg-gray-300 hover:bg-[#E7B24B]"
                                                    }`}
                                                aria-label={`Go to recommended slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Short Movies Section */}
                        <section className="pb-12">
                            <div className="inline-block w-full mb-8 mt-20">
                                <span className="bg-[#E7B24B] text-black font-bold px-4 md:px-12 py-6 rounded-custom2 transition-colors text-2xl">
                                    Short Movies
                                </span>
                            </div>

                            <div className="relative mt-8">
                                {shortMovies.length > 0 ? (
                                    <>
                                        {/* Previous button */}
                                        <button
                                            onClick={() => setCurrentShortMovie((prev) =>
                                                prev === 0 ? 0 : prev - 1
                                            )}
                                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full shadow-lg transition-all duration-300"
                                            aria-label="Previous slide"
                                        >
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                <span className="text-2xl font-bold">&lt;</span>
                                            </div>
                                        </button>

                                        {/* Next button */}
                                        <button
                                            onClick={() => setCurrentShortMovie((prev) =>
                                                prev + 3 >= shortMovies.length ? prev : prev + 1
                                            )}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full shadow-lg transition-all duration-300"
                                            aria-label="Next slide"
                                        >
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                <span className="text-2xl font-bold">&gt;</span>
                                            </div>
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                                            {getVisibleMovies().map((movie, index) => (
                                                <div key={index} className="relative group overflow-hidden rounded-lg h-[380px] w-[320px] aspect-video bg-gray-200 mx-auto">
                                                    <Image
                                                        src={movie.src}
                                                        alt={movie.alt}
                                                        width={400}
                                                        height={300}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                                        <h3 className="text-white text-xl font-bold mb-4">{movie.title}</h3>
                                                        <button
                                                            onClick={() => handleWatchNow(movie)}
                                                            className="bg-[#E7B24B] text-black px-6 py-2 rounded-full font-semibold transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                                        >
                                                            Watch Now
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-center gap-3 mt-8">
                                            {shortMovies.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentShortMovie(index)}
                                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${currentShortMovie === index
                                                        ? "bg-[#7A2631] w-6"
                                                        : "bg-gray-300 hover:bg-[#E7B24B]"
                                                        }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 bg-[#7A2631] rounded-lg space-y-4">
                                        <h3 className="text-white text-2xl font-bold">Short Films in Production!</h3>
                                        <p className="text-white/80 text-center max-w-lg">
                                            Our short film collection is growing. If you've created short films about India's culture and development, share them with our community!
                                        </p>
                                        <a
                                            href="/lets-collaborate"
                                            className="mt-2 px-6 py-3 bg-[#E7B24B] text-black rounded-custom2 hover:bg-[#F6B352] transition-colors"
                                        >
                                            Contribute Your Short Film →
                                        </a>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                ) : (
                    // Other Resources Grid
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {selectedCategory === 'Regional Flip Books' && (
                            <div className="col-span-full">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                        <select
                                            value={selectedState}
                                            onChange={handleStateChange}
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
                                            {regions.map(region => (
                                                <option key={region.id} value={region.id}>{region.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {getResourceData().map((resource, idx) => (
                            <div
                                key={idx}
                                className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer"
                                onClick={() => handleBookSelect(resource)}
                            >
                                <div className="p-0"></div>
                                <Image
                                    src={getImageSource(resource)}
                                    alt={resource.title || resource.name || resource.coffee_table_book_name}
                                    width={300}
                                    height={400}
                                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                                    onError={(e) => {
                                        e.target.src = "/images/default-thumbnail.jpg";
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )


                /* Video Modal */}
                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoSource={selectedVideo?.video}
                    title={selectedVideo?.title}


                />

                {/* Conditionally render Resources component */}
                {showResources && (
                    <Resources selectedPdf={selectedPdf} selectedTitle={selectedTitle} />
                )}
            </div>
        </div>
    );
}
