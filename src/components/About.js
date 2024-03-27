'use client';

import React, { useEffect, useState } from 'react';

const About = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      className="py-16 bg-cover bg-center h-screen relative"
      style={{
        backgroundImage: "url('/images/1.webp')",
        height: windowWidth < 1281 ? '80vh' : '60vh',
      }}
      aria-label="About Us"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-accent sm:mb-0 md:mb-0">
          About Us
        </h2>
        <p className="text-lg text-white mb-8 sm:mb-o">
          Meet the team behind Flavor.Voyage
        </p>
        <div
          className={`flex ${windowWidth <= 1281 ? 'flex-col' : 'flex-row'}  `}
        >
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start items-baseline space-y-4 md:space-y-0 space-x-4 md:space-x-10">
              <div className="w-36 h-36 bg-gray-300 rounded-full transition duration-300 ease-in-out transform hover:scale-105 aspect-square object-cover"></div>
              <div className="w-36 h-36 bg-gray-300 rounded-full transition duration-300 ease-in-out transform hover:scale-105 aspect-square object-cover"></div>
              <div className="w-36 h-36 bg-gray-300 rounded-full transition duration-300 ease-in-out transform hover:scale-105 aspect-square object-cover"></div>
              <div className="w-36 h-36 bg-gray-300 rounded-full transition duration-300 ease-in-out transform hover:scale-105 aspect-square object-cover"></div>
            </div>
          </div>
          {windowWidth >= 768 && windowWidth < 1281 && (
            <div className="w-full mb-8 md:mb-0">
              <p className="text-lg text-white mb-4">
                We are a passionate team of food enthusiasts who love to explore
                and share delicious recipes from around the world. Our mission
                is to inspire home cooks of all levels to discover new flavors,
                techniques, and culinary adventures.
              </p>
              <p className="text-lg text-white mb-4">
                With years of experience in the food industry and a deep love
                for cooking, we strive to create a platform that is both
                informative and engaging. From easy weeknight dinners to
                impressive dinner party dishes, we&apos;ve got you covered.
              </p>
              <p className="text-lg text-white">
                Join us on this exciting journey as we continue to grow our
                collection of recipes, share expert tips and tricks, and build a
                vibrant community of food lovers. Together, let&apos;s make
                every meal a flavorful voyage!
              </p>
            </div>
          )}
          {windowWidth >= 1281 && (
            <div className="w-full md:w-1/2 md:ml-20">
              <p className="text-lg text-white mb-4">
                We are a passionate team of food enthusiasts who love to explore
                and share delicious recipes from around the world. Our mission
                is to inspire home cooks of all levels to discover new flavors,
                techniques, and culinary adventures.
              </p>
              <p className="text-lg text-white mb-4">
                With years of experience in the food industry and a deep love
                for cooking, we strive to create a platform that is both
                informative and engaging. From easy weeknight dinners to
                impressive dinner party dishes, we&apos;ve got you covered.
              </p>
              <p className="text-lg text-white">
                Join us on this exciting journey as we continue to grow our
                collection of recipes, share expert tips and tricks, and build a
                vibrant community of food lovers. Together, let&apos;s make
                every meal a flavorful voyage!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
