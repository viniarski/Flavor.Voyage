// components/RecipeCategories.js
'use client';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="bg-gray-100 p-8 rounded-lg">
      <div className="grid grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link key={category} href={`/recipes?category=${category}`}>
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full h-32 w-32 flex items-center justify-center shadow relative overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                {category === 'Desserts' && (
                  <Image
                    src="/images/6.avif"
                    alt="Dessert"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
                {category === 'Vegetarian' && (
                  <Image
                    src="/images/8.avif"
                    alt="Vegetarian"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
                {category === 'Dinner' && (
                  <Image
                    src="/images/10.avif"
                    alt="Dinner"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
                {category === 'Vegan' && (
                  <Image
                    src="/images/9.avif"
                    alt="Vegen"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
                {category === 'Snacks' && (
                  <Image
                    src="/images/11.avif"
                    alt="Snacks"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
                {category === 'Gluten-free' && (
                  <Image
                    src="/images/12.avif"
                    alt="Gluten Free"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
                {category === 'Breakfast' && (
                  <Image
                    src="/images/14.avif"
                    alt="Snacks"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
                {category === 'Lunch' && (
                  <Image
                    src="/images/13.avif"
                    alt="Gluten Free"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
              </div>
              <span className="text-lg font-bold mt-2">{category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
