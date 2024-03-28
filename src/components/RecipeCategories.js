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
          <div key={category} className="flex flex-col items-center">
            <div className="bg-white rounded-full h-32 w-32 flex items-center justify-center shadow relative overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
              {category === 'Desserts' && (
                <Link href={'/recipes/category/5'}>
                  <Image
                    src="/images/6.webp"
                    alt="Dessert"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Link>
              )}
              {category === 'Vegetarian' && (
                <Link href={'/recipes/category/6'}>
                  <Image
                    src="/images/8.webp"
                    alt="Vegetarian"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Link>
              )}
              {category === 'Dinner' && (
                <Link href={'/recipes/category/3'}>
                  <Image
                    src="/images/10.webp"
                    alt="Dinner"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Link>
              )}
              {category === 'Vegan' && (
                <Link href={'/recipes/category/7'}>
                  <Image
                    src="/images/9.webp"
                    alt="Vegen"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Link>
              )}
              {category === 'Snacks' && (
                <Link href={'/recipes/category/4'}>
                  <Image
                    src="/images/11.webp"
                    alt="Snacks"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Link>
              )}
              {category === 'Gluten-free' && (
                <Link href={'/recipes/category/8'}>
                  <Image
                    src="/images/12.webp"
                    alt="Gluten Free"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Link>
              )}
              {category === 'Breakfast' && (
                <Link href={'/recipes/category/1'}>
                  <Image
                    src="/images/14.webp"
                    alt="Snacks"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Link>
              )}
              {category === 'Lunch' && (
                <Link href={'/recipes/category/2'}>
                  <Image
                    src="/images/13.webp"
                    alt="Gluten Free"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </Link>
              )}
            </div>
            <span className="text-lg font-bold mt-2">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
