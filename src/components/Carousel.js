'use client';

import React, { useState } from 'react';

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Spaghetti Carbonara',
      ingredients:
        '400g spaghetti\n200g pancetta or bacon\n4 large eggs\n100g Parmesan cheese\n2 cloves garlic\nBlack pepper\nSalt',
      description:
        'Cook the spaghetti in a large pot of boiling salted water until al dente. Meanwhile, cut the pancetta or bacon into small pieces and fry in a pan until crispy. In a bowl, whisk together the eggs, grated Parmesan cheese, minced garlic, and black pepper. Drain the cooked spaghetti and add it to the pan with the pancetta. Remove from heat. Pour the egg mixture over the spaghetti and quickly toss until the eggs are cooked and the sauce is creamy. Add a little pasta water if needed. Season with salt and more black pepper to taste. Serve hot, garnished with extra Parmesan cheese.',
      duration: '30 min',
    },
    {
      image:
        'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Chicken Curry',
      ingredients:
        '500g chicken breast, cut into chunks\n1 onion, chopped\n2 cloves garlic, minced\n1 tbsp ginger, grated\n2 tbsp curry powder\n1 can (400ml) coconut milk\n1 tbsp vegetable oil\nSalt and pepper',
      description:
        'Heat the oil in a large pan over medium heat. Add the onion and cook until softened. Add the garlic, ginger, and curry powder. Cook for 1-2 minutes until fragrant. Add the chicken pieces and cook until browned on all sides. Pour in the coconut milk and bring to a simmer. Cook for 15-20 minutes until the chicken is cooked through and the sauce has thickened. Season with salt and pepper to taste. Serve hot with rice or naan bread.',
      duration: '40 min',
    },
    {
      image:
        'https://images.unsplash.com/photo-1611695500858-e6ac19b1ca55?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Fish Tacos',
      ingredients:
        '500g white fish fillets\n8 corn tortillas\n1 avocado, sliced\n1 red onion, sliced\n1 lime, cut into wedges\n1 tbsp olive oil\n2 tsp chili powder\nSalt and pepper',
      description:
        'Preheat the oven to 200°C (400°F). Place the fish fillets on a baking sheet and drizzle with olive oil. Sprinkle with chili powder, salt, and pepper. Bake the fish for 10-12 minutes until cooked through and easily flakes with a fork. Warm the tortillas in the oven or microwave. Flake the cooked fish into bite-sized pieces. Assemble the tacos by placing the fish, avocado slices, red onion slices, and a squeeze of lime juice on each tortilla. Serve immediately.',
      duration: '25 min',
    },
    {
      image:
        'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Vegetable Stir-Fry',
      ingredients:
        '2 tbsp vegetable oil\n2 cloves garlic, minced\n1 inch ginger, grated\n1 red bell pepper, sliced\n1 carrot, sliced\n1 zucchini, sliced\n1 cup broccoli florets\n2 tbsp soy sauce\n1 tbsp honey\n1 tsp sesame oil',
      description:
        'Heat the vegetable oil in a wok or large skillet over high heat. Add the garlic and ginger and stir-fry for 30 seconds. Add the sliced vegetables and stir-fry for 5-7 minutes until crisp-tender. In a small bowl, whisk together the soy sauce, honey, and sesame oil. Pour the sauce over the vegetables and stir-fry for another minute until well coated. Serve hot as a side dish or with rice for a main course.',
      duration: '20 min',
    },
    {
      image:
        'https://images.unsplash.com/photo-1653542773369-51cce8d08250?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Berry Banana Smoothie',
      ingredients:
        '1 ripe banana\n1 cup mixed berries (strawberries, raspberries, blueberries)\n1 cup milk (dairy or non-dairy)\n1/2 cup yogurt (optional)\n1 tbsp honey (optional)\nIce cubes',
      description:
        'Peel the banana and cut it into chunks. In a blender, combine the banana chunks, mixed berries, milk, yogurt (if using), and honey (if using). Add a handful of ice cubes to the blender. Blend the ingredients until smooth and creamy. Pour the smoothie into glasses and serve immediately. Garnish with extra berries or a mint leaf if desired.',
      duration: '5 min',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    setShowDescription(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    setShowDescription(false);
  };

  const toggleDescription = () => {
    setShowDescription((prevShowDescription) => !prevShowDescription);
  };

  return (
    <div className="relative h-[55vh]">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex items-center justify-center"
          >
            <div className="w-[47vh] h-[47vh] rounded-lg overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/2 h-[55vh] p-8 overflow-y-auto">
              <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
              <p className="text-gray-700">Duration: {slide.duration}</p>
              <div className="mt-4">
                <button
                  onClick={toggleDescription}
                  className="bg-accent text-white px-4 py-2 rounded-md"
                >
                  {showDescription ? 'Show Ingredients' : 'Show How to Prepare'}
                </button>
              </div>
              {showDescription ? (
                <div className="mt-4">
                  <h4 className="text-lg font-bold mb-2 text-accent">
                    Description:
                  </h4>
                  <p className="text-gray-700">{slide.description}</p>
                </div>
              ) : (
                <div className="mt-4">
                  <h4 className="text-lg font-bold mb-2 text-accent">
                    Ingredients:
                  </h4>
                  <ul className="list-disc list-inside">
                    {slide.ingredients.split('\n').map((ingredient, i) => (
                      <li key={i} className="text-gray-700">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <img src="/icons/prev.png" alt="Previous" className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <img src="/icons/next.png" alt="Next" className="w-6 h-6" />
      </button>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index
                ? 'bg-accent'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
