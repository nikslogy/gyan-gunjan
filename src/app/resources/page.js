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

  const resourceMenuItems = [
    'Regional Flip Books',
    'Movies', 
    'Thematic Concept Notes',
    'Coffee Table Books'
  ];

  const images = [
    { src: "/images/ct1.png", alt: "Resource Image 1" },
    { src: "/images/ct2.png", alt: "Resource Image 2" },
    { src: "/images/ct3.png", alt: "Resource Image 3" },
  ];

  const coffeeResources = [
    { image: "/images/ct1.png", title: "Coffee Table Book 1" },
    { image: "/images/ct2.png", title: "Coffee Table Book 2" },
    { image: "/images/ct3.png", title: "Coffee Table Book 3" },
    { image: "/images/ct4.png", title: "Coffee Table Book 4" },
    { image: "/images/ct5.png", title: "Coffee Table Book 5" }
  ];
  const regionalResources = [
    { image: "/images/1.png", title: "Regional Book 1" },
    { image: "/images/17.png", title: "Regional Book 2" },
    { image: "/images/17.png", title: "Regional Book 3" },
    { image: "/images/17.png", title: "Regional Book 4" }
  ];
  const thematicResources = [
    { image: "/images/CompandiumsP1.png", title: "Thematic Note 1" },
    { image: "/images/CompandiumsP1.png", title: "Thematic Note 2" }
  ];

  useEffect(() => {
    setMounted(true);
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl) {
      setSelectedCategory(typeFromUrl);
      router.replace('/resources', undefined, { shallow: true });
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    if (category === 'Movies') {
      router.push('/movies');
    } else {
      setSelectedCategory(category);
      setIsOpen(false);
    }
  };

  return (
    <main
      className={`min-h-screen bg-white transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}
    >
      <NavBar />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-10">
          <h1
            className={`text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}
          >
            Resources
          </h1>

          <div className="w-full sm:w-[300px] mb-8">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-block w-full text-left font-bold bg-[#E7B24B] text-black px-4 md:px-8 py-6 rounded-custom2 text-base md:text-xl flex items-center justify-between transition-all duration-300 hover:bg-[#f4a93d]"
              >
                <span>{selectedCategory}</span>
                <div
                  className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              </button>

              <div
                className={`absolute top-full left-0 w-full overflow-hidden text-black bg-[#F6B352] rounded-b-lg mt-1 z-10 transition-all duration-300 ease-in-out ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="py-2">
                  {resourceMenuItems.map((item, index) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {selectedCategory === 'Coffee Table Books' && 
              coffeeResources.map((resource, idx) => (
                <div
                  key={idx}
                  className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="p-0">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      width={200}
                      height={300}
                      className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                  </div>
                </div>
              ))
            }
            {selectedCategory === 'Regional Flip Books' && (
              <>
                <div className="col-span-full">
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
                  </div>
                </div>
                {regionalResources.map((resource, idx) => (
                  <div
                    key={idx}
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
                ))
              }
              </>
            )}
            {selectedCategory === 'Movies' &&
              movieResources.map((resource, idx) => (
                <div
                  key={idx}
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
              ))
            }
            {selectedCategory === 'Thematic Concept Notes' &&
              thematicResources.map((resource, idx) => (
                <div
                  key={idx}
                  className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer"
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
              ))
            }
          </div>
          <Resources />
        </div>
      </div>

      <Footer />
    </main>
  );
}
