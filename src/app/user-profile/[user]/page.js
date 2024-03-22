"use client";
import { useEffect, useState } from "react";
import CreateButton from "@/components/createPost";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }

    const fetchData = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const fetchBlogs = async () => {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("user_id", user.id);
        return data || [];
      };

      const fetchRecipes = async () => {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("user_id", user.id);
        return data || [];
      };

      const userProfileData = " user profile data ";
      const fetchedBlogs = await fetchBlogs();
      const fetchedRecipes = await fetchRecipes();

      setUserProfile(userProfileData);
      setBlogs(fetchedBlogs);
      setRecipes(fetchedRecipes);
      setIsLoading(false);
    };

    fetchData();
  }, [user, isLoaded]);

  if (!isLoaded || isLoading) {
    return <div>Loading...</div>;
  }

  let username = user?.username;
  let profilePic = user?.imageUrl;

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="text-center py-12">
        <img
          src={profilePic}
          className="rounded-full w-32 h-32 object-cover mx-auto"
          alt="Profile"
        />
        <h1 className="text-2xl mt-4">{username}&#39;s Page</h1>
      </div>

      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="flex flex-col items-center mb-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.blog_id}
                className="bg-white rounded-lg p-4 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-2">{blog.blog_title}</h2>
                <p className="text-lg mb-4">{blog.blog_content}</p>
                <Link
                  href={`/blog-posts/${blog.blog_id}`}
                  className="text-accent hover:text-accentDark"
                >
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center mb-8">
              <CreateButton
                redirect="/blog-posts/new-blog"
                buttonText="Create Your First Post"
              />
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pb-8">
        <h1 className="text-center text-3xl font-bold mb-8">Recipes</h1>
        <div className="flex flex-col items-center mb-8">
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.recipe_id}
                className="bg-white rounded-lg p-4 shadow-md  "
              >
                <div className="grid grid-cols-2 gap-8">
                  <img
                    src={recipe.imgurl}
                    className="rounded-lg"
                    alt="Chickpea"
                  />
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold ">
                      {recipe.recipe_title}
                    </h2>
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
            ))
          ) : (
            <div className="text-center  mb-8 flex items-center">
              <CreateButton
                redirect="/recipes/new-recipe"
                buttonText="Create Your First Recipe"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
