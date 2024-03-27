"use client";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export default function BlogCommentsSection({ params }) {
  const [blogComment, setBlogComment] = useState("");
  const [displayBlogComments, setDisplayBlogComments] = useState([]);

  useEffect(() => {
    fetchBlogComments();
  }, []);

  const { user } = useUser();
  const userId = user?.id;
  const profilepic = user?.imageUrl;
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

  async function fetchBlogComments() {
    const { data } = await supabase
      .from("blog_comments")
      .select("*, users (user_id, username)")
      .eq("blog_id", `${params.blog_id}`);

    setDisplayBlogComments(data);
  }

  const handleSaveComment = async () => {
    await supabase.from("users").insert({
      user_id: userId,
      profilepic: profilepic,
      username: username,
    });
    let response = await supabase.from("blog_comments").insert({
      blog_comment: blogComment,
      user_id: userId,
      blog_id: `${params.blog_id}`,
    });

    if (response.ok) {
      fetchBlogComments();
    } else {
      console.error("Failed to add comment", response.status);
    }
  };

  return (
    <>
      <form onSubmit={handleSaveComment} className="flex flex-col m-8">
        <label
          htmlFor="blog_comment"
          className="mt-4 text-accent text-xl font-bold px-4 py-2"
        >
          Leave a comment:
        </label>
        <textarea
          value={blogComment}
          onChange={(event) => setBlogComment(event.target.value)}
          placeholder="Any thoughts? Reviews? Share here!"
          className="px-4 py-2 rounded-md"
        />
        <button
          type="submit"
          className="mt-4 bg-accent text-lg text-white px-4 py-2 rounded-md hover:bg-accentDark"
        >
          Save Comment
        </button>
      </form>

      {displayBlogComments.map((blogComment) => (
        <div
          key={blogComment.blog_comment_id}
          className="bg-white shadow rounded-lg m-6 h-fit p-4"
        >
          <div className="flex justify-between p-2 ">
            <h3 className="text-xl font-bold text-accent">
              {blogComment.users?.username}
            </h3>
            <p className="text-gray-500 text-xs self-center">
              {`${blogComment.date_created}`.slice(0, 10)}
            </p>
          </div>

          <p className="p-2 ">{blogComment.blog_comment}</p>
        </div>
      ))}
    </>
  );
}
