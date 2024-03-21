"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function BlogPostList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data: blogs, error } = await supabase.from("blogs").select("*");

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(blogs);
      }
    };

    fetchBlogPosts();
  }, []);

  console.log(blogs);

  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.blog_id} className="bg-white shadow rounded-lg">
          {/* thumbnail image */}
          <div className="p-4">
            <h3 className="text-3xl font-bold mb-2">{blog.blog_title}</h3>
            <p className="text-xl mb-4">{blog.blog_content}</p>
            <Link href={`/blog/${blog.blog_id}`}>
              <span className="text-accent hover:text-accentDark">
                Read More
              </span>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
