"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [slides, setSlides] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data: allRecipes, error } = await supabase
        .from("recipes")
        .select("*");

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        const shuffledRecipes = shuffleArray(allRecipes);
        const randomRecipes = shuffledRecipes.slice(0, 5);
        setSlides(randomRecipes);
      }
    };

    fetchRecipes();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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

  return !isMobile ? (
    <div className="relative h-[58vh] overflow-hidden">
      {slides.length > 0 ? (
        <>
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
                    src={slide.imgurl}
                    alt={slide.recipe_title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2 h-[55vh] p-8 overflow-y-auto">
                  <h3 className="text-3xl font-bold mb-4">
                    {slide.recipe_title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Image
                      src="/icons/duration.png"
                      alt="Duration"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <p className="text-gray-700">
                      {slide.preparation_time} minutes
                    </p>
                  </div>
                  <div className="flex items-center mb-4">
                    <Image
                      src="/icons/serving_size.png"
                      alt="Serving Size"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <p className="text-gray-700">Serves {slide.serving_size}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={toggleDescription}
                      className="bg-accent text-white px-4 py-2 rounded-md"
                    >
                      {showDescription
                        ? "Show Ingredients"
                        : "Show How to Prepare"}
                    </button>
                  </div>
                  {showDescription ? (
                    <div className="mt-4">
                      <h4 className="text-lg font-bold mb-2 text-accent">
                        Description:
                      </h4>
                      {slide.cooking_instructions.length > 470 ? (
                        <>
                          <p className="text-gray-700 mb-2">
                            {slide.cooking_instructions.slice(0, 470)}...
                          </p>
                          <Link
                            href={`/recipes/${slide.recipe_id}`}
                            className="text-accent font-bold"
                          >
                            Read More
                          </Link>
                        </>
                      ) : (
                        <p className="text-gray-700 mb-2">
                          {slide.cooking_instructions}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4">
                      <h4 className="text-lg font-bold mb-2 text-accent">
                        Ingredients:
                      </h4>
                      {slide.recipe_ingredients.length > 470 ? (
                        <>
                          <p className="text-gray-700 mb-2">
                            {slide.recipe_ingredients.slice(0, 470)}...
                          </p>
                          <Link
                            href={`/recipes/${slide.recipe_id}`}
                            className="text-accent font-bold"
                          >
                            Read More
                          </Link>
                        </>
                      ) : (
                        <div
                          className={`grid ${
                            slide.recipe_ingredients.length > 6
                              ? "grid-cols-2"
                              : "grid-cols-1"
                          } gap-2`}
                        >
                          {slide.recipe_ingredients.map((ingredient, i) => (
                            <p key={i} className="text-gray-700">
                              {ingredient}
                            </p>
                          ))}
                        </div>
                      )}
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
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index
                    ? "bg-accent"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading recipes...</p>
        </div>
      )}
    </div>
  ) : (
    <div className="relative h-[58vh] overflow-hidden">
      {slides.length > 0 ? (
        <>
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex-col items-center justify-center mt-4"
              >
                <div className="w-[100vw] h-[56vh] rounded-lg overflow-hidden">
                  <h3 className="text-3xl font-bold mb-4 text-center">
                    {slide.recipe_title}
                  </h3>
                  <Link
                    href={`/recipes/${slide.recipe_id}`}
                    className="block w-full bg-accent text-lg text-white px-4 py-2  hover:scale-105 active:scale-100 transition transform duration-200 ease-in-out text-center"
                  >
                    Read More
                  </Link>
                  <img
                    src={slide.imgurl}
                    alt={slide.recipe_title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2 h-[55vh] p-8 overflow-y-auto"></div>
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
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index
                    ? "bg-accent"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading recipes...</p>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;
