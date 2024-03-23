"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

const CreateRecipeForm = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([""]);
  const [cookingInstructions, setCookingInstructions] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const router = useRouter();
  const { user } = useUser();
  const userId = user.id;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await supabase.from("recipes").insert({
      recipe_title: recipeTitle,
      user_id: userId,
      recipe_ingredients: recipeIngredients,
      cooking_instructions: cookingInstructions,
      serving_size: servingSize,
      preparation_time: preparationTime,
      category: category,
      imgurl: imgUrl,
    });

    router.push("/recipes");
  };

  const handleAddIngredientInput = () => {
    setRecipeIngredients([...recipeIngredients, ""]);
  };

  const handleIngredientInputChange = (index, value) => {
    const newInputs = [...recipeIngredients];
    newInputs[index] = value;
    setRecipeIngredients(newInputs);
  };
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-6 rounded-md shadow-md"
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
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
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
            <option value="1">Main Course</option>
            <option value="2">Salad</option>
            <option value="3">Appetizer</option>
            <option value="4">Breakfast</option>
            <option value="5">Dessert</option>
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
          className="mt-4 bg-red-600 text-lg text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecipeForm;