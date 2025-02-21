"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { API_BASE_URL } from '@/utils/api'

export function HeroSection2() {
  const [data, setData] = useState(null); // State to store API data
  const router = useRouter(); // Next.js router for navigation
  const [exitAnimation, setExitAnimation] = useState(false); // State for exit animation
  // const API_BASE_URL = 'http://143.244.132.118';


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
        const response = await fetch(`${API_BASE_URL}/api/landing-sections/hero2/`);
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

  // Show loading state while data is being fetched
  if (!data) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="py-2 md:py-6 lg:py-6 mt-12">
      <div className="grid md:grid-cols-2 gap-10 md:gap-18 items-start max-w-5xl mx-auto">
        {/* Left Column: Text Content */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#7A2631] font-bold relative top-[-5] mb-8">
            {data.title}
          </h2>
          <p className="text-black leading-relaxed text-base md:text-lg max-w-lg whitespace-pre-line">
            {data.short_description}
          </p>
          {/* <button
            onClick={handleLearnMoreSec2}
            className="bg-[#F8D89A] text-black px-4 md:px-6 py-2 rounded-custom2 hover:bg-[#f6a93d] transition-colors text-sm"
          >
            Learn More
          </button> */}
        </div>

        {/* Right Column: Single Image */}
        <div className="relative">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[500px] relative">
            {data.images[0] && (
              <Image
                src={data.images[0].image}
                alt={data.images[0].caption || 'Section image'}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}