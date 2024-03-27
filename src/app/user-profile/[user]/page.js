"use client";
import { useEffect, useState } from "react";
import CreateButton from "@/components/createPost";
import { useUser } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import PageHeader from "@/components/pageHeader";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { user, isLoaded } = useUser();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }

    const fetchData = async () => {
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
      const fetchUserData = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("cover_pic, bio")
          .eq("user_id", user.id);
        return data || [];
      };

      const fetchedBlogs = await fetchBlogs();
      const fetchedRecipes = await fetchRecipes();
      const fetchedUserData = await fetchUserData();

      setBlogs(fetchedBlogs);
      setRecipes(fetchedRecipes);
      setIsLoading(false);
      setUserData(fetchedUserData);
      setBio(fetchedUserData[0]?.bio);
      setCoverPic(fetchedUserData[0]?.cover_pic);
    };

    fetchData();
  }, [user, isLoaded]);

  if (!isLoaded || isLoading) {
    return <div>Loading...</div>;
  }

  let username = user?.username;
  let profilePic = user?.imageUrl;

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const saveEditProfile = async () => {
    await supabase
      .from("users")
      .update({
        cover_pic: coverPic,
        bio: bio,
      })
      .eq("user_id", user.id);

    const { data, error } = await supabase
      .from("users")
      .select("cover_pic, bio")
      .eq("user_id", user.id);
    setUserData(data || []);

    handleFormToggle();
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <PageHeader
        header={`${username}'s Page`}
        description={userData[0]?.bio}
        img={`url(${
          userData[0]?.cover_pic ? userData[0].cover_pic : "/images/4.avif"
        })`}
      />

      <div className="text-center py-12">
        <img
          src={profilePic}
          className="rounded-full w-32 h-32 object-cover mx-auto"
          alt="Profile"
        />
        <button
          onClick={handleFormToggle}
          className="mt-4 bg-accent text-white px-4 py-2 rounded-md hover:bg-accentDark hover:scale-105 active:scale-100 transition transform duration-200 ease-in-out"
        >
          Edit Profile
        </button>
        {showForm && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 rounded-md border"
            />
            <input
              type="text"
              placeholder="Enter cover picture URL"
              value={coverPic}
              onChange={(e) => setCoverPic(e.target.value)}
              className="w-full mt-2 p-2 rounded-md border"
            />
            <button
              onClick={saveEditProfile}
              className="mt-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-accentDark"
            >
              Save
            </button>
          </div>
        )}
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

      {!isMobile ? (
        <div className="container mx-auto px-4 mt-12 pb-8 ">
          <h1 className="text-center text-3xl font-bold mb-8">Recipes</h1>
          <div className="flex flex-col items-center mb-8 ">
            {recipes && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe.recipe_id}
                  className="bg-white rounded-lg p-4 shadow-md mb-8"
                  style={{ minWidth: "91vw" }}
                >
                  <div className="grid grid-cols-2 gap-8">
                    <img
                      src={recipe.imgurl}
                      className="rounded-lg"
                      alt="Chickpea"
                    />
                    <div className="flex flex-col gap-4">
                      <h2 className="text-2xl font-bold">
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
      ) : (
        <div className="container mx-auto mt-12 pb-8">
          <h1 className="text-center text-3xl font-bold mb-8">Recipes</h1>
          <div className="flex flex-col items-center mb-8">
            {recipes && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe.recipe_id}
                  className="flex-shrink-0 w-full flex-col items-center justify-center mt-4 mb-8"
                >
                  <div className="w-[100vw] h-[45vh]  overflow-hidden mt-2">
                    <h2 className="text-2xl font-bold text-center">
                      {recipe.recipe_title}
                    </h2>
                    <Link
                      href={`/recipes/${recipe.recipe_id}`}
                      className="block w-full bg-accent text-lg text-white px-4 py-2  hover:scale-105 active:scale-100 transition transform duration-200 ease-in-out text-center"
                    >
                      View Recipe
                    </Link>
                    <img
                      src={recipe.imgurl}
                      className="w-full h-full object-cover"
                      alt="Chickpea"
                    />
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center"></div>
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
      )}
      <div className="flex justify-center pb-16">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
