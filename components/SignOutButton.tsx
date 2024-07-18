"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Replace '/' with your desired redirect URL
  };
  return (
    <Button variant="secondary" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
