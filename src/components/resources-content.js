"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Resources } from "@/components/resources";

export function ResourcesContent({ initialCategory = 'Coffee Table Books' }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedState, setSelectedState] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');

    useEffect(() => {
        setSelectedCategory(initialCategory);
    }, [initialCategory]);

    const resourceMenuItems = [
        'Regional Flip Books',
        'Movies',
        'Thematic Concept Notes',
        'Coffee Table Books'
    ];

    const coffeeResources = [
        { image: "/images/ct1.png", title: "Coffee Table Book 1", pdf: "/books/Concept-Note.pdf" },
        { image: "/images/ct2.png", title: "Coffee Table Book 2", pdf: "/books/Concept-Note.pdf" },
        { image: "/images/ct3.png", title: "Coffee Table Book 3", pdf: "/books/coffee-table-3.pdf" },
        { image: "/images/ct4.png", title: "Coffee Table Book 4", pdf: "/books/coffee-table-4.pdf" },
        { image: "/images/ct5.png", title: "Coffee Table Book 5", pdf: "/books/coffee-table-5.pdf" }
    ];

    const regionalResources = [
        { image: "/images/1.png", title: "Regional Book 1", pdf: "/books/regional-1.pdf" },
        { image: "/images/17.png", title: "Regional Book 2", pdf: "/books/regional-2.pdf" },
        { image: "/images/17.png", title: "Regional Book 3", pdf: "/books/regional-3.pdf" },
        { image: "/images/17.png", title: "Regional Book 4", pdf: "/books/regional-4.pdf" }
    ];

    const thematicResources = [
        { image: "/images/CompandiumsP1.png", title: "Thematic Note 1", pdf: "/books/Concept-Note.pdf" },
        { image: "/images/CompandiumsP1.png", title: "Thematic Note 2", pdf: "/books/thematic-2.pdf" }
    ];

    const handleCategoryChange = (category) => {
        if (category === 'Movies') {
            router.push('/movies');
        } else {
            setSelectedCategory(category);
            setIsOpen(false);
        }
    };

    const handleBookSelect = (pdf, title) => {
        setSelectedPdf(pdf);
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

    const dropdownItems = resourceMenuItems.filter(item => item !== selectedCategory);

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300">Resources</h1>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {selectedCategory === 'Coffee Table Books' && 
                    coffeeResources.map((resource, idx) => (
                        <div
                            key={idx}
                            className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => handleBookSelect(resource.pdf, resource.title)}
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
                                onClick={() => handleBookSelect(resource.pdf, resource.title)}
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
                    </>
                )}
                {selectedCategory === 'Thematic Concept Notes' &&
                    thematicResources.map((resource, idx) => (
                        <div
                            key={idx}
                            className="group overflow-hidden border rounded-custom2 transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => handleBookSelect(resource.pdf, resource.title)}
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
            <Resources selectedPdf={selectedPdf} selectedTitle={selectedTitle} />
        </div>
    );
}