// components/RecipeCard.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={recipe.imgurl}
          alt={recipe.recipe_title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{recipe.recipe_title}</h2>
        <p className="text-gray-600 mb-4">
          Preparation Time: {recipe.preparation_time} minutes
        </p>
        <Link href={`/recipes/${recipe.recipe_id}`}>
          <span className="bg-accent text-white px-4 py-2 rounded-md cursor-pointer">
            View Recipe
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
