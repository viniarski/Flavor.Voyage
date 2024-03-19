import Link from 'next/link';
import RecipeCard from '../components/RecipeCard';
import BlogPostCard from '../components/BlogPostCard';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to Flavor Voyage</h1>
          <p className="text-lg mb-8">
            Discover delicious recipes and culinary adventures!
          </p>
          <p> SEARCH BAR</p>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Recipes</h2>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
        </div>
      </section>

      {/* Recipe Categories Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recipe Categories</h2>
        </div>
      </section>

      {/* About us Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">About us</h2>
        </div>
      </section>

      {/* Newslater us Categories Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Subscribe to our newslater
          </h2>
        </div>
      </section>
    </div>
  );
}
