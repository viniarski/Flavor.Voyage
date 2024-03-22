'use client'

import PageHeader from "@/components/pageHeader"
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import time from "../../../../public/icons/duration.png"
import serving from "../../../../public/icons/serving_size.png"
import Image from "next/image";
import Link from "next/link";

export default function Page({params}) {

    // console.log(params)

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
            const { data } = await supabase
                .from('recipes')
                .select("*, users(username), categories(category_name)")
                .eq('recipe_id', `${params.recipe_id}`);

            console.log(data[0])
            setRecipes(data[0])

        };

        fetchRecipes()
    }, []);

    // console.log(recipes)

    return (
        <div className="min-h-full flex flex-col items-center">
            <PageHeader header={`${recipes.recipe_title}`} description={`How to prepare and cook ${recipes.recipe_title}`} img={"url('/images/4.avif')"} />
            <div className="py-4 flex flex-col items-center">
                <div className="grid grid-cols-2 p-16 gap-16">
                <img src={recipes.imgurl} className="rounded-3xl" alt="Chickpea" width={400} />
                    <div>
                        <h2 className="text-lg font-bold mb-2 text-accent">Category: <Link href={'#'} className="text-black font-normal hover:underline">{recipes.categories?.category_name}</Link></h2>
                        <div className="grid grid-cols-2 max-h-8 my-2">
                            <div className="flex gap-2">
                                <Image src={time} alt="duration" width={25} height={10} />
                                <p>{recipes.preparation_time} Minutes</p>
                            </div>
                            <div className="flex gap-2">
                                <Image src={serving} alt="duration" width={25} height={10} />
                                <p>Serves {recipes.serving_size}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-accent">Ingredients:</h3>
                            {recipes?.recipe_ingredients.map((ingredient, i) => (
                                <li key={i} className="text-gray-700">
                                {ingredient}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="max-w-[850px]">
                    <h3 className="text-lg font-bold mb-2 text-accent">Cooking Instruction:</h3>
                    <p className="text-lg">{recipes.cooking_instructions}</p>
                </div>
                <div className="my-4">
                    <p className="text-lg font-bold mb-2 text-accent">Uploaded: <span className="text-black font-normal">{recipes.date_created}</span></p>
                    <p className="text-lg font-bold mb-2 text-accent">By: <Link href={'#'} className="text-black font-normal hover:underline">{recipes.users?.username}</Link></p>
                </div>
            </div>
            
        </div>
    )
}