"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

export default function BlogPostList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data } = await supabase.from("blogs").select("*");

      setBlogs(data);
    };

    fetchBlogPosts();
  }, []);

  return (
    <>
      {blogs.map((blog) => (
        <div
          key={blog.blog_id}
          className="bg-white shadow rounded-lg flex m-6 h-[200px]"
        >
          <Image
            src={blog.imgurl}
            alt="picture of delicious food"
            width={200}
            height={200}
            className="mx-4"
          />
          <div className="p-4">
            <h3 className="text-3xl font-bold mb-2">{blog.blog_title}</h3>
            <p className="text-xl mb-4 truncate whitespace-nowrap overflow-hidden w-[900px]">
              {blog.blog_content}
            </p>
            <Link href={`/blog-posts/${blog.blog_id}`}>
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
