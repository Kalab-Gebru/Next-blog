import Link from "next/link";
import Image from "next/image";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import profilepic from "public/images/profile-photo-640x640.png";
// import SignInButton from "./SignInButton";
// import SignoutButton from "./SignoutButton";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileNav from "./MobileNav";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <nav className="sticky top-0 z-10 p-4 bg-white border-b drop-shadow-md dark:bg-zinc-900 dark:border-zinc-700">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="grid mb-2 text-2xl font-bold text-white md:text-3xl place-content-center md:mb-0">
          <Link
            href="/"
            className="no-underline text-black/70 hover:text-black dark:text-white dark:hover:text-white/90"
          >
            <span className="text-green-400 ">K</span>Blog
          </Link>
        </h1>

        <div className="flex items-center md:divide-x-2">
          <div className="hidden px-4 md:block">
            {session && session.user ? (
              <div className="flex items-center justify-center gap-6">
                {session.user.role == "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center justify-center py-1 text-black no-underline border-b-2 border-blue-500 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 dark:border-blue-600 "
                  >
                    Admin Page
                  </Link>
                )}
                <Link
                  href="/create-post"
                  className="flex items-center justify-center py-1 text-black no-underline border-b-2 border-green-500 dark:text-white hover:text-green-500 dark:hover:text-green-500 dark:border-green-600 "
                >
                  Create a post
                </Link>

                <Link
                  className="text-lg text-black no-underline hover:text-black/70 dark:text-white dark:hover:text-white/90"
                  href={`/authers/${session.user.email}`}
                >
                  {session.user.name}
                </Link>

                <Image
                  src={session.user.image || profilepic}
                  alt="Picture of the author"
                  className="border rounded-full w-7 h-7 md:w-10 md:h-10 dark:border-zinc-600"
                  width={25}
                  height={25}
                />

                {/* <SignoutButton /> */}
                <Link
                  className="px-4 py-2 text-3xl text-white no-underline rounded-md md:text-base bg-black/80 dark:bg-zinc-600"
                  href="/api/auth/signout?callbackUrl=/"
                >
                  Sign Out
                </Link>
              </div>
            ) : (
              <div>
                {/* <SignInButton /> */}
                <Link
                  className="px-4 py-1 text-lg text-white no-underline uppercase bg-blue-700 rounded"
                  href="/api/auth/signin?callbackUrl=/"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
          <div className="px-4 ">
            <ThemeSwitcher />
          </div>
          <div className="pl-2 md:hidden">
            {session && session.user ? (
              <MobileNav
                imgUrl={session.user.image}
                name={session.user.name}
                email={session.user.email}
              />
            ) : (
              <div>
                <Link
                  className="px-4 py-1 text-lg text-white no-underline uppercase bg-blue-700 rounded"
                  href="/api/auth/signin?callbackUrl=/"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
