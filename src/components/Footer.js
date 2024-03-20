import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Flavor Voyage</h3>
            <p className="text-gray-400">
              Discover a world of culinary delights with Flavor Voyage. Explore
              our collection of delicious recipes and embark on a gastronomic
              adventure.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">
                    Recipes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest recipes and food adventures.
            </p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 text-gray-800 bg-white rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-accent rounded-r-md hover:bg-accent-dark focus:outline-none"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Flavor Voyage. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
