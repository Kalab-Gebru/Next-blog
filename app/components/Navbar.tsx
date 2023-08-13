import Link from "next/link";
import Image from "next/image";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import profilepic from "public/images/profile-photo-640x640.png";
import SignInButton from "./SignInButton";
import SignoutButton from "./SignoutButton";
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

                <SignoutButton />
              </div>
            ) : (
              <div>
                <SignInButton />
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
                <SignInButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>

    // <nav className="bg-white border-gray-200 dark:bg-gray-900">
    //   <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
    //     <a href="https://flowbite.com/" className="flex items-center">
    //       <img
    //         src="https://flowbite.com/docs/images/logo.svg"
    //         className="h-8 mr-3"
    //         alt="Flowbite Logo"
    //       />
    //       <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //         Flowbite
    //       </span>
    //     </a>
    //     <div className="flex items-center md:order-2">
    //       <button
    //         type="button"
    //         className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    //         id="user-menu-button"
    //         aria-expanded="false"
    //         data-dropdown-toggle="user-dropdown"
    //         data-dropdown-placement="bottom"
    //       >
    //         <span className="sr-only">Open user menu</span>

    //         <Image
    //           src={session?.user?.image || profilepic}
    //           alt="Picture of the author"
    //           className="border rounded-full dark:border-slate-600"
    //           width={40}
    //           height={40}
    //         />
    //       </button>

    //       <div
    //         className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    //         id="user-dropdown"
    //       >
    //         <div className="px-4 py-3">
    //           <span className="block text-sm text-gray-900 dark:text-white">
    //             Bonnie Green
    //           </span>
    //           <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
    //             name@flowbite.com
    //           </span>
    //         </div>
    //         <ul className="py-2" aria-labelledby="user-menu-button">
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Dashboard
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Settings
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Earnings
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Sign out
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <button
    //         data-collapse-toggle="navbar-user"
    //         type="button"
    //         className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //         aria-controls="navbar-user"
    //         aria-expanded="false"
    //       >
    //         <span className="sr-only">Open main menu</span>
    //         <svg
    //           className="w-5 h-5"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 17 14"
    //         >
    //           <path
    //             stroke="currentColor"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="2"
    //             d="M1 1h15M1 7h15M1 13h15"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //     <div
    //       className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
    //       id="navbar-user"
    //     >
    //       <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
    //             aria-current="page"
    //           >
    //             Home
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             About
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Services
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Pricing
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Contact
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}
