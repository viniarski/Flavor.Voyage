# Flavor Voyage

Flavor Voyage is a web application that allows users to explore and discover a wide variety of recipes. It provides a platform for users to browse recipes, create their own recipes, and read blog posts related to cooking and food.

## Features

- Browse and search for recipes based on different criteria such as recipe title, ingredients, and cooking instructions.
- View detailed information about each recipe, including ingredients, cooking instructions, preparation time, and serving size.
- Create and share your own recipes with the community.
- Read blog posts related to cooking, food, and culinary experiences.
- Responsive and user-friendly interface.

## Technologies Used

- Next.js: A React framework for building server-side rendered and statically generated web applications.
- Supabase: An open-source alternative to Firebase for building backend services and managing databases.
- Clerk: A user authentication and management solution for web applications.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces.

## Getting Started

To run the Flavor Voyage application locally, follow these steps:

1. Clone the repository:

git clone https://github.com/viniarski/flavor-voyage

2. Install the dependencies:
cd flavor-voyage
npm install

3. Set up the environment variables:
- Create a `.env.local` file in the root directory of the project.
- Add the following variables to the `.env.local` file:

  ```
  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
  NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
  ```

  Replace `your-supabase-url`, `your-supabase-anon-key`, and `your-clerk-frontend-api` with your actual Supabase and Clerk configuration values.

4. Start the development server:
npm run dev

5. Open your browser and visit `http://localhost:3000` to see the application running.

## Folder Structure

The project follows a standard Next.js folder structure:

- `components/`: Contains reusable React components used throughout the application.
- `lib/`: Contains utility functions and helper modules.
- `pages/`: Contains the main pages of the application.
- `public/`: Contains static assets such as images and icons.
- `app/`: Contains global CSS styles and Tailwind CSS configuration.

## Contributing

Contributions to Flavor Voyage are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact the project maintainer.

