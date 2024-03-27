
import { createClient } from "@supabase/supabase-js";

export async function generateMetadata({ params }) {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
    const supabase = createClient(supabaseUrl, supabaseAnonKey);


    const fetchRecipes = async () => {
        const { data } = await supabase
            .from('recipes')
            .select("*, users(username), categories(category_name)")
            .eq('category', `${params.category}`);
        return data
    };

    const recipe = await fetchRecipes();
    // console.log(recipe)

    return {
      title: `Flavour.Voyage - ${recipe[0].categories.category_name} Recipes`,
      description: `Browse through ${recipe[0].recipe_title} recipes available `
    }
  }
  
export default async function RecipesLayout({ children }) {
    return (
        <main>{children}</main>
    );
}