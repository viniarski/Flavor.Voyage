"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

const CreateRecipeForm = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const router = useRouter();
  const { user } = useUser();
  const userId = user.id;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await supabase.from("blogs").insert({
      blog_title: blogTitle,
      user_id: userId,
      blog_content: blogContent,
      imgurl: imgUrl,
    });

    router.push("/blog-posts");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-6 rounded-md shadow-md"
      >
        <label className="block mb-4">
          <span className="text-gray-700">Blog Title:</span>
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Blog Content:</span>
          <textarea
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            className="block w-full mt-1 p-2 border rounded-md"
          />
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
