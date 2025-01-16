'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MovieSlider({ movies, onPlayClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const scale = screenWidth < 640 ? 0.8 : 0.6;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className="relative h-[180px] sm:h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {movies.map((movie, index) => {
            const position = (index - currentSlide + movies.length) % movies.length;
            const isCenter = position === 0;
            const isPrev = position === movies.length - 1;
            const isNext = position === 1;

            return (
              <div
                key={index}
                className="absolute transition-all duration-500 ease-in-out"
                style={{
                  transform: isCenter
                    ? 'translateX(-50%) translateY(-50%) scale(1)'
                    : isPrev
                      ? `translateX(-120%) translateY(-50%) scale(${scale})`
                      : isNext
                        ? `translateX(20%) translateY(-50%) scale(${scale})`
                        : 'scale(0)',
                  left: '50%',
                  top: '50%',
                  opacity: isCenter ? 1 : 0.5,
                  zIndex: isCenter ? 30 : 10,
                }}
              >
                <div className={`relative group ${isCenter ? '' : 'pointer-events-none'}`}>
                  <div
                    className="w-[320px] sm:w-[480px] lg:w-[640px] aspect-video rounded-2xl overflow-hidden 
    transition-transform duration-500 hover:scale-110"
                  >
                    <Image
                      src={movie.image}
                      alt={`Movie ${index + 1}`}
                      fill
                      className="object-cover rounded-2xl"
                    />
                    {isCenter && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
        flex items-center justify-center bg-black/50 rounded-2xl"
                      >
                        <button
                          onClick={() => onPlayClick(movie)}
                          className="bg-[#E7B24B] text-black px-6 py-2 rounded-full font-semibold transform -translate-y-4 
          group-hover:translate-y-0 transition-all duration-300"
                        >
                          Watch Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-[#9B2C2C] hover:text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="black" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-[#9B2C2C] hover:text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="black" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-2 sm:bottom-0 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-50">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full ${currentSlide === index ? 'w-6 sm:w-8 bg-[#9B2C2C]' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}