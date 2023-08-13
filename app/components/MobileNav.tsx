"use client";
import Link from "next/link";
import Image from "next/image";
import profilepic from "public/images/profile-photo-640x640.png";
import SignoutButton from "./SignoutButton";
import { useState } from "react";

type Props = {
  imgUrl: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
};
export default function MobileNav({ imgUrl, name, email }: Props) {
  const [toggelMenu, setToggelMenu] = useState(false);
  return (
    <div className="relative">
      <Image
        src={imgUrl || profilepic}
        alt="Picture of the author"
        className="border rounded-full dark:border-slate-600 w-14 h-14 md:w-10 md:h-10"
        onClick={() => setToggelMenu((pre) => !pre)}
        width={40}
        height={40}
      />
      {toggelMenu && (
        <div className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow top-8 dark:bg-gray-700 dark:divide-gray-600">
          <div
            className="flex flex-col overflow-hidden border-2 border-gray-400 rounded-lg"
            onClick={() => setToggelMenu((pre) => !pre)}
          >
            <div className="px-4 py-3 bg-gray-100">
              <Link
                className="flex flex-col text-3xl text-gray-800 no-underline hover:text-black/70 dark:text-white dark:hover:text-white/90 "
                href={`/authers/${name}`}
              >
                <span>{name}</span>
                <span>{email}</span>
              </Link>
            </div>
            <Link
              href="/create-post"
              className="flex items-center justify-center px-4 py-2 text-3xl text-white no-underline bg-green-500 dark:bg-green-600"
            >
              Create a post
            </Link>
            <SignoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
