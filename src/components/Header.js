import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs";

export default function Header() {
  const { userId } = auth();

  return (
    <header className="flex bg-white py-4 px-8 justify-between items-center">
      <div className="flex">
        <Image src={logo} height={100} width={80} alt="Flavor.Voyage Logo" />
        <h1 className="text-3xl font-bold p-4">Flavor.Voyage</h1>
      </div>
      <nav>
        <ul className="flex gap-8 text-2xl ">
          {userId ? (
            <UserButton />
          ) : (
            <>
              <Link
                href={"/sign-in"}
                className="hover:underline hover:underline-offset-8 hover:decoration-accent"
              >
                Sign In
              </Link>
              <Link
                href={"/sign-up"}
                className="hover:underline hover:underline-offset-8 hover:decoration-accent"
              >
                Sign Up
              </Link>
            </>
          )}

          <Link
            href={'/'}

            className="hover:underline hover:underline-offset-8 hover:decoration-accent"
          >
            Home
          </Link>
          <Link

            href={'/recipes'}

            className="hover:underline hover:underline-offset-8 hover:decoration-accent"
          >
            Recipes
          </Link>
          <Link
            href={"#"}
            className="hover:underline hover:underline-offset-8 hover:decoration-accent"
          >
            About
          </Link>
          <Link
            href={"/blog-posts"}
            className="hover:underline hover:underline-offset-8 hover:decoration-accent"
          >
            Blog
          </Link>
          <Link
            href={"#"}
            className="hover:underline hover:underline-offset-8 hover:decoration-accent"
          >
            Contact
          </Link>
        </ul>
      </nav>
    </header>
  );
}
