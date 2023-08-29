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
    <nav className="sticky top-0 z-10 p-4 bg-white border-b drop-shadow-md dark:bg-slate-800 dark:border-slate-600">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="grid mb-2 text-4xl font-bold text-white md:text-3xl place-content-center md:mb-0">
          <Link
            href="/"
            className="no-underline text-black/70 hover:text-black dark:text-white dark:hover:text-white/90"
          >
            KBlog
          </Link>
        </h1>

        <div className="flex items-center divide-x-2">
          <div className="hidden px-4 md:block">
            {session && session.user ? (
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="/create-post"
                  className="flex items-center justify-center px-4 py-2 text-white no-underline bg-green-500 rounded dark:bg-green-600 on"
                >
                  Create a post
                </Link>

                <Link
                  className="text-base text-gray-800 no-underline hover:text-black/70 dark:text-white dark:hover:text-white/90 "
                  href={`/authers/${session.user.name}`}
                >
                  {session.user.name}
                </Link>
                <Image
                  src={session.user.image || profilepic}
                  alt="Picture of the author"
                  className="border rounded-full dark:border-slate-600"
                  width={40}
                  height={40}
                />

                {/* <SignoutButton /> */}
                <Link
                  className="px-4 py-2 text-3xl text-white no-underline md:text-base bg-black/80 dark:bg-slate-600"
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
        </div>
      </div>
    </nav>
  );
}
