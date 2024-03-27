// components/SearchResults.js
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchResultItem from './SearchResultItem';
import { searchRecipes } from '../lib/searchRecipes';
import PageHeader from './pageHeader';

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
    <>
    <PageHeader header={`Search Results for "${query}"`} img={"url('/images/4.avif')"} />
    <div className="container mx-auto px-4 py-8">
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchResults.map((recipe) => (
            <SearchResultItem key={recipe.recipe_id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
    </>
  );
};

export default SearchResults;
