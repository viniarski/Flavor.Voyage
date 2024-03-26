// src/app/recipes/[recipe_id]/page.js

'use client';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import time from '../../../../public/icons/duration.png';
import serving from '../../../../public/icons/serving_size.png';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/pageHeader';

export default function Page({ params }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data, error } = await supabase
        .from('recipes')
        .select('*, users (user_id, username)')
        .eq('recipe_id', `${params.recipe_id}`);

      if (error) {
        console.error('Error fetching recipe:', error);
      } else if (data && data.length > 0) {
        setRecipe(data[0]);
      } else {
        setRecipe(null);
      }
    };

    fetchRecipe();
  }, [params.recipe_id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeader
        header={recipe.recipe_title}
        description={`By ${recipe.users?.username}`}
        img={"url('/images/4.avif')"}
      />
      <div className="py-4 flex flex-col items-center">
        <div className="grid grid-cols-2 p-16 gap-16">
          <img
            src={recipe.imgurl}
            className="rounded-3xl"
            alt="Chickpea"
            width={400}
          />
          <div>
            <h2 className="text-lg font-bold mb-2 text-accent">
              Category:{' '}
              <Link
                href={'#'}
                className="text-black font-normal hover:underline"
              >
                {recipe.categories?.category_name}
              </Link>
            </h2>
            <div className="grid grid-cols-2 max-h-8 my-2">
              <div className="flex gap-2">
                <Image src={time} alt="duration" width={25} height={10} />
                <p>{recipe.preparation_time} Minutes</p>
              </div>
              <div className="flex gap-2">
                <Image src={serving} alt="duration" width={25} height={10} />
                <p>Serves {recipe.serving_size}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-accent">
                Ingredients:
              </h3>
              {recipe.recipe_ingredients &&
                recipe.recipe_ingredients.map((ingredient, i) => (
                  <li key={i} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
            </div>
          </div>
        </div>
        <div className="max-w-[850px]">
          <h3 className="text-lg font-bold mb-2 text-accent">
            Cooking Instruction:
          </h3>
          <p className="text-lg">{recipe.cooking_instructions}</p>
        </div>
        <div className="my-4">
          <p className="text-lg font-bold mb-2 text-accent">
            Uploaded:{' '}
            <span className="text-black font-normal">
              {recipe.date_created}
            </span>
          </p>
          <p className="text-lg font-bold mb-2 text-accent">
            By:{' '}
            <Link href={'#'} className="text-black font-normal hover:underline">
              {recipe.users?.username}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
