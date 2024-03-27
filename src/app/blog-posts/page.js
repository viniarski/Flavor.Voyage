import BlogPostList from '@/components/BlogPostList';
import CreateButton from '@/components/createPost';
import PageHeader from '@/components/pageHeader';

export default async function BlogPostsPage({ searchParams }) {
  return (
    <div>
      <PageHeader
        header={'Blogs'}
        description={'Check out our latest blogs'}
        img={
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }
      />
      <div className="flex justify-center mt-8">
        <CreateButton
          redirect="/blog-posts/new-blog"
          buttonText="Create Post"
          className="mt-8"
        />
      </div>
      <BlogPostList />
    </div>
  );
}
