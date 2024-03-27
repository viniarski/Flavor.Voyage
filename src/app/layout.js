import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Flavour.Voyage - Discover Delicious Recipes and Culinary Adventures',
  description:
    'Explore a wide range of recipes, blog posts, and cooking tips on Flavour.Voyage. Embark on a culinary journey and unleash your inner chef!',
};

export default async function RootLayout({ children }) {
  const user = await currentUser();
  const username = user?.username;
  const userId = user?.id;
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-primary text-gray-800">
          <Header username={username} userId={userId} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
