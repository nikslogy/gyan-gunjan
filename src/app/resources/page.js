"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { Resources } from "@/components/resources";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function ResourcePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Coffee Table Books');
  const [selectedState, setSelectedState] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');

  // API data states
  const [coffeeBooks, setCoffeeBooks] = useState([]);
  const [thematics, setThematics] = useState([]);
  const [movies, setMovies] = useState([]);
  const [flipBooks, setFlipBooks] = useState([]);
  const [states, setStates] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resourceMenuItems = [
    'Regional Flip Books',
    'Movies', 
    'Thematic Concept Notes',
    'Coffee Table Books'
  ];

  useEffect(() => {
    setMounted(true);
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl) {
      setSelectedCategory(typeFromUrl);
      router.replace('/resources', undefined, { shallow: true });
    }
    fetchInitialData();
  }, [searchParams]);

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
      if (stateId || regionId) {
        const params = new URLSearchParams();
        if (stateId) params.append('state', stateId);
        if (regionId) params.append('region', regionId);
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

  const handleCategoryChange = (category) => {
    if (category === 'Movies') {
      router.push('/movies');
    } else {
      setSelectedCategory(category);
      setIsOpen(false);
      if (category === 'Regional Flip Books') {
        fetchFlipBooks();
      }
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedRegion('');
    fetchRegions(stateId);
  };

  const handleBookSelect = (pdfUrl, title) => {
    setSelectedPdf(pdfUrl);
    setSelectedTitle(title);
    
    setTimeout(() => {
      const element = document.getElementById('flipbook-wrapper');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const getResources = () => {
    switch(selectedCategory) {
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

  const dropdownItems = resourceMenuItems.filter(item => item !== selectedCategory);

  if (error) return <div>Error loading resources: {error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <main className={`min-h-screen bg-white transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
      <NavBar />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-10">
          <h1 className={`text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
            Resources
          </h1>

          {/* Category dropdown */}
          <div className="w-full sm:w-[300px] mb-8">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-block w-full text-left font-bold bg-[#E7B24B] text-black px-4 md:px-8 py-6 rounded-custom2 text-base md:text-xl flex items-center justify-between transition-all duration-300 hover:bg-[#f4a93d]"
              >
                <span>{selectedCategory}</span>
                <div className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                  <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              </button>

              <div className={`absolute top-full left-0 w-full overflow-hidden text-black bg-[#F6B352] rounded-b-lg mt-1 z-10 transition-all duration-300 ease-in-out ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="py-2">
                  {dropdownItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleCategoryChange(item)}
                      className="w-full text-left px-4 md:px-8 py-2 font-philosopher md:py-3 hover:bg-[#f4a93d] text-base md:text-xl transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resource Grid */}
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

            {getResources().map((resource, idx) => (
              <div
                key={idx}
                className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleBookSelect(
                  resource.file || resource.book_pdf || resource.cover_picture,
                  resource.name || resource.title || resource.coffee_table_book_name
                )}
              >
                <div className="p-0">
                  <Image
                    src={resource.movie_thumbnail || resource.cover_image || resource.cover_picture || "/images/default-thumbnail.jpg"}
                    alt={resource.name || resource.title || resource.coffee_table_book_name}
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                </div>
              </div>
            ))}
          </div>

          <Resources selectedPdf={selectedPdf} selectedTitle={selectedTitle} />
        </div>
      </div>

      <Footer />
    </main>
  );
}