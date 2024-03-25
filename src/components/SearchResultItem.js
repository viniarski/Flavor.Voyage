// components/SearchResultItem.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import time from '../../public/icons/duration.png';
import serving from '../../public/icons/serving_size.png';

const SearchResultItem = ({ recipe }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <img
        src={recipe.imgurl}
        className="rounded-lg w-full h-48 object-cover"
        alt={recipe.recipe_title}
      />
      <div className="mt-4">
        <h2 className="text-xl font-bold">{recipe.recipe_title}</h2>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <Image src={time} alt="duration" width={20} height={20} />
            <p>{recipe.preparation_time} Minutes</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Image src={serving} alt="serving size" width={20} height={20} />
            <p>Serves {recipe.serving_size}</p>
          </div>
        </div>
        <div className="mt-4">
          <Link
            href={`/recipes/${recipe.recipe_id}`}
            className="bg-accent text-white px-4 py-2 rounded-md"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
