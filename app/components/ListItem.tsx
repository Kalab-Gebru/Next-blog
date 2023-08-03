import Link from "next/link";
import { Meta, Auther } from "@/types";

type Props = {
  post: Meta;
  user?: Auther;
};

export default function ListItem({ post, user }: Props) {
  const { id, title, date, tags, auther } = post;

  return (
    <li className="grid grid-cols-12 gap-4 p-4 my-4 text-3xl border rounded-md">
      <div className="h-full col-span-4 bg-gray-400 rounded"></div>
      <div className="relative flex flex-col col-span-8">
        <Link
          className="no-underline hover:text-black/70"
          href={`/posts/${id}`}
        >
          {title}
        </Link>
        <div className="flex mt-1 text-sm text-gray-400 gap-4">
          <Link
            className="no-underline hover:text-black/70"
            href={`/authers/${auther.userName}`}
          >
            by : {auther.email}
          </Link>
          <p>{date}</p>
        </div>

        <p className="my-2 text-sm">
          Each size modifier comes with a baked in max-width designed to keep
          the content as readable as possible. This isn’t always what you want
          though.
        </p>
        <div className="flex flex-wrap gap-2 my-2 text-base">
          {tags.map((t: string, i: number) => (
            <Link
              key={i}
              href={`/tags/${t}`}
              className="px-2 no-underline bg-gray-200 border rounded"
            >
              {t}
            </Link>
          ))}
        </div>
        {auther.userName == user?.userName ? (
          <Link
            href={`/editPost/${id}`}
            className="absolute right-0 top-0 py-1 px-2 bg-green-300 text-sm"
          >
            edit
          </Link>
        ) : null}
      </div>
    </li>
  );
}
