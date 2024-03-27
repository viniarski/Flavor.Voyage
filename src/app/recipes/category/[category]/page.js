"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PageHeader from "@/components/pageHeader";
import CreateButton from "@/components/createPost";
import Image from "next/image";


export default function Page({params}) {

  // console.log(params)

  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState()

  useEffect(() => {
    const fetchRecipes = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data } = await supabase.from("recipes").select("*, categories (category_name)").eq('category', `${params.category}`);
      setRecipes(data);
      
      setTitle(data[0].categories.category_name)
      console.log(data[0].categories.category_name)
    };
    
    fetchRecipes();
    
  }, []);

  return (
    <div className="min-h-full flex flex-col justify-around">
      <PageHeader
        header={`${title}`}
        description={`Browse through ${title} recipes available`}
        img={"url('/images/4.avif')"}
      />
      <div className="flex justify-center">
        <CreateButton redirect="/recipes/new-recipe" buttonText="Create Recipe" />
      </div>
      <div className="min-h-full grid grid-cols-2 justify-items-center">
        {recipes.map((recipe) => (
          <div
            key={recipe.recipe_id}
            className="bg-gray-200 rounded-lg p-2 my-4 min-h-[450px] flex items-center"
          >
            <div className="grid grid-cols-2 gap-8 px-4 py-2 max-w-[800px] items-center">
              <Image
                src={recipe.imgurl}
                className="rounded-3xl"
                alt="Chickpea"
                width={400}
                height={200}
              />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold">{recipe.recipe_title}</h2>
                  <Link className="text-accent font-bold hover:underline" href={`/recipes/category/${recipe.recipe_id}`}>{recipe.categories.category_name}</Link>
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
    </div>
  );
}
