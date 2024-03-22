import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import loginIcon from "../../public/icons/login.png";

export default function Header({ username }) {
  const { userId } = auth();
  return (
    <header className="flex bg-white py-4 px-8 justify-between items-center">
      <Link href="/">
        <div className="flex items-center">
          <Image src={logo} height={100} width={80} alt="Flavor.Voyage Logo" />
          <h1 className="text-3xl font-bold p-4">Flavor.Voyage</h1>
        </div>
      </Link>
      <nav>
        <ul className="flex gap-8 text-2xl items-center">
          <Link
            href={"/"}
            className="hover:underline hover:underline-offset-8 hover:decoration-accent"
          >
            Home
          </Link>
          <Link
            href={"/recipes"}
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
          {userId ? (
            <UserButton
              userProfileMode="navigation"
              userProfileUrl={`/user-profile/${username}`}
              afterSignOutUrl="/"
            />
          ) : (
            <Link href={"/sign-in"}>
              <Image
                src={loginIcon}
                height={24}
                width={24}
                alt="Sign In"
                className="ml-4"
              />
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}
