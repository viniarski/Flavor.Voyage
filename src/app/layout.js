import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flavour.Voyage",
  description: "Discover delicious recipes and culinary adventures!",
};

export default async function RootLayout({ children }) {
  const user = await currentUser();
  const username = user?.username;
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-primary text-gray-800">
          <Header username={username} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
