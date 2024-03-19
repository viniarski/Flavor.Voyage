import Link from 'next/link';

export default function BlogPostCard({ post }) {
  return (
    <div className="bg-white shadow rounded-lg">
      {/* thumbnail image */}
      <div className="p-4">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>
          <a className="text-accent hover:text-accentDark">Read More</a>
        </Link>
      </div>
    </div>
  );
}
