import BlogPostList from "@/components/BlogPostList";
import PageHeader from "@/components/pageHeader";

export default async function BlogPostsPage() {
  return (
    <div>
      <PageHeader
        header={"Blogs"}
        description={"Check out our latest blogs"}
        img={"url('/images/4.avif')"}
      />
      <BlogPostList />
    </div>
  );
}
