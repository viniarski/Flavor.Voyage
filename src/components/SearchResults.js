// components/SearchResults.js
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchResultItem from './SearchResultItem';
import { searchRecipes } from '../lib/searchRecipes';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const data = await searchRecipes(query);
        setSearchResults(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Search Results for "{query}"</h2>
      {searchResults.length > 0 ? (
        <div className="space-y-6">
          {searchResults.map((recipe) => (
            <SearchResultItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
