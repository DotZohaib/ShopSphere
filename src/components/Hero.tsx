'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const countdownDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000; // 5 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center p-4">
      <div className="relative z-10 max-w-6xl w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-6 md:p-10 lg:p-12">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="bg-red-600 h-6 w-2"></span>
            <h3 className="text-xl md:text-2xl font-bold text-red-700 uppercase tracking-wide">Today&apos;s</h3>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">New Stock Category</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center mt-8 gap-6 lg:gap-10">
          {/* Image Section */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Image
              src="/images/newsletter.png"
              alt="Speaker"
              width={500}
              height={500}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content Section */}
          <div className="text-center sm:text-left flex-1">
            <p className="text-green-600 text-lg mb-2 font-semibold">Categories</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
              Enhance Your Music Experience
            </h1>
            <p className="text-gray-700 text-sm sm:text-base mt-4 mb-6">
              Discover the ultimate sound quality with our newly launched products. Don’t miss out on these amazing offers.
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center sm:justify-start flex-wrap gap-4 mb-6">
              {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, idx) => (
                <div
                  key={unit}
                  className="bg-gray-900 text-white rounded-lg shadow p-3 sm:p-4 w-16 sm:w-20 text-center"
                >
                  <span className="block text-xl sm:text-2xl font-bold">
                    {idx === 0
                      ? timeLeft.days
                      : idx === 1
                      ? timeLeft.hours
                      : idx === 2
                      ? timeLeft.minutes
                      : timeLeft.seconds}
                  </span>
                  <span className="text-gray-300 text-xs sm:text-sm">{unit}</span>
                </div>
              ))}
            </div>

            <Link
  href="/Cart"
  className="inline-block bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-500 text-white font-semibold text-base sm:text-lg py-2 px-4 sm:px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
>
  Buy Now!
</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
