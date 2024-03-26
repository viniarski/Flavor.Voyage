
import { createClient } from "@supabase/supabase-js";

export async function generateMetadata({ params }) {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
    const supabase = createClient(supabaseUrl, supabaseAnonKey);


    const fetchUser = async () => {
        const { data } = await supabase
            .from('users')
            .select("*")
            .eq("username", `${params.user}`);
        return data
    };

    const user = await fetchUser();
    console.log(user)

    return {
      title: `Flavour.Voyage - ${user[0].username}`,
      description: `${user[0].username}'s Profile`
    }
  }
  
export default async function RecipesLayout({ children }) {
    return (
        <main>{children}</main>
    );
}