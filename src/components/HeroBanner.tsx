"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

export default function CoffeeFarmerBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const images = [
    "/images/Firstone.jpg",
    "/images/Coffee.jpg",
    "/images/Rice.jpg"
  ];

  const SLIDE_DURATION = 10000; // 10 seconds

  const startSlideTimer = () => {
    // Clear existing timer
    if (intervalRef.current) clearTimeout(intervalRef.current);

    // Start slide timer
    intervalRef.current = setTimeout(() => {
      setCurrentImageIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % images.length;
        console.log(`Moving from image ${prevIndex} to image ${nextIndex}`);
        return nextIndex;
      });
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    startSlideTimer();

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [currentImageIndex]); // Restart timer when image changes

  const handleDotClick = (index: number) => {
    if (index !== currentImageIndex) {
      setCurrentImageIndex(index);
      // Timer will restart automatically due to useEffect dependency
    }
  };

  const handleSellNowClick = () => {
    // Check authentication status
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to seller dashboard
        router.push('/dashboard');
      } else {
        // User is not logged in, redirect to login page
        router.push('/login');
      }
    });
  };

  return (
    <div className="relative w-full h-96 overflow-hidden shadow-2xl">
      {/* Image Slider */}
      <div
        className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Farm scene ${index + 1}`}
            className="w-full h-96 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <div className="mb-4">
            <span className="inline-block bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Farm Fresh
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 leading-tight drop-shadow-lg">
            A New Era for <span className="text-black">Farmers</span>.
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-8 leading-tight drop-shadow-md">
            A New World of Possibilities.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-sm">
              Shop Now 
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
            </button>
            <button 
              onClick={handleSellNowClick}
              className="group text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-sm" 
              style={{backgroundColor: '#00A79D'}}
            >
              Sell Now 
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Dots with Progress Animation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          >
            {index === currentImageIndex && (
              <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{borderColor: '#00A79D'}}></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-6 right-6 w-20 h-20 rounded-full opacity-20 z-10 animate-pulse" style={{background: 'linear-gradient(135deg, #00A79D, #78CCD0)'}}></div>
      <div className="absolute bottom-12 right-12 w-16 h-16 rounded-full opacity-25 z-10 animate-bounce" style={{background: 'linear-gradient(135deg, #FCB000, #FF990B)'}}></div>
      <div className="absolute top-1/2 right-1/4 w-10 h-10 rounded-full opacity-30 z-10" style={{background: 'linear-gradient(135deg, #FF990B, #FCB000)'}}></div>
    </div>
  );
}