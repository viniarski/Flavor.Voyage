import BlogPostCard from "@/components/BlogPostCard";
import Link from "next/link";

export default async function BlogPostsPage() {
  {
    /* Insert SQL query to database to pull blogs:
    const blogs = await sql`SELECT * FROM blogs` */
  }

  return (
    <div>
      <h2 className="text-5xl font-bold mb-4 text-center p-3">Blogs</h2>
      {/* {blogs.rows.map((blog) => (
        <BlogPostCard key={blog.id} blogData={blog}/>
      ))} */}

      {/* Testing layout without data*/}
      <div className="bg-white shadow rounded-lg">
        {/* thumbnail image */}
        <div className="p-4">
          <h3 className="text-3xl font-bold mb-2">Testing - Blog Title</h3>
          <p className="mb-4">By *insert username*</p>
          <p className="text-xl mb-4">
            This is a test of layout. Preview of blog content will go here.
          </p>
          <Link href="#">
            <span className="text-accent hover:text-accentDark">Read More</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
