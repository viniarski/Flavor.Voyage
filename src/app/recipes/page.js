'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import PageHeader from '@/components/pageHeader';
import CreateButton from '@/components/createPost';
import Image from 'next/image';

export default function Page({ searchParams }) {
  // console.log(searchParams)

  const [recipes, setRecipes] = useState([]);
  const [isTablet, setIstablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
      setIstablet(window.innerWidth >= 550 && window.innerWidth < 1355);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // if (searchParams === false) {
      //   const { data } = await supabase.from("recipes").select("*");
      //   setRecipes(data);
      // } else {
      //   const { data } = await supabase.from("recipes").select("*").eq('category', `${searchParams}`);
      //   setRecipes(data)
      // }

      const { data } = await supabase
        .from('recipes')
        .select('*, categories (category_name)');
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-full flex flex-col justify-around">
      <PageHeader
        header={'Recipes'}
        description={'Browse through recipes available'}
        img={"url('/images/4.webp')"}
      />
      <div className="flex justify-center">
        <CreateButton
          redirect="/recipes/new-recipe"
          buttonText="Create Recipe"
        />
      </div>

      {isTablet ? (
        <div className="min-h-full flex-col justify-items-center ">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="bg-gray-200 rounded-lg p-2 my-4 min-h-[450px] flex items-center "
            >
              <div className="grid grid-cols-2 gap-8 px-4 py-2 max-w-[650px] items-center">
                <Image
                  src={recipe.imgurl}
                  className="rounded-3xl"
                  alt="Chickpea"
                  width={400}
                  height={200}
                />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold">
                      {recipe.recipe_title}
                    </h2>
                    <Link
                      className="text-accent font-bold hover:underline"
                      href={`/recipes/category/${recipe.category}`}
                    >
                      {recipe.categories.category_name}
                    </Link>
                  </div>

                  <div>
                    <p className="text-lg font-bold mb-2 text-accent">
                      Ingredients:
                    </p>
                    <ul className="text-sm">
                      {recipe.recipe_ingredients.map((ingredient, i) => (
                        <li key={i} className="text-gray-700">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center">
                    <Link
                      href={`/recipes/${recipe.recipe_id}`}
                      className="bg-accent text-lg text-white px-4 py-2 rounded-md hover:scale-105 active:scale-100 transition transform duration-200 ease-in-out"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isMobile ? (
        <div className="min-h-full flex-col justify-items-center">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="flex-shrink-0 w-full flex-col items-center justify-center mt-4 mb-8"
            >
              <div className="w-[100vw] h-[45vh]  overflow-hidden mt-2">
                <h2 className="text-2xl font-bold text-center">
                  {recipe.recipe_title}
                </h2>
                <Link
                  href={`/recipes/${recipe.recipe_id}`}
                  className="block w-full bg-accent text-lg text-white px-4 py-2  hover:scale-105 active:scale-100 transition transform duration-200 ease-in-out text-center"
                >
                  View Recipe
                </Link>
                <Image
                  src={recipe.imgurl}
                  className="w-full h-full object-cover"
                  alt="Chickpea"
                  width={400}
                  height={200}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-full grid grid-cols-2 justify-items-center">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="bg-gray-200 rounded-lg p-2 my-4 min-h-[450px] flex items-center"
            >
              <div className="grid grid-cols-2 gap-8 px-4 py-2 max-w-[700px] items-center">
                <Image
                  src={recipe.imgurl}
                  className="rounded-3xl"
                  alt="Chickpea"
                  width={400}
                  height={200}
                />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold">
                      {recipe.recipe_title}
                    </h2>
                    <Link
                      className="text-accent font-bold hover:underline"
                      href={`/recipes/category/${recipe.category}`}
                    >
                      {recipe.categories.category_name}
                    </Link>
                  </div>

                  <div>
                    <p className="text-lg font-bold mb-2 text-accent">
                      Ingredients:
                    </p>
                    <ul className="text-sm">
                      {recipe.recipe_ingredients.map((ingredient, i) => (
                        <li key={i} className="text-gray-700">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center">
                    <Link
                      href={`/recipes/${recipe.recipe_id}`}
                      className="bg-accent text-lg text-white px-4 py-2 rounded-md hover:scale-105 active:scale-100 transition transform duration-200 ease-in-out"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
