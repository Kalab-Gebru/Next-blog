"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function SignInForm() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  function onSubmit(e: any) {
    e.preventDefault();
    signIn("credentials", {
      username,
      password,
      callbackUrl,
    });
  }

  return (
    <div className="flex flex-col gap-6 p-8 border rounded-md w-[360px] ">
      <div className="flex justify-center mb-8">
        <h1 className="grid mb-2 text-2xl font-bold text-white md:text-3xl place-content-center md:mb-0">
          <div className=" text-black/70 hover:text-black dark:text-white dark:hover:text-white/90">
            <span className="text-green-400 ">K</span>Blog
          </div>
        </h1>
      </div>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Label>Username</Label>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Label>Password</Label>

        <Input
          type={hidePassword ? "password" : "text"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <div className="flex items-center gap-2">
        <div className="w-full h-[1px] bg-muted-foreground/30"></div>
        <div className="text-foreground">OR</div>
        <div className="w-full h-[1px] bg-muted-foreground/30"></div>
      </div>
      <div className="">
        <Button
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            signIn("google");
          }}
          className="w-full"
        >
          <FcGoogle size={25} />
          <span>Sign In With Google</span>
        </Button>
      </div>
    </div>
  );
}
