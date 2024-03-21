'use client';

import React, { useState } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Reset the search query
    setSearchQuery('');
  };

  return (
    <div
      className="relative bg-cover bg-center py-12 h-[30vh]"
      style={{ backgroundImage: "url('/images/4.avif')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 text-center text-white">
          Welcome to Flavor Voyage
        </h1>
        <p className="text-xl mb-8 text-center text-white">
          Discover delicious recipes and culinary adventures!
        </p>
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-accent text-white px-6 py-2 rounded-r-full hover:bg-accent-dark focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
