"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/nav-bar";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { Share2, ChevronDown } from "lucide-react";
import { API_BASE_URL, getImageUrl } from '@/utils/api';

export default function JeevanDarshan() {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    
    const API_BASE_URL = 'http://143.244.132.118';
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);


    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.touches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || !currentCategory) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            // Swipe left - show next image
            setCurrentSlide((prev) => (
                prev === currentCategory.images.length - 1 ? 0 : prev + 1
            ));
        }
        if (isRightSwipe) {
            // Swipe right - show previous image
            setCurrentSlide((prev) => (
                prev === 0 ? currentCategory.images.length - 1 : prev - 1
            ));
        }
    };

    // Fetch Jeevan Darshan data from the API
    useEffect(() => {
        const fetchJeevanDarshanData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/jeevan-darshan/`);
                if (!response.ok) throw new Error("Failed to fetch Jeevan Darshan data");
                const data = await response.json();

                // Transform the data to include full image URLs
                const transformedData = data.map(category => ({
                    ...category,
                    images: category.images.map(img => ({
                        ...img,
                        image_url: getImageUrl(img.image_url)
                    }))
                }));

                setCategories(transformedData);
                if (transformedData.length > 0) {
                    setSelectedCategory(transformedData[0].title);
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

    // Update the category change handler
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentSlide(0);
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
        <div className="page-wrapper">
            <div className="navbar-wrapper">
                <NavBar />
            </div>
            <main className={`content-wrapper bg-white transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
                }`}>
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="max-w-7xl mx-auto space-y-10">
                        <div>
                            <h1 className={`mt-10 text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}>
                                Jeevan Darshan
                            </h1>
                            <p
        className="mt-4 text-black leading-relaxed text-base md:text-lg"
        dangerouslySetInnerHTML={{ __html: currentCategory.short_description || "..." }}
      />
                        </div>

                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2 bg-[#FAF3E0] p-1 rounded-custom2 w-fit">
                                {categories.map((category) => (
                                    <button
                                        key={category.title}
                                        onClick={() => handleCategoryChange(category.title)}
                                        className={`px-4 py-2 rounded-custom2 text-sm transition-colors ${selectedCategory === category.title
                                                ? 'bg-[#E4A853] text-black'
                                                : 'text-gray-700 hover:bg-[#E4A853] hover:text-black'
                                            }`}
                                    >
                                        {category.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div className="prose prose-lg max-w-full ">
                                <p
                                    className="text-black leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: currentCategory.left_description || "..." }}
                                />

                            </div>

                            <div className={`transition-all duration-700 delay-500 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                                <div className="max-w-[500px] mx-auto">
                                    <div className="rounded-custom4 overflow-hidden relative aspect-[4/3] w-full"
                                        onTouchStart={onTouchStart}
                                        onTouchMove={onTouchMove}
                                        onTouchEnd={onTouchEnd}>
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

                                    <div className="flex justify-center gap-3 mt-4">
                                        {currentCategory.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index
                                                        ? "bg-[#9B2C2C]"
                                                        : "bg-gray-300"
                                                    }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => router.push('/resources')}
                                className="px-6 py-3 bg-[#E4A853] text-black rounded-custom2 hover:bg-[#F6B352] transition-colors"
                            >
                                View All Resources
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}