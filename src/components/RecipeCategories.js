// components/RecipeCategories.js
'use client';
import Link from 'next/link';

export default function RecipeCategories() {
  const categories = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snacks',
    'Desserts',
    'Vegetarian',
    'Vegan',
    'Gluten-free',
  ];

  return (
    <div className="bg-gray-100 p-10 rounded-lg">
      <div className="grid grid-cols-4 gap-16">
        {categories.map((category) => (
          <Link key={category} href={`/recipes?category=${category}`}>
            <div className="bg-white rounded-full h-32 w-32 flex items-center justify-center shadow">
              <span className="text-lg font-bold">{category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
