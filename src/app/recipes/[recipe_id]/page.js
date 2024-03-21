'use client'

import PageHeader from "@/components/pageHeader"
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import time from "../../../../public/icons/duration.png"

export default function Page({params}) {

    // console.log(params)

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
            const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .eq('recipe_id', `${params.recipe_id}`);

                // console.log(data[0])
            setRecipes(data[0])
        };
    
        fetchRecipes();
    }, []);

    return (
        <div className="min-h-full flex flex-col items-center">
            <PageHeader header={`${recipes.recipe_title}`} description={`How to prepare and cook ${recipes.recipe_title}`} img={"url('/images/4.avif')"} />
            <div className="grid grid-cols-2 p-16 gap-16">
            <img src={recipes.imgurl} className="rounded-3xl" alt="Chickpea" width={400} />
                <div>
                    <h2>Category: {recipes.category}</h2>
                    <div className="grid grid-cols-2 max-h-8">
                        <div className="flex">
                            <img src="url('../../../../public/icons/duration.png')" alt="duration" width={100} height={100} />
                            <p>{recipes.preparation_time} Minutes</p>
                        </div>
                        <div className="flex">
                            <img src="url('../../../../public/icons/duration.png')" alt="duration" width={100} height={100} />
                            <p>Serves {recipes.serving_size}</p>
                        </div>
                    </div>
                    <div>
                        <h3>Ingredients:</h3>
                        {recipes.recipe_ingredients.map((ingredient, i) => (
                            <li key={i} className="text-gray-700">
                            {ingredient}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}