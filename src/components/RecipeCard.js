import Link from 'next/link';

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow rounded-lg">
      {/* thumbnail image */}
      <div className="p-4">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <Link href={`/recipes/${recipe.slug}`}>
          <a className="text-accent hover:text-accentDark">Read More</a>
        </Link>
      </div>
    </div>
  );
}
