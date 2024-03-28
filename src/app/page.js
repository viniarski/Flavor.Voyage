// page.js
import Link from 'next/link';
import RecipeCard from '../components/RecipeCard';
import BlogPostCard from '../components/BlogPostList';
import Search from '../components/Search';
import CarouselComponent from '../components/Carousel';
import About from '../components/About';
import LatestBlogPosts from '../components/LatestBlogPosts';
import RecipeCategories from '../components/RecipeCategories';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary" aria-label="Hero Section">
        <div
          className="relative bg-cover bg-center py-16 min-w-full"
          style={{ backgroundImage: "url('/images/4.webp')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-center text-white">
              Welcome to Flavor Voyage
            </h1>
            <p className="text-xl mb-8 text-center text-white">
              Discover delicious recipes and culinary adventures!
            </p>
            <Search />
          </div>
        </div>
      </section>
      <CarouselComponent />

      {/* Latest Blog Posts and Recipe Categories Sections */}
      <section
        className="py-16"
        aria-label="Latest Blog Posts and Recipe Categories"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2
                className="text-3xl text-center font-bold mb-8"
                id="latest-blog-posts-heading"
              >
                Latest Blog Posts
              </h2>
              <LatestBlogPosts aria-labelledby="latest-blog-posts-heading" />
            </div>
            <div>
              <h2
                className="text-3xl text-center font-bold mb-8"
                id="recipe-categories-heading"
              >
                Recipe Categories
              </h2>
              <RecipeCategories aria-labelledby="recipe-categories-heading" />
            </div>
          </div>
        </div>
      </section>
      <About />
    </div>
  );
}
