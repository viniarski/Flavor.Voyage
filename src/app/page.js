import Link from 'next/link';
import RecipeCard from '../components/RecipeCard';
import BlogPostCard from '../components/BlogPostCard';
import Search from '../components/Search';
import CarouselComponent from '../components/Carousel';
import About from '../components/About';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary">
        <Search />
        <CarouselComponent />
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-g">
        <div className="bg-gray-200 py-64">
          <h2 className="text-3xl text-center font-bold mb-8">
            Featured Recipes
          </h2>
        </div>{' '}
      </section>

      {/* Latest Blog Posts and Recipe Categories Sections */}
      <section className="py-16 bg-g">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 py-64">
              <h2 className="text-3xl text-center font-bold mb-8">
                Latest Blog Posts
              </h2>
            </div>
            <div className="bg-gray-200 py-64">
              <h2 className="text-3xl text-center font-bold mb-8">
                Recipe Categories
              </h2>
            </div>
          </div>
        </div>
      </section>

      <About />
    </div>
  );
}
