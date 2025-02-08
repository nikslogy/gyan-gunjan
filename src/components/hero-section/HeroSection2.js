"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection2() {
  const [data, setData] = useState(null); // State to store API data
  const [currentSlide, setCurrentSlide] = useState(0); // State for slider
  const router = useRouter(); // Next.js router for navigation
  const [exitAnimation, setExitAnimation] = useState(false); // State for exit animation

  // Function to handle "Learn More" button click
  const handleLearnMoreSec2 = () => {
    // Start exit animation
    setExitAnimation(true);

    // Navigate to the 100-regions page after animation completes
    setTimeout(() => {
      router.push('/100-regions');
    }, 200); // 0.5 second delay to allow animation to finish
  };

  // Fetch data from Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/landing-sections/hero2/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Slider logic
  useEffect(() => {
    if (data?.images) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === data.images.length - 1 ? 0 : prev + 1));
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [data?.images?.length]);

  // Show loading state while data is being fetched
  if (!data) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-4xl mx-auto">
        {/* Left Column: Image Slider */}
        <div className="relative order-2 md:order-1 -ml-4 md:-ml-20">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[500px] relative">
            {data.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
              >
                <Image
                  src={image.image} // Ensure this is a full URL (e.g., http://127.0.0.1:8000/media/...)
                  alt={image.caption || 'Section image'}
                  fill
                  className="object-contain"
                  priority={index === 0} // Prioritize loading the first image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add responsive sizes
                />
              </div>
            ))}
          </div>

          {/* Slider Navigation Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {data.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? "bg-[#7A2631]" : "bg-gray-300"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="space-y-4 md:space-y-6 order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#7A2631] font-bold relative top-[-5]">
            {data.title}
          </h2>
          <p className="text-black leading-relaxed text-base md:text-lg max-w-s mt-10">
            {data.long_description}
          </p>
          <button
            onClick={handleLearnMoreSec2}
            className="bg-[#F8D89A] text-black px-4 md:px-6 py-2 rounded-custom2 hover:bg-[#f6a93d] transition-colors text-sm"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}