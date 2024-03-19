'use client';

import React, { useState } from 'react';

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/images/1.avif',
      title: 'Slide 1 Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl.',
    },
    {
      image: '/images/2.avif',
      title: 'Slide 2 Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl.',
    },
    {
      image: '/images/3.avif',
      title: 'Slide 3 Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl.',
    },
    {
      image: '/images/4.avif',
      title: 'Slide 4 Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl.',
    },
    {
      image: '/images/5.avif',
      title: 'Slide 5 Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Nullam auctor, nisl eget aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl.',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
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
            <div className="w-[42vh] h-[42vh] rounded-lg overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/2 h-[50vh] p-8">
              <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
              <p className="text-gray-700">{slide.description}</p>
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
