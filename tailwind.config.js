/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FAFAFA',
        secondary: '#E3E3E3',
        accent: '#EE6F57',
        accentDark: '#CB3737',
      },
    },
  },
  plugins: [],
};
