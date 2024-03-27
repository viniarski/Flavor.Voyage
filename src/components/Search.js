"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="max-w-md mx-auto mt-8">
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-800 focus:outline-none text-black bg-white"
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
  );
};

export default Search;
