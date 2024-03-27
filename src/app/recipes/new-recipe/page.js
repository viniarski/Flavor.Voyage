'use client';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import PageHeader from '@/components/pageHeader';

const CreateRecipeForm = () => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState(['']);
  const [cookingInstructions, setCookingInstructions] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [category, setCategory] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const router = useRouter();
  const { user } = useUser();
  const userId = user.id;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await supabase.from('recipes').insert({
      recipe_title: recipeTitle,
      user_id: userId,
      recipe_ingredients: recipeIngredients,
      cooking_instructions: cookingInstructions,
      serving_size: servingSize,
      preparation_time: preparationTime,
      category: category,
      imgurl: imgUrl,
    });

    router.push('/recipes');
  };

  const handleAddIngredientInput = () => {
    setRecipeIngredients([...recipeIngredients, '']);
  };

  const handleIngredientInputChange = (index, value) => {
    const newInputs = [...recipeIngredients];
    newInputs[index] = value;
    setRecipeIngredients(newInputs);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        header="Create Recipe"
        description="Share your culinary creations with the world"
        img="url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      />
      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 text-white"
        >
          <label className="block mb-4">
            <span className="text-gray-700">Recipe Title:</span>
            <input
              type="text"
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Ingredients:</span>
            <div className="mt-2">
              {recipeIngredients.map((input, index) => (
                <input
                  key={index}
                  type="text"
                  value={input}
                  onChange={(e) =>
                    handleIngredientInputChange(index, e.target.value)
                  }
                  placeholder="Add ingredient"
                  className="block w-full mt-1 p-2 border rounded-md"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddIngredientInput}
              className="mt-4 bg-accent text-white px-4 py-2 rounded-md hover:bg-accentDark"
            >
              Add Ingredient
            </button>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Cooking Instructions:</span>
            <textarea
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Servings:</span>
            <input
              type="number"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Preparation Time (minutes):</span>
            <input
              type="number"
              value={preparationTime}
              onChange={(e) => setPreparationTime(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            >
              <option value="1">Breakfast</option>
              <option value="2">Lunch</option>
              <option value="3">Dinner</option>
              <option value="4">Snacks</option>
              <option value="5">Desserts</option>
              <option value="6">Vegetarian</option>
              <option value="7">Vegan</option>
              <option value="8">Gluten-free</option>
            </select>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Image URL:</span>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <button
            type="submit"
            className="mt-4 bg-accent text-lg text-white px-4 py-2 rounded-md hover:bg-accentDark"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipeForm;
