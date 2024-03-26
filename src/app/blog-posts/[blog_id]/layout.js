
import { createClient } from "@supabase/supabase-js";

export async function generateMetadata({ params }) {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
    const supabase = createClient(supabaseUrl, supabaseAnonKey);


    const fetchBlogs = async () => {
        const { data } = await supabase
            .from('blogs')
            .select("*, users (user_id, username)")
            .eq("blog_id", `${params.blog_id}`);
        return data
    };

    const blogs = await fetchBlogs();
    // console.log(blogs)

    return {
      title: `Flavour.Voyage - ${blogs[0].blog_title}`,
      description: `Post by ${blogs[0].users.username}`
    }
  }
  
export default async function RecipesLayout({ children }) {
    return (
        <main>{children}</main>
    );
}