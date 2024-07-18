import SignInForm from "@/components/SignInForm";
import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

type Props = {};

export default async function login({}: Props) {
  const session = await getServerSession(options);

  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <SignInForm />
    </div>
  );
}
