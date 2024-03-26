import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const MobileHeader = ({ username, userId }) => {
  return (
    <div className="navbar bg-white-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            <li>
              <Link
                href={"/"}
                className="hover:underline hover:underline-offset-8 hover:decoration-accent"
              >
                <span className="text-#1F2937-400 hover:text-black">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/recipes"}
                className="hover:underline hover:underline-offset-8 hover:decoration-accent"
              >
                <span className="text-#1F2937-400 hover:text-black">
                  Recipes
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className="hover:underline hover:underline-offset-8 hover:decoration-accent"
              >
                <span className="text-#1F2937-400 hover:text-black">About</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/blog-posts"}
                className="hover:underline hover:underline-offset-8 hover:decoration-accent"
              >
                <span className="text-#1F2937-400 hover:text-black">Blog</span>
              </Link>
            </li>
            <li>
              <Link href={"/contact"}>
                <span className="text-#1F2937-400 hover:text-black">
                  Contact
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Flavor.Voyage</a>
      </div>
      <div className="navbar-end">
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
      </div>
    </div>
  );
};
export default MobileHeader;
