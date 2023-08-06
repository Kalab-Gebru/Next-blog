"use client";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button
      className="px-4 py-2 text-white no-underline bg-black dark:bg-slate-600 rounded"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
