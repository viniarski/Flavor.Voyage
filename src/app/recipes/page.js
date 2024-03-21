'use client'

import Link from "next/link"
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PageHeader from "@/components/pageHeader";

export default function Page() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
            const { data, error } = await supabase
                .from('recipes')
                .select('*');

                // console.log(data)
            setRecipes(data)
        };
    
        fetchRecipes();
    }, []);

    console.log(recipes)

    return (
        <div className="min-h-full flex flex-col items-center">
            <PageHeader header={'Recipes'} description={'Browse through recipes available'} img={"url('/images/4.avif')"} />
            <div className="min-h-full grid grid-cols-2">
                {recipes.map((recipe) => (
                    <div key={recipe.recipe_id} className="bg-gray-100 max-w-full rounded-lg p-2 my-4">
                        <div className="grid grid-cols-2 gap-8">
                            <img src={recipe.imgurl} className="rounded-3xl" alt="Chickpea" width={400} />
                            <div className="flex flex-col gap-4">
                                <h2 className="text-3xl font-bold">{recipe.recipe_title}</h2>
                                <div>
                                <p className="text-lg font-bold mb-2 text-accent">Ingredients:</p>
                                <ul className="text-sm">
                                    {recipe.recipe_ingredients.map((ingredient, i) => (
                                        <li key={i} className="text-gray-700">
                                        {ingredient}
                                        </li>
                                    ))}
                                </ul>
                                </div>
                                <div className="flex items-center">
                                <Link href={`/recipes/${recipe.recipe_id}`} className="bg-accent text-lg text-white px-4 py-2 rounded-md">View Recipe</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

