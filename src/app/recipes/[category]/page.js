// src/app/recipes/[category]/page.js
'use client';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipeCard';
import PageHeader from '@/components/pageHeader';

export default function CategoryPage({ params }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data: recipesData, error: recipesError } = await supabase
        .from('recipes')
        .select('*')
        .eq('category', params.category);

      if (recipesError) {
        console.error('Error fetching recipes:', recipesError);
      } else {
        setRecipes(recipesData);
      }
    };

    fetchRecipes();
  }, [params.category]);

  return (
    <>
      <PageHeader
        header={`${params.category} Recipes`}
        description={`Explore delicious ${params.category} recipes`}
        img={"url('/images/4.avif')"}
      />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{params.category} Recipes</h1>
        {recipes.length === 0 ? (
          <p>No recipes found for this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.recipe_id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
