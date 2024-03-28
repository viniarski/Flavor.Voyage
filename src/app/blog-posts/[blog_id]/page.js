'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import PageHeader from '@/components/pageHeader';
import Image from 'next/image';
import BlogCommentsSection from '@/components/BlogComments';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share';

export default function DynamicBlogPostPage({ params }) {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data } = await supabase
        .from('blogs')
        .select('*, users (user_id, username)')
        .eq('blog_id', `${params.blog_id}`);

      setBlog(data[0]);
    };

    fetchBlogPost();
  }, []);

  return (
    <>
      <PageHeader
        header={blog.blog_title}
        description={`By ${blog.users?.username}`}
        img={"url('/images/4.webp')"}
      />
      <div className="flex flex-col m-4 items-center lg:flex-row lg:items-start">
        <Image
          src={blog.imgurl}
          alt="picture of delicious food"
          width={400}
          height={350}
          className="m-4 max-h-[350px] rounded-md"
        />
        <div className="flex flex-col items-center lg:items-start">
          <p>
            <span className="text-lg font-bold text-accent m-4">Created:</span>
            {`${blog.date_created}`.slice(0, 10)}
          </p>
          <div>
            <FacebookShareButton
              url={`https://flavor-voyage-five.vercel.app/blog-posts/${params.blog_id}`}
            >
              <FacebookIcon size={32} round className="ml-4 mt-4" />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://flavor-voyage-five.vercel.app/blog-posts/${params.blog_id}`}
            >
              <TwitterIcon size={32} round className="ml-2 mt-4" />
            </TwitterShareButton>
            <PinterestShareButton
              url={`https://flavor-voyage-five.vercel.app/blog-posts/${params.blog_id}`}
            >
              <PinterestIcon size={32} round className="ml-2 mt-4" />
            </PinterestShareButton>
            <WhatsappShareButton
              url={`https://flavor-voyage-five.vercel.app/blog-posts/${params.blog_id}`}
            >
              <WhatsappIcon size={32} round className="ml-2 mt-4" />
            </WhatsappShareButton>
          </div>
          <p className="text-xl m-4 whitespace-pre-line">{blog.blog_content}</p>
        </div>
      </div>
      <BlogCommentsSection params={params} />
    </>
  );
}
