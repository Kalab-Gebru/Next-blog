import Link from "next/link";
import Image from "next/image";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import profilepic from "public/images/profile-photo-600x600.png";
import SignInButton from "./SignInButton";
import SignoutButton from "./SignoutButton";
import ThemeSwitcher from "./ThemeSwitcher";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <nav className="sticky top-0 z-10 p-4 bg-white dark:bg-slate-700 drop-shadow-xl">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="grid mb-2 text-3xl font-bold text-white place-content-center md:mb-0">
          <Link
            href="/"
            className="no-underline text-black/70 hover:text-black dark:text-white dark:hover:text-white/90"
          >
            KBlog
          </Link>
        </h1>

        <div className="flex items-center divide-x-2">
          <div className="px-4">
            {session && session.user ? (
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="/create-post"
                  className="flex items-center justify-center px-4 py-2 text-white no-underline bg-green-500 dark:bg-green-600 rounded on"
                >
                  Create a post
                </Link>

                <Link
                  className="no-underline text-base text-gray-800 hover:text-black/70 dark:text-white dark:hover:text-white/90 "
                  href={`/authers/${session.user.name}`}
                >
                  {session.user.name}
                </Link>
                <Image
                  src={session.user.image || profilepic}
                  alt="Picture of the author"
                  className="border dark:border-slate-600 rounded-full"
                  width={40}
                  height={40}
                />

                <SignoutButton />
              </div>
            ) : (
              <div>
                <SignInButton />
              </div>
            )}
          </div>
          <div className="px-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
