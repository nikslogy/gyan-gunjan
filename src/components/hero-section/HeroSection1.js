"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection1() {
  const [data, setData] = useState(null); // State to store API data
  const [currentSlide, setCurrentSlide] = useState(0); // State for slider
  const router = useRouter(); // Next.js router for navigation
  const [exitAnimation, setExitAnimation] = useState(false); // State for exit animation

  // Function to handle "Learn More" button click
  const handleLearnMoreSec1 = () => {
    // Start exit animation
    setExitAnimation(true);

    // Navigate to the about page after animation completes
    setTimeout(() => {
      router.push('/about-project');
    }, 200);
  };

  // Fetch data from Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/landing-sections/hero1/');
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
    <section className="py-2 md:py-6 lg:py-6">
      <div className="grid md:grid-cols-2 gap-10 md:gap-18 items-start max-w-5xl mx-auto">
        {/* Left Column: Text Content */}
        <div className={`space-y-6 transition-all duration-700 ${exitAnimation ? 'translate-x-[-100px] opacity-0' : 'translate-x-0 opacity-100'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#7A2631] font-bold relative top-[-5]">
            {data.title}
          </h2>
          <p className="text-black leading-relaxed text-base md:text-lg max-w-s mt-10 whitespace-pre-line">
            {data.short_description}
          </p>
          <button
            onClick={handleLearnMoreSec1}
            className="bg-[#F8D89A] font-inter text-black px-4 md:px-6 py-2 rounded-custom2 hover:bg-[#f6a93d] transition-colors text-sm"
          >
            Learn More
          </button>
        </div>

        {/* Right Column: Image Slider */}
        <div className={`transition-all duration-700 ${exitAnimation ? 'translate-x-[100px] opacity-0' : 'translate-x-0 opacity-100'}`}>
          <div className="relative h-[350px] md:h-[400px] lg:h-[350px] w-full">
            <div className="rounded-custom overflow-hidden relative h-full">
              {data.images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                >
                  <Image
                    src={image.image}
                    alt={image.caption || 'Section image'}
                    fill
                    className="object-cover"
                    priority={index === 0} // Prioritize loading the first image
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Slider Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {data.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${currentSlide === index ? "bg-[#9B2C2C]" : "bg-gray-300"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}