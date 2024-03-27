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
          className="bg-white shadow rounded-lg flex flex-col sm:flex-row m-6 md:h-[200px]"
        >
          <Image
            src={blog.imgurl}
            alt="picture of delicious food"
            width={120}
            height={120}
            className="m-4 rounded-md lg:max-w-[250px] min-h-[120px]"
          />
          <div className="p-4">
            <h3 className="text-lg md:text-xl lg:text-3xl font-bold max-w-[300px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[800px]">
              {blog.blog_title}
            </h3>
            <p className="md:text-xl mb-4 truncate whitespace-nowrap overflow-hidden invisible sm:visible sm:w-[400px] md:w-[550px] lg:w-[800px] xl:w-[900px]">
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
