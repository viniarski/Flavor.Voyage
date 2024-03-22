"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import PageHeader from "@/components/pageHeader";
import Image from "next/image";

export default function DynamicBlogPostPage({ params }) {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data } = await supabase
        .from("blogs")
        .select("*, users (user_id, username)")
        .eq("blog_id", `${params.blog_id}`);

      setBlog(data[0]);
    };

    fetchBlogPost();
  }, []);

  console.log(blog);

  return (
    <>
      <PageHeader
        header={blog.blog_title}
        description={"Will be blog.users.username when I can get it to work"}
        img={"url('/images/4.avif')"}
      />
      <div className="flex m-4">
        <Image
          src={blog.imgurl}
          alt="picture of delicious food"
          width={400}
          height={400}
          className="m-4"
        />
        <p className="text-xl m-4">{blog.blog_content}</p>
      </div>
    </>
  );
}
