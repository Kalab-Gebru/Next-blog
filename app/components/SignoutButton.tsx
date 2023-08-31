"use client";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button
      className="px-4 py-2 text-white no-underline bg-black/80 dark:bg-zinc-600"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
