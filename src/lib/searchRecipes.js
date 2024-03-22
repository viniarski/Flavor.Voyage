import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function searchRecipes(query) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .textSearch(
        'recipe_title, recipe_ingredients, cooking_instructions',
        query
      );

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}
