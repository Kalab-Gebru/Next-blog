"use client";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button
      className="px-4 py-2 text-3xl text-white no-underline md:text-base bg-black/80 dark:bg-slate-600"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
