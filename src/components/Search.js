
// components/Search.js
'use client';


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  return (
    <div
      className="relative bg-cover bg-center py-12 h-[30vh]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto px-4">
        <h1
          className="text-5xl font-bold mb-4 text-center text-white"
          aria-label="Welcome"
        >
          Welcome to Flavor Voyage
        </h1>
        <p className="text-xl mb-8 text-center text-white">
          Discover delicious recipes and culinary adventures!
        </p>
        <form
          onSubmit={handleSearch}
          className="max-w-md mx-auto"
          aria-label="Search serction"
        >
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md">
            <input
              aria-label="Input search"
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 focus:outline-none text-white"
            />
            <button
              aria-label="Search button"
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
