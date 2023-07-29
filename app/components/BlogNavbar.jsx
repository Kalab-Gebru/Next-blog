// "use client";
import Link from "next/link";
// import { FaYoutube, FaTwitter, FaGithub, FaLaptop } from "react-icons/fa";
import Image from "next/image";
// import { signIn, signOut, useSession } from "next-auth/react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import profilepic from "public/images/profile-photo-600x600.png";

export default async function BlogNavbar() {
  // const { data: session } = useSession();
  const session = await getServerSession(options);
  return (
    <nav className="sticky top-0 z-10 p-4 bg-white drop-shadow-xl">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="grid mb-2 text-3xl font-bold text-white place-content-center md:mb-0">
          <Link
            href="/"
            className="no-underline text-black/70 hover:text-black"
          >
            KBlog
          </Link>
        </h1>

        <div className="flex">
          {session && session.user ? (
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="/create-post"
                className="flex items-center justify-center px-4 py-2 text-white no-underline bg-green-500 rounded on"
              >
                Create a post
              </Link>
              <h2 className="text-base text-gray-800">{session.user.name}</h2>
              <Image
                src={session.user.image || profilepic}
                alt="Picture of the author"
                className="border rounded-full"
                width={40}
                height={40}
              />

              <Link
                className="px-4 py-2 text-white no-underline bg-black rounded"
                href="/api/auth/signout"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div>
              <Link
                className="px-4 py-1 text-lg text-white no-underline uppercase bg-blue-700 rounded"
                href="/api/auth/signin"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
