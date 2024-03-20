'use client';

import React from 'react';

const About = () => {
  return (
    <section
      className="py-16 bg-cover bg-center h-screen relative"
      style={{ backgroundImage: "url('/images/1.avif')", height: '65vh' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-accent">About us</h2>
        <p className="text-lg text-white mb-8">
          Meet the team behind Flavor.Voyage
        </p>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="flex space-x-10">
              <div className="w-36 h-36 bg-gray-300 rounded-full"></div>
              <div className="w-36 h-36 bg-gray-300 rounded-full"></div>
              <div className="w-36 h-36 bg-gray-300 rounded-full"></div>
              <div className="w-36 h-36 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg text-white mb-4">
              We are a passionate team of food enthusiasts who love to explore
              and share delicious recipes from around the world. Our mission is
              to inspire home cooks of all levels to discover new flavors,
              techniques, and culinary adventures.
            </p>
            <p className="text-lg text-white mb-4">
              With years of experience in the food industry and a deep love for
              cooking, we strive to create a platform that is both informative
              and engaging. From easy weeknight dinners to impressive dinner
              party dishes, we've got you covered.
            </p>
            <p className="text-lg text-white">
              Join us on this exciting journey as we continue to grow our
              collection of recipes, share expert tips and tricks, and build a
              vibrant community of food lovers. Together, let's make every meal
              a flavorful voyage!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
