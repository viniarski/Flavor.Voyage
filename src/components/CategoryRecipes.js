// components/CategoryRecipes.js
'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import RecipeCard from './RecipeCard';
import PageHeader from './pageHeader';

const CategoryRecipes = ({ category }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('category_id')
        .eq('category_name', category)
        .single();

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        return;
      }

      const { data: recipesData, error: recipesError } = await supabase
        .from('recipes')
        .select('*')
        .eq('category', categoryData.category_id);

      if (recipesError) {
        console.error('Error fetching recipes:', recipesError);
      } else {
        setRecipes(recipesData);
      }
    };

    if (category) {
      fetchRecipes();
    }
  }, [category]);

  return (
    <div>
      <PageHeader
        header={`${category} Recipes`}
        description={`Explore delicious ${category} recipes`}
        img={"url('/images/4.avif')"}
      />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{category} Recipes</h1>
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
    </div>
  );
};

export default CategoryRecipes;
