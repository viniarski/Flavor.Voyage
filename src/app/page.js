import Link from "next/link";
import RecipeCard from "../components/RecipeCard";
import BlogPostCard from "../components/BlogPostList";
import Search from "../components/Search";
import CarouselComponent from "../components/Carousel";
import About from "../components/About";
import LatestBlogPosts from "../components/LatestBlogPosts";
import RecipeCategories from "../components/RecipeCategories";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary">
        <Search />
        <CarouselComponent />
      </section>

      {/* Latest Blog Posts and Recipe Categories Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl text-center font-bold mb-8">
                Latest Blog Posts
              </h2>
              <LatestBlogPosts />
            </div>
            <div>
              <h2 className="text-3xl text-center font-bold mb-8">
                Recipe Categories
              </h2>
              <RecipeCategories />
            </div>
          </div>
        </div>
      </section>
      <About />
    </div>
  );
}
