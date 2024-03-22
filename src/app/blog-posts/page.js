import BlogPostList from "@/components/BlogPostList";
import CreateButton from "@/components/createPost";
import PageHeader from "@/components/pageHeader";

export default async function BlogPostsPage({ searchParams }) {
  return (
    <div>
      <PageHeader
        header={"Blogs"}
        description={"Check out our latest blogs"}
        img={"url('/images/4.avif')"}
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
