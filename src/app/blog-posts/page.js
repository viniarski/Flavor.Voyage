import BlogPostList from "@/components/BlogPostList";

export default async function BlogPostsPage() {
  // const blogs = await db.query(`SELECT * FROM blogs`);

  return (
    <div>
      <h2 className="text-5xl font-bold mb-4 text-center p-3">Blogs</h2>
      <BlogPostList />
    </div>
  );
}
