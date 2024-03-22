import { currentUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const ProfilePage = async () => {
  const user = await currentUser();
  const profilePicture = user.imageUrl;
  const userId = user.id;
  let username;
  if (user && user.username) {
    username = user.username;
  } else if (user && user.firstName && user.lastName) {
    username = `${user.firstName} ${user.lastName}`;
  } else {
    username = "Anonymous";
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("user_id", userId);

    return data;
  };
  const blogs = await fetchBlogs();

  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("user_id", userId);
    return data;
  };
  const recipes = await fetchRecipes();

  console.log(recipes);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="text-center py-12">
        <img
          src={profilePicture}
          className="rounded-full w-32 h-32 object-cover mx-auto"
          alt="Profile"
        />
        <h1 className="text-2xl mt-4">{username}&#39;s Page</h1>
      </div>

      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl font-bold mb-8">Blog Posts</h1>
        <div>
          {blogs.map((blog) => (
            <div
              key={blog.blog_id}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-2">{blog.blog_title}</h2>
              <p className="text-lg mb-4">{blog.blog_content}</p>
              <Link
                href={`/blog/${blog.blog_id}`}
                className="text-accent hover:text-accentDark"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pb-8">
        <h1 className="text-center text-3xl font-bold mb-8">Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <div className="grid grid-cols-2 gap-8">
                <img
                  src={recipe.imgurl}
                  className="rounded-lg"
                  alt="Chickpea"
                />
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold">{recipe.recipe_title}</h2>
                  <div>
                    <p className="text-lg font-bold mb-2 text-accent">
                      Ingredients:
                    </p>
                    <ul className="text-sm list-disc list-inside">
                      {recipe.recipe_ingredients.map((ingredient, i) => (
                        <li key={i} className="text-gray-700">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center">
                    <Link
                      href={`/recipes/${recipe.recipe_id}`}
                      className="bg-accent text-lg text-white px-4 py-2 rounded-md"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
