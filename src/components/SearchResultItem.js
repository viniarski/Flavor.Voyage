// components/SearchResultItem.js
import React from 'react';
import Image from 'next/image';

const SearchResultItem = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-11/12 mx-auto">
      <div className="flex">
        <div className="w-1/3">
          <img
            src={recipe.imgurl}
            alt={recipe.recipe_title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-6">
          <h3 className="text-3xl font-bold mb-4">{recipe.recipe_title}</h3>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-6">
              <Image
                src="/icons/duration.png"
                alt="Duration"
                width={20}
                height={20}
                className="mr-2"
              />
              <p className="text-gray-700">{recipe.preparation_time} minutes</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/icons/serving_size.png"
                alt="Serving Size"
                width={20}
                height={20}
                className="mr-2"
              />
              <p className="text-gray-700">Serves {recipe.serving_size}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-2 text-accent">Ingredients:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recipe.recipe_ingredients &&
              (Array.isArray(recipe.recipe_ingredients)
                ? recipe.recipe_ingredients.map((ingredient, i) => (
                    <p key={i} className="text-gray-700">
                      {ingredient}
                    </p>
                  ))
                : typeof recipe.recipe_ingredients === 'string' &&
                  recipe.recipe_ingredients.split(',').map((ingredient, i) => (
                    <p key={i} className="text-gray-700">
                      {ingredient.trim()}
                    </p>
                  )))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-2 text-accent">
            Preparation Instructions:
          </h4>
          {recipe.cooking_instructions &&
            typeof recipe.cooking_instructions === 'string' &&
            recipe.cooking_instructions.split('.').map((instruction, i) => (
              <p key={i} className="text-gray-700 mb-2">
                {instruction.trim()}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
