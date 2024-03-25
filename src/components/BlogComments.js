"use client";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export default function CommentsSection({ params }) {
  const [blogComment, setBlogComment] = useState("");
  const [displayBlogComments, setDisplayBlogComments] = useState([]);

  useEffect(() => {
    fetchBlogComments();
  }, []);

  const { user } = useUser();
  const userId = user?.id;

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

  // console.log(displayBlogComments);

  return (
    <>
      <div>
        <form onSubmit={handleSaveComment}>
          <label htmlFor="blog_comment">Leave a comment:</label>
          <textarea
            value={blogComment}
            onChange={(event) => setBlogComment(event.target.value)}
            placeholder="Any thoughts? Reviews? Share here!"
          />
          <button type="submit">Save Comment</button>
        </form>
      </div>

      <div>
        {displayBlogComments.map((blogComment) => (
          <div key={blogComment.blog_comment_id}>
            <h3>{blogComment.users?.username}</h3>
            <p>{blogComment.blog_comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}
