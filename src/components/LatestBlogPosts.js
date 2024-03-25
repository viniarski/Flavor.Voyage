// components/LatestBlogPosts.js
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

export default function LatestBlogPosts() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchLatestBlogPosts = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data } = await supabase
        .from('blogs')
        .select('*')
        .order('date_created', { ascending: false })
        .limit(2);

      setBlogs(data);
    };

    fetchLatestBlogPosts();
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    const truncated = description.slice(0, maxLength);
    return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
  };

  return (
    <div className="space-y-8">
      {blogs.map((blog) => (
        <div key={blog.blog_id} className="flex bg-white shadow rounded-lg p-4">
          <div className="w-40 h-40 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={blog.imgurl}
              alt="picture of delicious food"
              width={200}
              height={200}
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold mb-2">{blog.blog_title}</h3>
            <p className="text-base mb-2">
              {truncateDescription(blog.blog_content, 170)}
            </p>
            <Link href={`/blog-posts/${blog.blog_id}`}>
              <span className="text-accent hover:text-accentDark">
                Read More
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
