import Link from "next/link";

export default function BlogPostCard({ blog }) {
  return (
    <div className="bg-white shadow rounded-lg">
      {/* thumbnail image */}
      <div className="p-4">
        <h3>{blog.blog_title}</h3>
        <p>{blog.blog_content}</p>
        <Link href={`/blog/${blog.blog_id}`}>
          <a className="text-accent hover:text-accentDark">Read More</a>
        </Link>
      </div>
    </div>
  );
}
