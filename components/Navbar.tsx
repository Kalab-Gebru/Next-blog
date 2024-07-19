import Link from "next/link";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileNav from "./MobileNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="sticky top-0 z-10 p-4 border-b bg-background">
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
                  <Button asChild variant={"outline"}>
                    <Link
                      href="/admin"
                      // className="flex items-center justify-center py-1 text-black no-underline border-b-2 border-blue-500 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 dark:border-blue-600 "
                    >
                      Admin Page
                    </Link>
                  </Button>
                )}
                <Button asChild variant={"default"}>
                  <Link
                    href="/create-post"
                    // className="flex items-center justify-center py-1 text-black no-underline border-b-2 border-green-500 dark:text-white hover:text-green-500 dark:hover:text-green-500 dark:border-green-600 "
                  >
                    Create a post
                  </Link>
                </Button>

                <Link href={`/authers/${session.user.email}`}>
                  <Avatar>
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback>
                      {session.user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <SignOutButton />
              </div>
            ) : (
              <div>
                <Button asChild variant="default">
                  <Link
                    // className="px-4 py-1 text-lg text-white no-underline uppercase bg-blue-700 rounded"
                    href="/api/auth/signin?callbackUrl=/"
                  >
                    Sign In
                  </Link>
                </Button>
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
                role={session.user.role}
              />
            ) : (
              <Button asChild variant={"default"}>
                <Link
                  // className="px-4 py-1 text-lg text-white no-underline uppercase bg-blue-700 rounded"
                  href="/api/auth/signin?callbackUrl=/"
                >
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
