import Link from "next/link";
import Image from "next/image";
import { Meta, Auther } from "@/types";
import { BiEdit } from "react-icons/bi";
import profilepic from "public/images/profile-photo-640x640.png";

type Props = {
  post: Meta;
  user?: Auther;
};

export default function ListItem({ post, user }: Props) {
  const { id, title, date, tags, auther, imgURL } = post;

  return (
    <li className="relative grid grid-cols-12 gap-4 p-4 my-4 border rounded-md md:flex-row dark:border-slate-500">
      {imgURL ? (
        <Image
          src={imgURL}
          alt={imgURL}
          className="col-span-12 border w-full rounded md:col-span-5 aspect-[1.75]"
          width={300}
          height={200}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="col-span-12 bg-gray-400 rounded md:col-span-5 aspect-[1.75]" />
      )}
      <div className="flex flex-col justify-start col-span-12 md:col-span-7 ">
        <div className="">
          <Link
            className="text-5xl no-underline md:text-4xl hover:text-black/70 dark:hover:text-white/80 "
            href={`/posts/${id}`}
          >
            <span className="twolines">{title}</span>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-2 mt-4 text-2xl md:mt-1 md:text-sm">
          <Link
            className="flex items-center gap-2 "
            href={`/authers/${auther.userName}`}
          >
            <Image
              src={auther.img ? auther.img : profilepic}
              alt="Picture of the author"
              className="border rounded-full dark:border-slate-600 md:w-8 md:h-8 w-14 h-14"
              width={30}
              height={30}
            />
          </Link>
          <div className="flex flex-col ">
            <Link
              className="text-black no-underline dark:text-white hover:text-black/70 dark:hover:text-gray-300"
              href={`/authers/${auther.userName}`}
            >
              {" "}
              {auther.email}{" "}
            </Link>
            <span className="text-gray-400">{date}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-4 text-3xl md:my-2 md:text-base">
          {tags.map((t: string, i: number) => (
            <Link
              key={i}
              href={`/tags/${t}`}
              className="px-2 no-underline bg-gray-200 border rounded hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 dark:border-slate-500"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
      {auther.userName == user?.userName ? (
        <Link
          href={`/editPost/${id}`}
          className="absolute top-0 right-0 hover:text-blue-500"
        >
          <BiEdit size={24} className="w-12 h-12 text-blue-500 md:w-6 md:h-6" />
        </Link>
      ) : null}
    </li>
  );
}
