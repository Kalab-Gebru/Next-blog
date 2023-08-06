import Link from "next/link";
import Image from "next/image";
import { Meta, Auther } from "@/types";
import { BiEdit } from "react-icons/bi";

type Props = {
  post: Meta;
  user?: Auther;
};

export default function ListItem({ post, user }: Props) {
  const { id, title, date, tags, auther, imgURL } = post;

  return (
    <li className="flex md:flex-row flex-col gap-4 p-4 my-4 border dark:border-slate-500 rounded-md">
      {imgURL ? (
        <Image
          src={imgURL}
          alt={imgURL}
          className="md:w-64 w-full aspect-2 border rounded"
          width={300}
          height={200}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="md:w-64 w-full aspect-2 bg-gray-400 rounded" />
      )}
      <div className="relative flex flex-col justify-start grow ">
        <div className="">
          <Link
            className="no-underline hover:text-black/70 dark:hover:text-white/80  text-4xl "
            href={`/posts/${id}`}
          >
            {title}
          </Link>
        </div>
        <div className="flex md:flex-row flex-col mt-1 text-gray-400 md:gap-4">
          <Link
            className="no-underline hover:text-black/70 dark:hover:text-gray-300"
            href={`/authers/${auther.userName}`}
          >
            by : {auther.email}
          </Link>
          <p>{date}</p>
        </div>

        {/* <p className="my-2 text-sm">
          Each size modifier comes with a baked in max-width designed to keep
          the content as readable as possible. This isn’t always what you want
          though.
        </p> */}
        <div className="flex flex-wrap gap-2 my-2">
          {tags.map((t: string, i: number) => (
            <Link
              key={i}
              href={`/tags/${t}`}
              className="px-2 no-underline bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 border dark:border-slate-500 rounded"
            >
              {t}
            </Link>
          ))}
        </div>
        {auther.userName == user?.userName ? (
          <Link
            href={`/editPost/${id}`}
            className="absolute right-0 top-0 hover:text-blue-500"
          >
            <BiEdit size={24} />
          </Link>
        ) : null}
      </div>
    </li>
  );
}
