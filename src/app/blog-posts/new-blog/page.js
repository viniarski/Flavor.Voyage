'use client';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import PageHeader from '@/components/pageHeader';

const CreateBlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const router = useRouter();
  const { user } = useUser();
  const userId = user.id;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await supabase.from('blogs').insert({
      blog_title: blogTitle,
      user_id: userId,
      blog_content: blogContent,
      imgurl: imgUrl,
    });

    router.push('/blog-posts');
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        header="Create Blog Post"
        description="Share your thoughts and experiences"
        img="url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      />
      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 text-white"
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
            className="mt-4 bg-accent text-lg text-white px-4 py-2 rounded-md hover:bg-accentDark"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
