"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { NavBar } from "@/components/nav-bar";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { Share2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { JeevanResources } from "@/components/jeevan-resources";

export default function JeevanDarshan() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch Jeevan Darshan data from the API
    useEffect(() => {
        const fetchJeevanDarshanData = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://127.0.0.1:8000/api/jeevan-darshan/");
                if (!response.ok) throw new Error("Failed to fetch Jeevan Darshan data");
                const data = await response.json();
                setCategories(data);
                // Set initial category to first item if available
                if (data.length > 0) {
                    setSelectedCategory(data[0].title);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJeevanDarshanData();
    }, []);

    // Get current category data
    const currentCategory = categories.find(cat => cat.title === selectedCategory);

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentSlide(0);
        setIsOpen(false);
    };

    // Auto-slide images
    useEffect(() => {
        if (!currentCategory) return;
        
        const timer = setInterval(() => {
            setCurrentSlide((prev) => {
                const maxSlides = currentCategory.images.length;
                return prev === maxSlides - 1 ? 0 : prev + 1;
            });
        }, 3000);
        return () => clearInterval(timer);
    }, [currentCategory]);

    // Trigger mount animation
    useEffect(() => {
        setMounted(true);
        const storedCategory = localStorage.getItem("selectedCategory");
        if (storedCategory) {
            setSelectedCategory(storedCategory);
            localStorage.removeItem("selectedCategory");
        }
    }, []);

    if (error) return <div className="text-red-500 p-4">Error loading categories: {error}</div>;
    if (loading || !currentCategory) return <div className="p-4">Loading categories...</div>;

    return (
        <main className={`min-h-screen bg-white transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
            <NavBar />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-5xl mx-auto space-y-10">
                    <h1 className={`text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
                        Jeevan Darshan
                    </h1>

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
                                    {categories
                                        .filter(item => item.title !== selectedCategory)
                                        .map((item) => (
                                            <button
                                                key={item.title}
                                                onClick={() => handleCategoryChange(item.title)}
                                                className="w-full text-left px-4 md:px-8 py-2 font-philosopher md:py-3 hover:bg-[#f4a93d] text-base md:text-xl transition-colors"
                                            >
                                                {item.title}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`transition-all duration-700 delay-500 relative ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                        <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                            <Share2 className="h-5 w-5 text-gray-700" />
                        </button>

                        <div className="rounded-custom4 overflow-hidden relative 
                            h-[250px] w-[400px]
                            sm:h-[350px] sm:w-[500px]
                            md:h-[400px] md:w-[700px]
                            lg:h-[450px] lg:w-[900px]
                            mx-auto">
                            {currentCategory.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                                >
                                    <Image
                                        src={image.image_url}
                                        alt={image.title}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-3 mt-6">
                            {currentCategory.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? "bg-[#9B2C2C]" : "bg-gray-300"}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 w-[400px] sm:w-[500px] md:w-[700px] lg:w-[900px] mx-auto">
                        <div className="grid md:grid-cols-2 text-black gap-8">
                            <div className="prose prose-lg max-w-full">
                                <p>{currentCategory.left_description}</p>
                            </div>
                            <div className="prose prose-lg max-w-full">
                                <p>{currentCategory.right_description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 md:px-6 py-12">
                        <JeevanResources selectedCategory={selectedCategory} />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}